package com.thepizzabox.data.repository

import com.thepizzabox.data.remote.AddressDto
import com.thepizzabox.data.remote.ApiService
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class AddressRepository @Inject constructor(
    private val apiService: ApiService
) {
    suspend fun getAddresses(): Result<List<AddressDto>> {
        return try {
            val response = apiService.getAddresses()
            Result.success(response)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun addAddress(address: AddressDto): Result<AddressDto> {
        return try {
            val response = apiService.addAddress(address)
            Result.success(response)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
