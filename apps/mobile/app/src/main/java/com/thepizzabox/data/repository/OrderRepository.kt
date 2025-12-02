package com.thepizzabox.data.repository

import com.thepizzabox.data.remote.ApiService
import com.thepizzabox.data.remote.CreateOrderRequest
import com.thepizzabox.data.remote.CreateRazorpayOrderRequest
import com.thepizzabox.data.remote.OrderDto
import com.thepizzabox.data.remote.RazorpayOrderResponse
import com.thepizzabox.data.remote.VerifyPaymentRequest
import com.thepizzabox.data.remote.VerifyPaymentResponse
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class OrderRepository @Inject constructor(
    private val apiService: ApiService
) {
    suspend fun createOrder(request: CreateOrderRequest): Result<OrderDto> {
        return try {
            val response = apiService.createOrder(request)
            Result.success(response)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun createRazorpayOrder(orderId: String): Result<RazorpayOrderResponse> {
        return try {
            val response = apiService.createRazorpayOrder(CreateRazorpayOrderRequest(orderId))
            Result.success(response)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun verifyPayment(razorpayOrderId: String, razorpayPaymentId: String, razorpaySignature: String): Result<VerifyPaymentResponse> {
        return try {
            val response = apiService.verifyPayment(
                VerifyPaymentRequest(razorpayOrderId, razorpayPaymentId, razorpaySignature)
            )
            Result.success(response)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
