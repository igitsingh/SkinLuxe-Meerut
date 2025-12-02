package com.thepizzabox.data.repository

import com.thepizzabox.data.remote.ApiService
import com.thepizzabox.data.remote.LoginRequest
import com.thepizzabox.data.remote.AuthResponse
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class AuthRepository @Inject constructor(
    private val apiService: ApiService
) {
    suspend fun login(email: String, password: String): Result<AuthResponse> {
        return try {
            val response = apiService.login(LoginRequest(email, password))
            Result.success(response)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
