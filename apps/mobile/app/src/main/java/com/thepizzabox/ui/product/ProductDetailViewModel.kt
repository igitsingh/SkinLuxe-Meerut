package com.thepizzabox.ui.product

import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.thepizzabox.data.model.CartItem
import com.thepizzabox.data.remote.ItemDto
import com.thepizzabox.data.repository.CartRepository
import com.thepizzabox.data.repository.MenuRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class ProductDetailViewModel @Inject constructor(
    private val menuRepository: MenuRepository,
    private val cartRepository: CartRepository,
    savedStateHandle: SavedStateHandle
) : ViewModel() {

    private val _state = mutableStateOf(ProductDetailState())
    val state: State<ProductDetailState> = _state

    init {
        val productId = savedStateHandle.get<String>("productId")
        if (productId != null) {
            loadProduct(productId)
        }
    }

    private fun loadProduct(productId: String) {
        viewModelScope.launch {
            _state.value = _state.value.copy(isLoading = true)
            // In a real app, we would have a specific endpoint for item details or cache it
            // For now, we fetch the menu and find the item
            val result = menuRepository.getMenu()
            
            result.onSuccess { categories ->
                val item = categories.flatMap { it.items }.find { it.id == productId }
                if (item != null) {
                    _state.value = _state.value.copy(isLoading = false, item = item)
                } else {
                    _state.value = _state.value.copy(isLoading = false, error = "Item not found")
                }
            }.onFailure { error ->
                _state.value = _state.value.copy(isLoading = false, error = error.message)
            }
        }
    }

    fun addToCart() {
        val item = _state.value.item ?: return
        viewModelScope.launch {
            val cartItem = CartItem(
                itemId = item.id,
                name = item.name,
                price = item.price,
                quantity = 1,
                image = item.image,
                selectedOptions = null
            )
            cartRepository.addToCart(cartItem)
            _state.value = _state.value.copy(isAddedToCart = true)
        }
    }
}

data class ProductDetailState(
    val item: ItemDto? = null,
    val isLoading: Boolean = false,
    val error: String? = null,
    val isAddedToCart: Boolean = false
)
