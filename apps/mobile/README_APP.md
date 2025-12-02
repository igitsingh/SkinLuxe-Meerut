# The Pizza Box - Android App

Native Android application for The Pizza Box food delivery service.

## Tech Stack
- **Language**: Kotlin
- **UI Toolkit**: Jetpack Compose
- **Architecture**: MVVM
- **Dependency Injection**: Hilt
- **Networking**: Retrofit
- **Local Storage**: Room
- **Image Loading**: Coil
- **Payments**: Razorpay

## Setup & Build

1.  **Prerequisites**
    - Android Studio Hedgehog or later.
    - JDK 17 or later (Note: If you have `OpenJDK25U-jdk_aarch64_mac_hotspot_25.0.1_8` in your downloads, you can configure Gradle to use it if compatible, but JDK 17 is the minimum requirement).
    - Android SDK API 34.

2.  **Configuration**
    - Open `apps/mobile/app/src/main/java/com/thepizzabox/MainActivity.kt` and replace `rzp_test_YOUR_KEY_HERE` with your actual Razorpay Test Key ID.
    - Ensure the backend API is running and accessible. Update `API_BASE_URL` in `apps/mobile/app/build.gradle.kts` if testing on a physical device (use your machine's IP instead of localhost).

3.  **Firebase Cloud Messaging (FCM)**
    - To enable push notifications, create a Firebase project.
    - Download `google-services.json` and place it in `apps/mobile/app/`.
    - Uncomment the Google Services plugin in `apps/mobile/build.gradle.kts` and `apps/mobile/app/build.gradle.kts` (currently omitted to avoid build errors without the file).

4.  **Build**
    - Open the project in Android Studio.
    - Sync Gradle.
    - Run on an Emulator or Physical Device.

## Project Structure
- `ui/`: Composable screens and ViewModels (Login, Home, Menu, Cart, Checkout).
- `data/`: Repository layer, API services, and Local DB (Room).
- `di/`: Hilt modules for dependency injection.
- `model/`: Data classes and entities.

## Features
- **User Auth**: Login/Signup with JWT.
- **Menu**: Browse categories and items.
- **Cart**: Local cart management with Room.
- **Checkout**: Address selection and Razorpay payment integration.
