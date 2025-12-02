package com.thepizzabox.ui.checkout

import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.thepizzabox.data.local.CartDao
import com.thepizzabox.data.remote.CreateOrderRequest
import com.thepizzabox.data.remote.OrderItemDto
import com.thepizzabox.data.repository.OrderRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class PaymentViewModel @Inject constructor(
    private val orderRepository: OrderRepository,
    private val cartDao: CartDao
) : ViewModel() {

    private val _state = mutableStateOf(PaymentState())
    val state: State<PaymentState> = _state

    fun initPayment(addressId: String) {
        viewModelScope.launch {
            _state.value = _state.value.copy(isLoading = true)
            
            // 1. Get Cart Items
            val cartItems = cartDao.getCartItems().first()
            if (cartItems.isEmpty()) {
                _state.value = _state.value.copy(isLoading = false, error = "Cart is empty")
                return@launch
            }

            val total = cartItems.sumOf { it.price * it.quantity }
            val orderItems = cartItems.map { 
                OrderItemDto(it.itemId, it.quantity, it.price, it.selectedOptions) 
            }

            // 2. Create Order on Backend
            val createOrderResult = orderRepository.createOrder(
                CreateOrderRequest(orderItems, addressId, total)
            )

            createOrderResult.onSuccess { order ->
                // 3. Create Razorpay Order
                val razorpayOrderResult = orderRepository.createRazorpayOrder(order.id)
                razorpayOrderResult.onSuccess { razorpayOrder ->
                    _state.value = _state.value.copy(
                        isLoading = false,
                        razorpayOrderId = razorpayOrder.id,
                        amount = razorpayOrder.amount,
                        orderId = order.id, // Internal Order ID
                        shouldLaunchRazorpay = true
                    )
                }.onFailure { error ->
                    _state.value = _state.value.copy(isLoading = false, error = "Failed to init Razorpay: ${error.message}")
                }
            }.onFailure { error ->
                _state.value = _state.value.copy(isLoading = false, error = "Failed to create order: ${error.message}")
            }
        }
    }

    fun onPaymentSuccess(razorpayPaymentId: String, razorpaySignature: String) {
        viewModelScope.launch {
            _state.value = _state.value.copy(isLoading = true, shouldLaunchRazorpay = false)
            val razorpayOrderId = _state.value.razorpayOrderId ?: return@launch

            val result = orderRepository.verifyPayment(razorpayOrderId, razorpayPaymentId, razorpaySignature)
            
            result.onSuccess {
                cartDao.clearCart()
                _state.value = _state.value.copy(isLoading = false, isPaymentSuccessful = true)
            }.onFailure { error ->
                _state.value = _state.value.copy(isLoading = false, error = "Payment verification failed: ${error.message}")
            }
        }
    }

    fun onPaymentError(code: Int, description: String) {
        _state.value = _state.value.copy(isLoading = false, shouldLaunchRazorpay = false, error = "Payment failed: $description")
    }

    fun resetState() {
        _state.value = PaymentState()
    }
}

data class PaymentState(
    val isLoading: Boolean = false,
    val error: String? = null,
    val razorpayOrderId: String? = null,
    val amount: Int? = null,
    val orderId: String? = null,
    val shouldLaunchRazorpay: Boolean = false,
    val isPaymentSuccessful: Boolean = false
)
