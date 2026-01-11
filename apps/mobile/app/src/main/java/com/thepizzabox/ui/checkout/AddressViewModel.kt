package com.thepizzabox.ui.checkout

import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.thepizzabox.data.local.GuestManager
import com.thepizzabox.data.local.TokenManager
import kotlinx.coroutines.flow.first

@HiltViewModel
class AddressViewModel @Inject constructor(
    private val addressRepository: AddressRepository,
    private val tokenManager: TokenManager,
    private val guestManager: GuestManager
) : ViewModel() {

    private val _state = mutableStateOf(AddressState())
    val state: State<AddressState> = _state

    init {
        loadAddresses()
    }

    private fun loadAddresses() {
        viewModelScope.launch {
            _state.value = _state.value.copy(isLoading = true)
            
            if (tokenManager.getToken() == null) {
                // Guest Mode
                val guestAddress = guestManager.guestAddress.first()
                val addresses = if (guestAddress != null) {
                    listOf(AddressDto(
                        id = "guest_address",
                        street = guestAddress.line1,
                        city = guestAddress.city,
                        state = guestAddress.state,
                        zip = guestAddress.pincode
                    ))
                } else {
                    emptyList()
                }
                _state.value = _state.value.copy(isLoading = false, addresses = addresses)
                // Auto-select if exists
                if (addresses.isNotEmpty()) {
                    onAddressSelected(addresses.first())
                }
            } else {
                // Logged In Mode
                val result = addressRepository.getAddresses()
                result.onSuccess { addresses ->
                    _state.value = _state.value.copy(isLoading = false, addresses = addresses)
                }.onFailure { error ->
                    _state.value = _state.value.copy(isLoading = false, error = error.message)
                }
            }
        }
    }

    fun onAddressSelected(address: AddressDto) {
        _state.value = _state.value.copy(selectedAddress = address)
    }

    fun addAddress(street: String, city: String, state: String, zip: String) {
        viewModelScope.launch {
            _state.value = _state.value.copy(isLoading = true)
            
            if (tokenManager.getToken() == null) {
                // Guest Mode
                val guestAddress = com.thepizzabox.data.local.GuestAddress(
                    line1 = street,
                    line2 = "",
                    locality = "",
                    city = city,
                    state = state,
                    pincode = zip
                )
                guestManager.saveGuestAddress(guestAddress)
                loadAddresses()
                _state.value = _state.value.copy(showAddAddressDialog = false)
            } else {
                // Logged In Mode
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
