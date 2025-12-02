package com.thepizzabox.ui.menu

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.compose.ui.graphics.Color
import com.thepizzabox.ui.theme.BrandOrange
import com.thepizzabox.ui.home.PizzaCard

@Composable
fun MenuScreen(
    onProductClick: (String) -> Unit,
    viewModel: MenuViewModel = hiltViewModel()
) {
    val state = viewModel.state.value

    Column(modifier = Modifier.fillMaxSize()) {
        if (state.isLoading) {
            Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                CircularProgressIndicator()
            }
            return
        }

        if (state.error != null) {
            Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                Text(text = "Error: ${state.error}", color = MaterialTheme.colorScheme.error)
            }
            return
        }

        // Categories Tabs
        ScrollableTabRow(
            selectedTabIndex = state.categories.indexOfFirst { it.id == state.selectedCategoryId }.takeIf { it != -1 } ?: 0,
            edgePadding = 16.dp,
            modifier = Modifier.fillMaxWidth()
        ) {
            state.categories.forEach { category ->
                Tab(
                    selected = state.selectedCategoryId == category.id,
                    onClick = { viewModel.onCategorySelected(category.id) },
                    text = { Text(text = category.name, color = if (state.selectedCategoryId == category.id) BrandOrange else Color.Gray) }
                )
            }
        }

        // Items List
        val selectedCategory = state.categories.find { it.id == state.selectedCategoryId }
        
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            if (selectedCategory != null) {
                items(selectedCategory.items) { item ->
                    PizzaCard(item = item, onClick = { onProductClick(item.id) })
                }
            }
        }
    }
}
