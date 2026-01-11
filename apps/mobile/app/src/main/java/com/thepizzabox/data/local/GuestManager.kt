package com.thepizzabox.data.local

import android.content.Context
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import com.google.gson.Gson
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import javax.inject.Inject
import javax.inject.Singleton

private val Context.dataStore by preferencesDataStore(name = "guest_prefs")

data class GuestAddress(
    val line1: String,
    val line2: String,
    val locality: String,
    val city: String,
    val state: String,
    val pincode: String
)

@Singleton
class GuestManager @Inject constructor(
    @ApplicationContext private val context: Context
) {
    private val GUEST_ADDRESS_KEY = stringPreferencesKey("guest_address")
    private val IS_GUEST_MODE_KEY = stringPreferencesKey("is_guest_mode") // Optional, can imply from token absence + user action

    val guestAddress: Flow<GuestAddress?> = context.dataStore.data
        .map { preferences ->
            preferences[GUEST_ADDRESS_KEY]?.let { json ->
                Gson().fromJson(json, GuestAddress::class.java)
            }
        }

    suspend fun saveGuestAddress(address: GuestAddress) {
        context.dataStore.edit { preferences ->
            preferences[GUEST_ADDRESS_KEY] = Gson().toJson(address)
        }
    }

    suspend fun clearGuestData() {
        context.dataStore.edit { preferences ->
            preferences.remove(GUEST_ADDRESS_KEY)
        }
    }
}
