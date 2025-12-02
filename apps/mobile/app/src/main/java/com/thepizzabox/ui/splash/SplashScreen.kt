package com.thepizzabox.ui.splash

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.size
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.LocalPizza
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.thepizzabox.ui.theme.BrandOrange
import kotlinx.coroutines.delay

@Composable
fun SplashScreen(
    onSplashFinished: () -> Unit
) {
    LaunchedEffect(Unit) {
        delay(2000) // Show splash for 2 seconds
        onSplashFinished()
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(BrandOrange),
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = "The Pizza Box",
            style = MaterialTheme.typography.displayLarge.copy(
                fontSize = 48.sp,
                fontWeight = FontWeight.Bold,
                fontFamily = FontFamily.Cursive, // Using Cursive as a proxy for the bubbly font
                color = Color.White
            )
        )

        // Pizza Image/Icon at bottom left
        // Using a large icon as a placeholder for the actual image
        Icon(
            imageVector = Icons.Filled.LocalPizza,
            contentDescription = null,
            tint = Color.Unspecified, // Use original colors if possible, or tint
            modifier = Modifier
                .align(Alignment.BottomStart)
                .size(200.dp)
                .offset(x = (-40).dp, y = 40.dp) // Offset to make it look like it's peeking out
        )
    }
}
