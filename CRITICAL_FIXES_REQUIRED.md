# 🚨 CRITICAL FIXES REQUIRED - IMMEDIATE ACTION

## ❌ SYSTEM IS **NOT PRODUCTION READY**

---

## 🔴 BLOCKER #1: CONTACT FORM BROKEN (100% FAILURE RATE)

**Problem:** Every customer who fills the contact form gets a 400 error. Their inquiry is LOST.

**Root Cause:** Frontend calls `/api/inquiries` POST endpoint that doesn't exist.

**Fix Location:** `/apps/api/src/`

### Step 1: Create Inquiry Controller Method
**File:** `/apps/api/src/controllers/admin/inquiry.controller.ts`

Add this function:
```typescript
export const createInquiry = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, service, message } = req.body;
        
        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Name, email, and message are required' });
        }

        const inquiry = await prisma.inquiry.create({
            data: {
                name,
                email,
                phone: phone || null,
                subject: service || 'General Inquiry',
                message,
                status: 'NEW'
            }
        });

        res.status(201).json(inquiry);
    } catch (error) {
        console.error('Create inquiry error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
```

### Step 2: Add POST Route
**File:** `/apps/api/src/routes/admin/inquiry.routes.ts`

Change line 3 to import createInquiry:
```typescript
import { getInquiries, createInquiry, updateInquiryStatus, deleteInquiry } from '../../controllers/admin/inquiry.controller';
```

Add line after line 7:
```typescript
router.post('/', createInquiry);
```

### Step 3: Expose Public Route
**File:** `/apps/api/src/index.ts`

Add after line 28 (after adminInquiryRoutes import):
```typescript
import inquiryRoutes from './routes/admin/inquiry.routes'; // Reuse for public
```

Add after line 55 (in Public Routes section):
```typescript
app.use('/api/inquiries', inquiryRoutes);
```

**Test:** Fill contact form, should get success message instead of error.

---

## 🔴 BLOCKER #2: APPOINTMENT ENDPOINT SECURITY RISK

**Problem:** Public appointment form uses admin endpoint (security vulnerability).

**Fix Location:** `/apps/api/src/`

### Step 1: Create Public Appointment Routes
**File:** `/apps/api/src/routes/public/appointment.routes.ts` (NEW FILE)

```typescript
import { Router } from 'express';
import { createPublicAppointment } from '../../controllers/public/appointment.controller';

const router = Router();

router.post('/', createPublicAppointment);

export default router;
```

### Step 2: Create Public Appointment Controller
**File:** `/apps/api/src/controllers/public/appointment.controller.ts` (NEW FILE)

```typescript
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createPublicAppointment = async (req: Request, res: Response) => {
    try {
        const { name, phone, date, timeSlot, notes } = req.body;

        // Validation
        if (!name || !phone || !date) {
            return res.status(400).json({ message: 'Name, phone, and date are required' });
        }

        const appointment = await prisma.appointment.create({
            data: {
                name,
                phone,
                date: new Date(date),
                timeSlot: timeSlot || 'Pending',
                notes,
                status: 'PENDING'
            }
        });

        res.status(201).json(appointment);
    } catch (error) {
        console.error('Create public appointment error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
```

### Step 3: Update API Index
**File:** `/apps/api/src/index.ts`

Add import after line 17:
```typescript
import publicAppointmentRoutes from './routes/public/appointment.routes';
```

Add route after line 52 (in Public Routes section):
```typescript
app.use('/api/appointments', publicAppointmentRoutes);
```

**Test:** Book appointment from website, should still work but now uses secure public endpoint.

---

## ⚠️ HIGH PRIORITY FIX #3: ADD INPUT VALIDATION

**Problem:** No validation on any API endpoint = security risk + data corruption.

**Quick Fix:** Install Zod and add to appointment/inquiry controllers.

```bash
cd apps/api
npm install zod
```

