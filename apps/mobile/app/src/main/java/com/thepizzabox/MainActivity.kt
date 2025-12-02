package com.thepizzabox

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import android.widget.Toast
import com.razorpay.Checkout
import com.razorpay.PaymentResultWithDataListener
import com.thepizzabox.ui.checkout.AddressScreen
import com.thepizzabox.ui.checkout.PaymentViewModel
import com.thepizzabox.ui.home.HomeScreen
import com.thepizzabox.ui.login.LoginScreen
import com.thepizzabox.ui.menu.MenuScreen
import com.thepizzabox.ui.product.ProductDetailScreen
import com.thepizzabox.ui.cart.CartScreen
import com.thepizzabox.ui.splash.SplashScreen
import com.thepizzabox.ui.theme.ThePizzaBoxTheme
import dagger.hilt.android.AndroidEntryPoint
import org.json.JSONObject

@AndroidEntryPoint
class MainActivity : ComponentActivity(), PaymentResultWithDataListener {
    
    // We need a way to pass the result back to the ViewModel. 
    // Since ViewModel is scoped to a screen, we might need a shared ViewModel or a way to access the active one.
    // For simplicity, we'll use a simple static reference or a shared flow, but that's hacky.
    // Better approach: The ViewModel triggering the payment should be accessible.
    // We can use a shared ViewModel scoped to the Activity or NavGraph.
    // Or, simpler: expose a callback.
    
    var paymentViewModel: PaymentViewModel? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Checkout.preload(applicationContext)
        
        setContent {
            ThePizzaBoxTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    val navController = rememberNavController()
                    
                    NavHost(navController = navController, startDestination = "splash") {
                        composable("splash") {
                            SplashScreen(
                                onSplashFinished = {
                                    navController.navigate("home") {
                                        popUpTo("splash") { inclusive = true }
                                    }
                                }
                            )
                        }
                        composable("login") {
                            LoginScreen(
                                onLoginSuccess = {
                                    navController.navigate("home") {
                                        popUpTo("login") { inclusive = true }
                                    }
                                }
                            )
                        }
                        composable("home") {
                            HomeScreen(
                                onProductClick = { productId ->
                                    navController.navigate("product/$productId")
                                },
                                onCategoryClick = { categoryId ->
                                    navController.navigate("menu")
                                }
                            )
                        }
                        composable("menu") {
                            MenuScreen(
                                onProductClick = { productId ->
                                    navController.navigate("product/$productId")
                                }
                            )
                        }
                        composable("product/{productId}") {
                            ProductDetailScreen(
                                onBackClick = { navController.popBackStack() },
                                onCartClick = { navController.navigate("cart") }
                            )
                        }
                        composable("cart") {
                            CartScreen(
                                onBackClick = { navController.popBackStack() },
                                onCheckoutClick = { navController.navigate("address") }
                            )
                        }
                        composable("address") {
                            AddressScreen(
                                onBackClick = { navController.popBackStack() },
                                onAddressSelected = { addressId ->
                                    navController.navigate("payment/$addressId")
                                }
                            )
                        }
                        composable("payment/{addressId}") { backStackEntry ->
                            val addressId = backStackEntry.arguments?.getString("addressId") ?: return@composable
                            val viewModel: PaymentViewModel = hiltViewModel()
                            paymentViewModel = viewModel // Store reference
                            
                            val state = viewModel.state.value
                            
                            LaunchedEffect(Unit) {
                                viewModel.initPayment(addressId)
                            }
                            
                            LaunchedEffect(state.shouldLaunchRazorpay) {
                                if (state.shouldLaunchRazorpay && state.razorpayOrderId != null) {
                                    startPayment(state.razorpayOrderId, state.amount ?: 0)
                                }
                            }
                            
                            LaunchedEffect(state.isPaymentSuccessful) {
                                if (state.isPaymentSuccessful) {
                                    Toast.makeText(this@MainActivity, "Order Placed Successfully!", Toast.LENGTH_LONG).show()
                                    navController.navigate("home") {
                                        popUpTo("home") { inclusive = true }
                                    }
                                }
                            }
                            
                            if (state.isLoading) {
                                Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                                    CircularProgressIndicator()
                                }
                            } else if (state.error != null) {
                                Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                                    Text("Error: ${state.error}", color = MaterialTheme.colorScheme.error)
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    private fun startPayment(orderId: String, amount: Int) {
        val checkout = Checkout()
        checkout.setKeyID("rzp_test_YOUR_KEY_HERE") // TODO: Get from BuildConfig
        
        try {
            val options = JSONObject()
            options.put("name", "The Pizza Box")
            options.put("description", "Order Payment")
            options.put("currency", "INR")
            options.put("amount", amount)
            options.put("order_id", orderId)
            options.put("prefill.email", "test@example.com") // TODO: Get user email
            options.put("prefill.contact", "9876543210") // TODO: Get user phone
            
            checkout.open(this, options)
        } catch (e: Exception) {
            Toast.makeText(this, "Error in payment: ${e.message}", Toast.LENGTH_LONG).show()
        }
    }

    override fun onPaymentSuccess(razorpayPaymentId: String?, paymentData: com.razorpay.PaymentData?) {
        if (razorpayPaymentId != null && paymentData != null) {
             paymentViewModel?.onPaymentSuccess(razorpayPaymentId, paymentData.signature)
        }
    }

    override fun onPaymentError(code: Int, response: String?, paymentData: com.razorpay.PaymentData?) {
        paymentViewModel?.onPaymentError(code, response ?: "Unknown error")
    }
}
