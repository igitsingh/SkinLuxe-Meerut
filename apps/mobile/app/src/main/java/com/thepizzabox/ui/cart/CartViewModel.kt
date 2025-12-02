package com.thepizzabox.ui.cart

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.thepizzabox.data.model.CartItem
import com.thepizzabox.data.repository.CartRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class CartViewModel @Inject constructor(
    private val cartRepository: CartRepository
) : ViewModel() {

    val cartItems: StateFlow<List<CartItem>> = cartRepository.cartItems
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val totalPrice: StateFlow<Double?> = cartRepository.totalPrice
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), 0.0)

    fun incrementQuantity(item: CartItem) {
        viewModelScope.launch {
            cartRepository.updateQuantity(item, item.quantity + 1)
        }
    }

    fun decrementQuantity(item: CartItem) {
        viewModelScope.launch {
            cartRepository.updateQuantity(item, item.quantity - 1)
        }
    }

    fun clearCart() {
        viewModelScope.launch {
            cartRepository.clearCart()
        }
    }
}
