package com.thepizzabox.ui.menu

import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.thepizzabox.data.remote.CategoryDto
import com.thepizzabox.data.repository.MenuRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class MenuViewModel @Inject constructor(
    private val menuRepository: MenuRepository
) : ViewModel() {

    private val _state = mutableStateOf(MenuState())
    val state: State<MenuState> = _state

    init {
        loadMenu()
    }

    private fun loadMenu() {
        viewModelScope.launch {
            _state.value = _state.value.copy(isLoading = true)
            val result = menuRepository.getMenu()
            
            result.onSuccess { categories ->
                _state.value = _state.value.copy(
                    isLoading = false,
                    categories = categories,
                    selectedCategoryId = categories.firstOrNull()?.id
                )
            }.onFailure { error ->
                _state.value = _state.value.copy(isLoading = false, error = error.message)
            }
        }
    }

    fun onCategorySelected(categoryId: String) {
        _state.value = _state.value.copy(selectedCategoryId = categoryId)
    }
}

data class MenuState(
    val categories: List<CategoryDto> = emptyList(),
    val selectedCategoryId: String? = null,
    val isLoading: Boolean = false,
    val error: String? = null
)
