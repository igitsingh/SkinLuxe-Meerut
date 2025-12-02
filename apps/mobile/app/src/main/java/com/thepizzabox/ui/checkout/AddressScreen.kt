package com.thepizzabox.ui.checkout

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.outlined.Circle
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.thepizzabox.data.remote.AddressDto

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AddressScreen(
    onBackClick: () -> Unit,
    onAddressSelected: (String) -> Unit, // Pass address ID
    viewModel: AddressViewModel = hiltViewModel()
) {
    val state = viewModel.state.value

    if (state.showAddAddressDialog) {
        AddAddressDialog(
            onDismiss = { viewModel.hideAddAddressDialog() },
            onAdd = { street, city, stateVal, zip ->
                viewModel.addAddress(street, city, stateVal, zip)
            }
        )
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Select Address") },
                navigationIcon = {
                    IconButton(onClick = onBackClick) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                },
                actions = {
                    IconButton(onClick = { viewModel.showAddAddressDialog() }) {
                        Icon(Icons.Default.Add, contentDescription = "Add Address")
                    }
                }
            )
        },
        bottomBar = {
            Button(
                onClick = {
                    state.selectedAddress?.id?.let { onAddressSelected(it) }
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp)
                    .height(56.dp),
                shape = RoundedCornerShape(8.dp),
                enabled = state.selectedAddress != null
            ) {
                Text("Proceed to Payment")
            }
        }
    ) { padding ->
        if (state.isLoading) {
            Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                CircularProgressIndicator()
            }
            return@Scaffold
        }

        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            items(state.addresses) { address ->
                AddressItem(
                    address = address,
                    isSelected = state.selectedAddress?.id == address.id,
                    onClick = { viewModel.onAddressSelected(address) }
                )
            }
        }
    }
}

@Composable
fun AddressItem(address: AddressDto, isSelected: Boolean, onClick: () -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick),
        colors = CardDefaults.cardColors(
            containerColor = if (isSelected) MaterialTheme.colorScheme.primaryContainer else MaterialTheme.colorScheme.surfaceVariant
        )
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = address.street,
                    style = MaterialTheme.typography.bodyLarge,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = "${address.city}, ${address.state} - ${address.zip}",
                    style = MaterialTheme.typography.bodyMedium
                )
            }
            if (isSelected) {
                Icon(
                    Icons.Default.CheckCircle,
                    contentDescription = "Selected",
                    tint = MaterialTheme.colorScheme.primary
                )
            } else {
                Icon(
                    Icons.Outlined.Circle,
                    contentDescription = "Unselected",
                    tint = Color.Gray
                )
            }
        }
    }
}

@Composable
fun AddAddressDialog(onDismiss: () -> Unit, onAdd: (String, String, String, String) -> Unit) {
    var street by remember { mutableStateOf("") }
    var city by remember { mutableStateOf("") }
    var state by remember { mutableStateOf("") }
    var zip by remember { mutableStateOf("") }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Add New Address") },
        text = {
            Column {
                OutlinedTextField(value = street, onValueChange = { street = it }, label = { Text("Street") })
                OutlinedTextField(value = city, onValueChange = { city = it }, label = { Text("City") })
                OutlinedTextField(value = state, onValueChange = { state = it }, label = { Text("State") })
                OutlinedTextField(value = zip, onValueChange = { zip = it }, label = { Text("ZIP Code") })
            }
        },
        confirmButton = {
            Button(onClick = { onAdd(street, city, state, zip) }) {
                Text("Add")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancel")
            }
        }
    )
}
