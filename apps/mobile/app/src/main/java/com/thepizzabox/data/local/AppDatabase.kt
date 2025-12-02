package com.thepizzabox.data.local

import androidx.room.Database
import androidx.room.RoomDatabase
import com.thepizzabox.data.model.CartItem

@Database(entities = [CartItem::class], version = 1, exportSchema = false)
abstract class AppDatabase : RoomDatabase() {
    abstract fun cartDao(): CartDao
}
