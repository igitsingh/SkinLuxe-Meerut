package com.thepizzabox.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "cart_items")
data class CartItem(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val itemId: String,
    val name: String,
    val price: Double,
    val quantity: Int,
    val image: String?,
    val selectedOptions: String? // JSON string
)
