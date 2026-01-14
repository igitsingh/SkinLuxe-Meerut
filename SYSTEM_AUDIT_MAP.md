# 🗺️ SkinLuxe System Map & Audit Plan

## 🏗️ System Architecture

### 1. **Frontend (Customer Website)**
- **Tech:** Next.js (likely App Router)
- **Port:** `3001`
- **Role:** Public interface for clients to view treatments, doctors, and book appointments.
- **Key Flows:**
  - View Treatments -> Select Treatment -> Book Appointment
  - Read Blog -> Contact Inquiry
  - User Login/Register -> View Profile

### 2. **Admin Panel**
- **Tech:** Next.js
- **Port:** `3002`
- **Role:** Management dashboard for internal staff.
- **Key Flows:**
  - Dashboard Overview (Stats)
  - Appointment Management (Calendar/List, Status updates)
  - Content Management (Treatments, Blogs, Doctors)
  - Lead Management (Inquiries)

### 3. **API Layer (Backend)**
- **Tech:** Node.js / Express
- **Port:** `5001`
- **Role:** Central logic & data access.
- **Auth:** JWT likely (based on `auth.routes.ts`)
- **Rate Limiting:** Configured (we fixed this earlier).

### 4. **Database**
- **Tech:** PostgreSQL
- **ORM:** Prisma
- **Schema:**
  - `User`, `ActivityLog`
  - `Treatment`, `Doctor`, `Appointment`
  - `BlogPost`, `Testimonial`
  - `Inquiry`, `Settings`, `Media`

---

## 🕵️ Audit Checklist (Layer-by-Layer)

### 1️⃣ Frontend (Customer Website)
- [ ] **Home Page:** Load speed, hero rendering, broken links.
- [ ] **Treatments:** Dynamic loading, correct slugs, image fallbacks.
- [ ] **Booking:** Form validation, submission success, API trigger.
- [ ] **Contact:** Form submission, error handling.
- [ ] **Mobile:** Responsive layout check.

### 2️⃣ Admin Panel
- [ ] **Auth:** Middleware protection, login flow.
- [ ] **Dashboard:** Real data vs mocks.
- [ ] **CRUD:** Create/Edit Treatment, Update Appointment Status.
- [ ] **Leads:** Inquiry visibility.

### 3️⃣ API & Sync
- [ ] **Endpoints:** Verify 200/400/500 responses.
- [ ] **Data:** Verify frontend inputs land in DB correctly.

---

## 🚦 Current Status Assessment
*(To be filled during audit steps)*

**RED FLAGS:**
- (Pending Audit)

**YELLOW FLAGS:**
- (Pending Audit)

**GREEN FLAGS:**
- Rate Limiting (Fixed)
- Admin Branding (Fixed)
- Appointment Creation (Fixed)

