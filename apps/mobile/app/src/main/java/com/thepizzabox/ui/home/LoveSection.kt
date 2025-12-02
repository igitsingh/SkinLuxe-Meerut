package com.thepizzabox.ui.home

import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.outlined.EmojiEvents
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.thepizzabox.ui.theme.BrandOrange
import com.thepizzabox.ui.theme.PizzaDarkGrey
import com.thepizzabox.ui.theme.PizzaYellow
import androidx.compose.material.icons.filled.LocalPizza
import androidx.compose.material.icons.filled.AttachMoney
import androidx.compose.material.icons.filled.RestaurantMenu
import androidx.compose.material.icons.filled.AccessTime
import androidx.compose.material.icons.filled.Celebration
import androidx.compose.material.icons.filled.ThumbUp

@OptIn(ExperimentalFoundationApi::class)
@Composable
fun LoveSection() {
    val pagerState = rememberPagerState(pageCount = { 2 })

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .background(Color(0xFF0F172A)) // Dark blue grid background
            .padding(vertical = 32.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Header Badge
        Surface(
            color = Color(0xFF1E293B),
            shape = RoundedCornerShape(50),
            border = androidx.compose.foundation.BorderStroke(1.dp, PizzaYellow),
            modifier = Modifier.padding(bottom = 16.dp)
        ) {
            Row(
                modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    imageVector = Icons.Outlined.EmojiEvents,
                    contentDescription = null,
                    tint = PizzaYellow,
                    modifier = Modifier.size(16.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "CUSTOMER FAVORITES",
                    style = MaterialTheme.typography.labelMedium,
                    color = PizzaYellow,
                    fontWeight = FontWeight.Bold
                )
            }
        }

        // Title
        val titleText = if (pagerState.currentPage == 0) "Wall of" else "Box of"
        Row(verticalAlignment = Alignment.CenterVertically) {
            Text(
                text = titleText,
                style = MaterialTheme.typography.headlineMedium,
                color = Color.White,
                fontWeight = FontWeight.Bold
            )
            Spacer(modifier = Modifier.width(8.dp))
            Text(
                text = "Love",
                style = MaterialTheme.typography.headlineMedium,
                color = BrandOrange,
                fontWeight = FontWeight.Bold
            )
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Google Rating Badge
        GoogleRatingBadge()

        Spacer(modifier = Modifier.height(32.dp))

        // Pager
        HorizontalPager(
            state = pagerState,
            contentPadding = PaddingValues(horizontal = 24.dp),
            pageSpacing = 16.dp
        ) { page ->
            if (page == 0) {
                WallOfLovePage()
            } else {
                BoxOfLovePage()
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Pagination Dots
        Row(
            horizontalArrangement = Arrangement.Center,
            modifier = Modifier.fillMaxWidth()
        ) {
            repeat(2) { iteration ->
                val color = if (pagerState.currentPage == iteration) BrandOrange else Color.Gray
                val width = if (pagerState.currentPage == iteration) 24.dp else 8.dp
                Box(
                    modifier = Modifier
                        .padding(4.dp)
                        .clip(RoundedCornerShape(4.dp))
                        .background(color)
                        .width(width)
                        .height(8.dp)
                )
            }
        }
    }
}

@Composable
fun GoogleRatingBadge() {
    Surface(
        color = Color(0xFF1E293B),
        shape = RoundedCornerShape(16.dp),
        border = androidx.compose.foundation.BorderStroke(1.dp, Color.Gray.copy(alpha = 0.3f))
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Google Logo (Simulated)
            Surface(
                shape = CircleShape,
                color = Color.White,
                modifier = Modifier.size(40.dp)
            ) {
                Box(contentAlignment = Alignment.Center) {
                    Text("G", fontWeight = FontWeight.Bold, fontSize = 24.sp, color = Color.Blue) // Placeholder
                }
            }
            
            Spacer(modifier = Modifier.width(16.dp))
            
            Column {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(
                        text = "4.8",
                        style = MaterialTheme.typography.titleLarge,
                        fontWeight = FontWeight.Bold,
                        color = Color.White
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(
                        text = "Ratings",
                        style = MaterialTheme.typography.bodyMedium,
                        color = Color.Gray
                    )
                }
            }
            
            Spacer(modifier = Modifier.width(16.dp))
            Divider(
                modifier = Modifier
                    .height(40.dp)
                    .width(1.dp),
                color = Color.Gray.copy(alpha = 0.3f)
            )
            Spacer(modifier = Modifier.width(16.dp))
            
            Column {
                Text(
                    text = "EXCELLENT",
                    style = MaterialTheme.typography.labelMedium,
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )
                Row {
                    repeat(5) {
                        Icon(
                            imageVector = Icons.Default.Star,
                            contentDescription = null,
                            tint = PizzaYellow,
                            modifier = Modifier.size(12.dp)
                        )
                    }
                }
                Text(
                    text = "Based on 50+ Reviews",
                    style = MaterialTheme.typography.labelSmall,
                    color = Color.Gray,
                    fontSize = 10.sp
                )
            }
        }
    }
}

@Composable
fun WallOfLovePage() {
    Card(
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        modifier = Modifier
            .fillMaxWidth()
            .height(400.dp) // Fixed height for consistency
    ) {
        Column(
            modifier = Modifier.padding(24.dp)
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                // Profile Pic Placeholder
                Surface(
                    shape = CircleShape,
                    color = BrandOrange,
                    modifier = Modifier.size(48.dp)
                ) {
                    Box(contentAlignment = Alignment.Center) {
                        Text("KY", color = Color.White, fontWeight = FontWeight.Bold)
                    }
                }
                
                Spacer(modifier = Modifier.width(12.dp))
                
                Column {
                    Text(
                        text = "Karan Yadav",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold,
                        color = Color.Black
                    )
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Outlined.EmojiEvents,
                            contentDescription = null,
                            tint = PizzaYellow,
                            modifier = Modifier.size(12.dp)
                        )
                        Spacer(modifier = Modifier.width(4.dp))
                        Text(
                            text = "Top Reviewer",
                            style = MaterialTheme.typography.labelSmall,
                            color = Color.Gray
                        )
                    }
                }
            }
            
            Spacer(modifier = Modifier.height(16.dp))
            
            Row {
                repeat(5) {
                    Icon(
                        imageVector = Icons.Default.Star,
                        contentDescription = null,
                        tint = PizzaYellow,
                        modifier = Modifier.size(16.dp)
                    )
                }
            }
            
            Spacer(modifier = Modifier.height(16.dp))
            
            Text(
                text = "\"I recently visited [The Pizza Box] and had an amazing experience! The pizza was cooked to perfection, with a crispy crust and flavorful toppings. The service was also top-notch, with friendly and attentive staff. Highly recommend!\"",
                style = MaterialTheme.typography.bodyLarge,
                color = PizzaDarkGrey,
                fontStyle = androidx.compose.ui.text.font.FontStyle.Italic
            )
            
            Spacer(modifier = Modifier.weight(1f))
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "11 months ago",
                    style = MaterialTheme.typography.labelSmall,
                    color = Color.Gray
                )
                
                Icon(
                    imageVector = Icons.Default.Star, // Placeholder for Google G icon
                    contentDescription = "Google",
                    tint = Color.Gray,
                    modifier = Modifier.size(16.dp)
                )
            }
        }
    }
}

