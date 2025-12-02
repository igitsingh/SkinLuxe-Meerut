package com.thepizzabox.ui.checkout

import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.thepizzabox.data.remote.AddressDto
import com.thepizzabox.data.repository.AddressRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class AddressViewModel @Inject constructor(
    private val addressRepository: AddressRepository
) : ViewModel() {

    private val _state = mutableStateOf(AddressState())
    val state: State<AddressState> = _state

    init {
        loadAddresses()
    }

    private fun loadAddresses() {
        viewModelScope.launch {
            _state.value = _state.value.copy(isLoading = true)
            val result = addressRepository.getAddresses()
            
            result.onSuccess { addresses ->
                _state.value = _state.value.copy(isLoading = false, addresses = addresses)
            }.onFailure { error ->
                _state.value = _state.value.copy(isLoading = false, error = error.message)
            }
        }
    }

    fun onAddressSelected(address: AddressDto) {
        _state.value = _state.value.copy(selectedAddress = address)
    }

    fun addAddress(street: String, city: String, state: String, zip: String) {
        viewModelScope.launch {
            _state.value = _state.value.copy(isLoading = true)
            val newAddress = AddressDto(street = street, city = city, state = state, zip = zip)
            val result = addressRepository.addAddress(newAddress)
            
            result.onSuccess {
                loadAddresses() // Reload list
                _state.value = _state.value.copy(showAddAddressDialog = false)
            }.onFailure { error ->
                _state.value = _state.value.copy(isLoading = false, error = error.message)
            }
        }
    }

    fun showAddAddressDialog() {
        _state.value = _state.value.copy(showAddAddressDialog = true)
    }

    fun hideAddAddressDialog() {
        _state.value = _state.value.copy(showAddAddressDialog = false)
    }
}

data class AddressState(
    val addresses: List<AddressDto> = emptyList(),
    val selectedAddress: AddressDto? = null,
    val isLoading: Boolean = false,
    val error: String? = null,
    val showAddAddressDialog: Boolean = false
)
