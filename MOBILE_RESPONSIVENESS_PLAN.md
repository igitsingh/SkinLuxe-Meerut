# Mobile Responsiveness & Optimization Plan

## Objective
Ensure the SkinLuxe Ecosystem (Customer Website, Admin Panel, and supporting Backend) is fully optimized for mobile devices, delivering a premium app-like experience on smartphones and tablets.

## Phase 1: Customer Website (apps/web)
The face of the brand. Must look stunning and function perfectly on mobile.

### 1.1 Global Elements
- [ ] **Navigation Bar**: Verify mobile menu toggle, animation, and link spacing.
- [ ] **Footer**: Ensure stacking order and spacing are correct.
- [ ] **Typography**: Check font sizes for readability on small screens (headers not too huge, body text legible).
- [ ] **Buttons**: Ensure touch targets are at least 44px height.

### 1.2 Home Page
- [ ] **Hero Section**: Check background image scaling/cropping and text overlay visibility.
- [ ] **Service Cards**: Verify stacking (1 column on mobile) and card sizing.
- [ ] **Testimonials**: Ensure slider/carousel works with touch swipes.
- [ ] **Call to Action**: Visibility and ease of access.

### 1.3 Treatment Pages (Dynamic)
- [ ] **Layout**: Ensure sidebars (if any) move to bottom or are hidden/collapsible.
- [ ] **Comparison Tables**: These often break on mobile. Need horizontal scroll or card view.
- [ ] **Images**: Responsive sizing.

### 1.4 Booking & Contact
- [ ] **Forms**: Input fields must be easily tappable and not zoom in (font-size >= 16px).
- [ ] **Map**: Ensure embedding resizes correctly.

## Phase 2: Admin Panel (apps/admin)
Enable business management on the go.

### 2.1 Dashboard
- [ ] **Stats Cards**: Stack correctly.
- [ ] **Charts**: Responsive or simplified view.

### 2.2 Appointments & Calendar
- [ ] **Calendar View**: This is critical. Day view works best on mobile. Month view might need simplification.
- [ ] **Booking Actions**: Buttons to Approve/Reschedule must be accessible.

## Phase 3: API & Database (Performance)
While not "visually" responsive, the backend supports the mobile experience.

- [ ] **Payload Optimization**: Ensure we aren't sending massive data unused by mobile.
- [ ] **Image Optimization**: Verify images served are appropriate size (Next.js Image component usually handles this, but we'll verify).

## Current Status
- **Desktop**: "Locked" & Stable.
- **Mobile**: Pending Audit.
