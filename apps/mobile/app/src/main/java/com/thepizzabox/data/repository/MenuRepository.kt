package com.thepizzabox.data.repository

import com.thepizzabox.data.remote.ApiService
import com.thepizzabox.data.remote.CategoryDto
import com.thepizzabox.data.remote.ItemDto
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class MenuRepository @Inject constructor(
    private val apiService: ApiService
) {
    suspend fun getMenu(): Result<List<CategoryDto>> {
        return try {
            val response = apiService.getMenu()
            Result.success(response)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun getBestsellers(): Result<List<ItemDto>> {
        return try {
            val response = apiService.getBestsellers()
            Result.success(response)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