@Composable
fun BoxOfLovePage() {
    Card(
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFFE2E8F0)), // Light gray background
        modifier = Modifier
            .fillMaxWidth()
            .height(400.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.SpaceEvenly
        ) {
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceEvenly) {
                FeatureItem(icon = Icons.Default.LocalPizza, title = "100% fresh ingredients", subtitle = "& crispy crusts")
                FeatureItem(icon = Icons.Default.AttachMoney, title = "Affordable pricing", subtitle = "(₹1-400 per person)")
            }
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceEvenly) {
                FeatureItem(icon = Icons.Default.ThumbUp, title = "Top-rated on Google", subtitle = "(4.8⭐ with 50+ reviews)")
                FeatureItem(icon = Icons.Default.RestaurantMenu, title = "Wide menu", subtitle = "pizzas, burgers, etc.")
            }
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceEvenly) {
                FeatureItem(icon = Icons.Default.AccessTime, title = "Open till 11 PM", subtitle = "for late-night cravings")
                FeatureItem(icon = Icons.Default.Celebration, title = "Perfect for parties", subtitle = "& family hangouts")
            }
        }
    }
}

@Composable
fun FeatureItem(icon: ImageVector, title: String, subtitle: String) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier
            .width(140.dp)
            .padding(8.dp)
    ) {
        Surface(
            shape = CircleShape,
            color = Color(0xFFFEF3C7), // Light yellow/orange bg
            modifier = Modifier.size(48.dp)
        ) {
            Box(contentAlignment = Alignment.Center) {
                Icon(imageVector = icon, contentDescription = null, tint = BrandOrange)
            }
        }
        Spacer(modifier = Modifier.height(8.dp))
        Text(
            text = title,
            style = MaterialTheme.typography.labelMedium,
            fontWeight = FontWeight.Bold,
            textAlign = TextAlign.Center,
            color = PizzaDarkGrey
        )
        Text(
            text = subtitle,
            style = MaterialTheme.typography.labelSmall,
            textAlign = TextAlign.Center,
            color = Color.Gray,
            fontSize = 10.sp
        )
    }
}
