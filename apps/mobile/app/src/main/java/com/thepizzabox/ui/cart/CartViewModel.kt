package com.thepizzabox.ui.cart

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.thepizzabox.data.model.CartItem
import com.thepizzabox.data.local.GuestManager
import com.thepizzabox.data.local.TokenManager
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow

@HiltViewModel
class CartViewModel @Inject constructor(
    private val cartRepository: CartRepository,
    private val tokenManager: TokenManager,
    private val guestManager: GuestManager
) : ViewModel() {

    val cartItems: StateFlow<List<CartItem>> = cartRepository.cartItems
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val totalPrice: StateFlow<Double?> = cartRepository.totalPrice
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), 0.0)

    private val _isGuest = MutableStateFlow(tokenManager.getToken() == null)
    val isGuest: StateFlow<Boolean> = _isGuest.asStateFlow()

    private val _hasChosenGuest = MutableStateFlow(false)
    val hasChosenGuest: StateFlow<Boolean> = _hasChosenGuest.asStateFlow()

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

    fun continueAsGuest() {
        _hasChosenGuest.value = true
    }
}