Update inquiry controller:
```typescript
import { z } from 'zod';

const inquirySchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    phone: z.string().regex(/^[0-9]{10}$/).optional(),
    service: z.string().optional(),
    message: z.string().min(10).max(1000)
});

export const createInquiry = async (req: Request, res: Response) => {
    try {
        const validated = inquirySchema.parse(req.body);
        // ... rest of code
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: 'Validation failed', errors: error.errors });
        }
        // ... rest of error handling
    }
};
```

---

## ⚠️ HIGH PRIORITY FIX #4: ADD RATE LIMITING

**Problem:** API can be spammed/DDoS'd.

```bash
cd apps/api
npm install express-rate-limit
```

**File:** `/apps/api/src/index.ts`

Add after imports:
```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.'
});

const formLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // 5 form submissions per minute
    message: 'Too many submissions, please wait.'
});
```

Add before routes:
```typescript
app.use('/api/', limiter);
app.use('/api/appointments', formLimiter);
app.use('/api/inquiries', formLimiter);
```

---

## ⚠️ HIGH PRIORITY FIX #5: FIX JWT SECRET

**File:** `/apps/api/src/middleware/auth.middleware.ts`

Change line 4:
```typescript
// BEFORE (UNSAFE):
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// AFTER (SAFE):
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is required');
}
```

---

## ⚠️ HIGH PRIORITY FIX #6: UPDATE CORS FOR PRODUCTION

**File:** `/apps/api/src/index.ts`

Update CORS config (lines 33-42):
```typescript
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        process.env.FRONTEND_URL,
        process.env.ADMIN_URL,
        'https://skinluxe-meerut.vercel.app', // Add your production URLs
        'https://admin.skinluxe-meerut.vercel.app'
    ].filter(Boolean).map(url => (url as string).replace(/\/$/, '')),
    credentials: true,
}));
```

---

## 📋 TESTING CHECKLIST

After making fixes, test these flows:

### Contact Form Test
1. Go to http://localhost:3001/contact
2. Fill form with:
   - Name: Test User
   - Email: test@example.com
   - Phone: 9999999999
   - Service: Any
   - Message: Test inquiry
3. Submit
4. ✅ Should see success message (not 400 error)
5. ✅ Check admin panel - inquiry should appear

### Appointment Form Test
1. Go to http://localhost:3001/book-appointment
2. Select treatment, date, time
3. Enter name and phone
4. Submit
5. ✅ Should see success message
6. ✅ Check admin panel - appointment should appear

### Admin Panel Test
1. Go to http://localhost:3002
2. Login with admin credentials
3. ✅ Dashboard should load with stats
4. ✅ Navigate to Inquiries - should see test inquiry
5. ✅ Navigate to Appointments - should see test appointment

---

## 🚀 DEPLOYMENT CHECKLIST

Before deploying to production:

### Environment Variables
Set these in Vercel/hosting:

**API:**
```
DATABASE_URL=postgresql://...
JWT_SECRET=<generate-strong-random-secret>
FRONTEND_URL=https://skinluxe-meerut.vercel.app
ADMIN_URL=https://admin.skinluxe-meerut.vercel.app
NODE_ENV=production
```

**Frontend:**
```
NEXT_PUBLIC_API_URL=https://api.skinluxe-meerut.vercel.app/api
```

**Admin:**
```
NEXT_PUBLIC_API_URL=https://api.skinluxe-meerut.vercel.app/api
```

### Database
- [ ] Run migrations: `npx prisma migrate deploy`
- [ ] Set up automated backups (daily)
- [ ] Test database connection from production

### Final Checks
- [ ] All forms submit successfully
- [ ] Admin panel loads and shows data
- [ ] No console errors in browser
- [ ] API returns proper status codes
- [ ] CORS allows production domains
- [ ] Rate limiting is active

---

## 📞 EMERGENCY ROLLBACK

If something breaks after deployment:

1. **Revert to previous deployment** in Vercel dashboard
2. **Check API logs** for errors
3. **Verify database connection** is working
4. **Test locally first** before redeploying

---

**Last Updated:** 2026-01-13 13:45 IST  
**Status:** 🔴 NOT PRODUCTION READY - Fix blockers first
