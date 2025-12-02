package com.thepizzabox.ui.home

import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.thepizzabox.data.remote.CategoryDto
import com.thepizzabox.data.remote.ItemDto
import com.thepizzabox.data.repository.MenuRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class HomeViewModel @Inject constructor(
    private val menuRepository: MenuRepository
) : ViewModel() {

    private val _state = mutableStateOf(HomeState())
    val state: State<HomeState> = _state

    init {
        loadMenu()
    }

    private fun loadMenu() {
        viewModelScope.launch {
            _state.value = _state.value.copy(isLoading = true)
            
            // Fetch menu and bestsellers in parallel
            val menuResult = menuRepository.getMenu()
            val bestsellersResult = menuRepository.getBestsellers()
            
            val newState = _state.value.copy(isLoading = false)
            
            menuResult.onSuccess { categories ->
                _state.value = _state.value.copy(categories = categories)
            }.onFailure { error ->
                _state.value = _state.value.copy(error = error.message)
            }
            
            bestsellersResult.onSuccess { bestsellers ->
                _state.value = _state.value.copy(bestsellers = bestsellers)
            }
            
            // If both failed, we might want to show error, but for now individual error handling is fine
            // or we can combine them.
            _state.value = _state.value.copy(isLoading = false)
        }
    }
}

data class HomeState(
    val categories: List<CategoryDto> = emptyList(),
    val bestsellers: List<ItemDto> = emptyList(),
    val isLoading: Boolean = false,
    val error: String? = null
)
