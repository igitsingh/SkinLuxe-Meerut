package com.thepizzabox.data.repository

import com.thepizzabox.data.local.CartDao
import com.thepizzabox.data.model.CartItem
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class CartRepository @Inject constructor(
    private val cartDao: CartDao
) {
    val cartItems: Flow<List<CartItem>> = cartDao.getCartItems()
    val totalPrice: Flow<Double?> = cartDao.getTotalPrice()

    suspend fun addToCart(cartItem: CartItem) {
        cartDao.insert(cartItem)
    }

    suspend fun updateQuantity(cartItem: CartItem, quantity: Int) {
        if (quantity <= 0) {
            cartDao.delete(cartItem)
        } else {
            cartDao.update(cartItem.copy(quantity = quantity))
        }
    }

    suspend fun removeFromCart(cartItem: CartItem) {
        cartDao.delete(cartItem)
    }

    suspend fun clearCart() {
        cartDao.clearCart()
    }
}
