# The Pizza Box API

Backend for The Pizza Box web and mobile applications.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: JWT
- **Payments**: Stripe (Web), Razorpay (Mobile)
- **Notifications**: Firebase Cloud Messaging (FCM)

## Setup

1.  **Install Dependencies**
    ```bash
    cd apps/api
    npm install
    ```

2.  **Environment Variables**
    Create a `.env` file in `apps/api`:
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/the_pizza_box"
    JWT_SECRET="your_jwt_secret"
    FRONTEND_URL="http://localhost:3001"
    ADMIN_URL="http://localhost:3002"
    
    # Razorpay
    RAZORPAY_KEY_ID="rzp_test_..."
    RAZORPAY_KEY_SECRET="your_secret"

    # Stripe
    STRIPE_SECRET_KEY="sk_test_..."
    STRIPE_WEBHOOK_SECRET="whsec_..."
    ```

3.  **Database Migration**
    ```bash
    npx prisma migrate dev
    ```

4.  **Run Server**
    ```bash
    npm run dev
    ```

## API Endpoints

### Auth
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user profile

### User
- `PUT /api/users/me` - Update profile (Name, Phone)
- `POST /api/users/addresses` - Add address
- `GET /api/users/addresses` - List addresses

### Menu
- `GET /api/menu` - Get all categories and items
- `GET /api/menu/items/:id` - Get item details

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - List orders
- `GET /api/orders/:id` - Get order details

### Payments
- `POST /api/payments/razorpay/create-order` - Initialize Razorpay payment
- `POST /api/payments/razorpay/verify` - Verify Razorpay payment

### Notifications
- `POST /api/notifications/register-token` - Register FCM token

## Testing
Run tests with:
```bash
npm test
```
