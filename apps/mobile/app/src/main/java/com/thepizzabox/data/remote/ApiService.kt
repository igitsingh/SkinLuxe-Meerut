package com.thepizzabox.data.remote

import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT

interface ApiService {
    @POST("auth/login")
    suspend fun login(@Body request: LoginRequest): AuthResponse

    @POST("auth/signup")
    suspend fun signup(@Body request: SignupRequest): AuthResponse

    @GET("auth/me")
    suspend fun getMe(): UserDto

    @GET("menu")
    suspend fun getMenu(): List<CategoryDto>

    @GET("menu/bestsellers")
    suspend fun getBestsellers(): List<ItemDto>

    @GET("users/addresses")
    suspend fun getAddresses(): List<AddressDto>

    @POST("users/addresses")
    suspend fun addAddress(@Body address: AddressDto): AddressDto

    @POST("orders")
    suspend fun createOrder(@Body order: CreateOrderRequest): OrderDto

    @POST("payments/razorpay/create-order")
    suspend fun createRazorpayOrder(@Body request: CreateRazorpayOrderRequest): RazorpayOrderResponse

    @POST("payments/razorpay/verify")
    suspend fun verifyPayment(@Body request: VerifyPaymentRequest): VerifyPaymentResponse
}

data class LoginRequest(val identifier: String, val password: String)
data class SignupRequest(val email: String, val password: String, val name: String, val phone: String)
data class AuthResponse(val token: String, val user: UserDto)
data class UserDto(val id: String, val email: String, val name: String, val role: String, val phone: String?, val fcmToken: String?)
data class CategoryDto(val id: String, val name: String, val items: List<ItemDto>, val image: String? = null)
data class ItemDto(
    val id: String, 
    val name: String, 
    val description: String?, 
    val price: Double, 
    val image: String?, 
    val isVeg: Boolean, 
    val isBestSeller: Boolean,
    val soldCount: Int? = 0
)
data class AddressDto(val id: String? = null, val street: String, val city: String, val state: String, val zip: String, val country: String = "India")
data class CreateOrderRequest(
    val items: List<OrderItemDto>, 
    val addressId: String? = null, 
    val total: Double,
    val isGuest: Boolean? = null,
    val guestAddress: AddressDto? = null,
    val guestPhone: String? = null,
    val guestName: String? = null,
    val paymentMethod: String = "COD",
    val instructions: String? = null
)
data class OrderItemDto(val id: String, val quantity: Int, val price: Double? = null, val options: Any? = null, val addons: List<Any>? = null)
data class OrderDto(val id: String, val total: Double, val status: String, val razorpayOrderId: String?)
data class CreateRazorpayOrderRequest(val orderId: String)
data class RazorpayOrderResponse(val id: String, val amount: Int, val currency: String)
data class VerifyPaymentRequest(val razorpay_order_id: String, val razorpay_payment_id: String, val razorpay_signature: String)
data class VerifyPaymentResponse(val message: String)
