# SkinLuxe Meerut API Contract (v1) - FROZEN

> **STATUS: FROZEN**
> **DATE: 2026-01-15**
> **VERSION: 1.0.0**

This document certifies that the API contracts for SkinLuxe Meerut are frozen. No breaking changes are permitted to the schemas below.

## 1. Global Response Formats

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
// Note: Legacy endpoints may return raw data. New endpoints mostly follow strict shape.
```

### Error Response (Standardized)
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message"
  }
}
```

## 2. Authentication

### Public Auth
- `POST /api/auth/signup`: Create user
- `POST /api/auth/login`: Login user (Returns JWT)
- `POST /api/auth/logout`: Logout

### Admin Auth
- `POST /api/admin/auth/login`: Admin Login (Returns JWT + Cookie)
- `POST /api/admin/auth/logout`: Admin Logout

## 3. Public Endpoints

### Treatments
- `GET /api/treatments`: List all treatments
- `GET /api/treatments/:slug`: Get treatment details

### Booking & Inquiries
- `POST /api/appointments`: Book appointment (Rate Limited: 5/min)
- `POST /api/inquiries`: Send contact inquiry (Rate Limited: 5/min)
- Schema:
  ```json
  {
    "name": "String",
    "phone": "String",
    "email": "String (Optional)",
    "message": "String (Optional)",
    "service": "String (Optional)"
  }
  ```

## 4. Admin Endpoints (Secured)

- `GET/POST/PUT/DELETE /api/admin/treatments`: Manage treatments
- `GET/POST/PUT/DELETE /api/admin/doctors`: Manage doctors
- `GET/PUT /api/admin/appointments`: Manage appointments
- `GET/DELETE /api/admin/inquiries`: Manage inquiries
- `GET/POST/PUT/DELETE /api/admin/blog`: Manage blog posts
- `GET /api/admin/analytics`: Dashboard stats
- `GET /api/admin/settings`: Global settings

## 5. Security Policies

- **Rate Limiting**:
  - Global: 100 req / 15 min
  - Auth: 20 req / 15 min
  - Forms: 5 req / 1 min
- **CORS**: Strict allowlist (Production Domains + Localhost).
- **Auth**: JWT (Bearer Token) required for Admin routes.

---
**CERTIFICATION**
This API is declared stable for frontend integration.
