# SkinLuxe API Documentation

## Overview
This API powers the SkinLuxe Aesthetics & Academy platform.
It replaces the legacy "Pizza Box" API.

## Base URL
`http://localhost:5001`

## Authentication
- Admin Routes require `Authorization: Bearer <token>` (or Cookie).
- Public Routes are open.

## Endpoints

### 🏥 Treatments (Admin)
- `GET /api/admin/treatments` - List all treatments
- `POST /api/admin/treatments` - Create new treatment
- `GET /api/admin/treatments/:id` - Get details
- `PUT /api/admin/treatments/:id` - Update
- `DELETE /api/admin/treatments/:id` - Delete

### 👨‍⚕️ Doctors (Admin)
- `GET /api/admin/doctors` - List team
- `POST /api/admin/doctors` - Add doctor
- `PUT /api/admin/doctors/:id` - Update
- `DELETE /api/admin/doctors/:id` - Remove

### 📅 Appointments (Admin)
- `GET /api/admin/appointments` - View bookings
- `POST /api/admin/appointments` - Create booking (Manual)
- `PUT /api/admin/appointments/:id` - Update status (CONFIRMED/CANCELLED)

### 📊 Analytics
- `GET /api/admin/analytics/dashboard` - Get stats

### 🔐 Auth
- `POST /api/auth/login` - Customer/Admin Login
- `POST /api/auth/signup` - Customer Signup
