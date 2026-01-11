# 🚀 SKINLUXE DEPLOYMENT GUIDE

## Complete step-by-step guide to deploy SkinLuxe to production

---

## 📋 PRE-DEPLOYMENT CHECKLIST

- [ ] All pages tested locally
- [ ] Environment variables configured
- [ ] Database schema ready
- [ ] Domain purchased (optional)
- [ ] Email service configured
- [ ] Payment gateway setup (optional)

---

## 1. DATABASE SETUP

### Option A: Supabase (Recommended - Free tier available)

1. **Create Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up with GitHub/Google
   - Create new project

2. **Create Database**
   - Project name: `skinluxe-meerut`
   - Database password: (save this securely)
   - Region: `Mumbai (ap-south-1)`

3. **Run Schema**
   - Go to SQL Editor
   - Copy contents from `database/schema.sql`
   - Click "Run"
   - Verify all tables created

4. **Get Connection Strings**
   - Go to Project Settings → Database
   - Copy `Connection string` (for DATABASE_URL)
   - Copy `Direct connection` (for DIRECT_URL)

### Option B: Neon (Alternative - Serverless Postgres)

1. Go to [neon.tech](https://neon.tech)
2. Create project: `skinluxe-meerut`
3. Copy connection string
4. Run schema in SQL editor

### Option C: Vercel Postgres

1. In Vercel dashboard
2. Storage → Create Database → Postgres
3. Copy connection strings
4. Run schema

---

## 2. VERCEL DEPLOYMENT

### Step 1: Prepare Repository

```bash
# Navigate to project
cd /Users/isachinsingh/.gemini/antigravity/scratch/SkinLuxe-Meerut

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - SkinLuxe website"

# Create GitHub repository
# Go to github.com → New Repository → skinluxe-meerut

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/skinluxe-meerut.git

# Push
git push -u origin main
```

### Step 2: Deploy to Vercel

**Option A: Vercel CLI (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: skinluxe-meerut
# - Directory: ./
# - Override settings? No

# Deploy to production
vercel --prod
```

**Option B: Vercel Dashboard**

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import from GitHub
4. Select `skinluxe-meerut` repository
5. Configure:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `cd apps/web && npm run build`
   - Output Directory: `apps/web/.next`
6. Click "Deploy"

### Step 3: Configure Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables:

```env
# Database
DATABASE_URL=your-supabase-connection-string
DIRECT_URL=your-supabase-direct-connection-string

# Authentication
NEXTAUTH_SECRET=generate-random-secret-here
NEXTAUTH_URL=https://your-domain.vercel.app

# Email (Choose one)
# Option 1: Gmail SMTP
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=SkinLuxe <noreply@skinluxe-meerut.com>

# Option 2: SendGrid
SENDGRID_API_KEY=your-sendgrid-api-key

# SMS (Optional - Twilio)
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890

# Payment (Optional - Razorpay)
RAZORPAY_KEY_ID=your-key-id
RAZORPAY_KEY_SECRET=your-key-secret

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Site Config
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_NAME=SkinLuxe Aesthetics & Academy
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### Step 4: Redeploy

After adding environment variables:
```bash
vercel --prod
```

---

## 3. CUSTOM DOMAIN SETUP (Optional)

### Step 1: Purchase Domain

Recommended registrars:
- GoDaddy
- Namecheap
- Google Domains
- Hostinger

Suggested domains:
- skinluxe-meerut.com
- skinluxemeerut.com
- skinluxeacademy.com

### Step 2: Configure DNS

In Vercel Dashboard → Project → Settings → Domains:

1. Click "Add Domain"
2. Enter your domain: `skinluxe-meerut.com`
3. Follow DNS configuration instructions
4. Add these records in your domain registrar:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

5. Wait for DNS propagation (5-30 minutes)
6. SSL certificate will be auto-generated

---

## 4. EMAIL SERVICE SETUP

### Option A: Gmail SMTP (Free, Easy)

1. **Enable 2-Factor Authentication**
   - Go to Google Account → Security
   - Enable 2-Step Verification

2. **Generate App Password**
   - Go to Security → App passwords
   - Select app: Mail
   - Select device: Other (Custom name)
   - Name: SkinLuxe Website
   - Copy the 16-character password

3. **Add to Vercel Environment Variables**
   ```
   EMAIL_SERVER_HOST=smtp.gmail.com
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER=your-email@gmail.com
   EMAIL_SERVER_PASSWORD=your-16-char-app-password
   EMAIL_FROM=SkinLuxe <noreply@skinluxe-meerut.com>
   ```

### Option B: SendGrid (Professional, Free tier: 100 emails/day)

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Verify email
3. Create API Key
4. Add to environment variables:
   ```
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
   EMAIL_FROM=noreply@skinluxe-meerut.com
   ```

### Option C: Resend (Modern, Developer-friendly)

1. Sign up at [resend.com](https://resend.com)
2. Add domain (optional)
3. Create API Key
4. Add to environment variables:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   EMAIL_FROM=noreply@skinluxe-meerut.com
   ```

---

## 5. SMS SETUP (Optional - Twilio)

1. **Sign up at [twilio.com](https://twilio.com)**
2. **Get Free Trial Credits** ($15 credit)
3. **Get Phone Number**
   - Console → Phone Numbers → Buy a number
   - Choose India (+91) number
4. **Get Credentials**
   - Account SID
   - Auth Token
5. **Add to Environment Variables**
   ```
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=your-auth-token
   TWILIO_PHONE_NUMBER=+91XXXXXXXXXX
   ```

---

## 6. PAYMENT GATEWAY SETUP (Optional - Razorpay)

1. **Sign up at [razorpay.com](https://razorpay.com)**
2. **Complete KYC** (Business verification)
3. **Get API Keys**
   - Settings → API Keys
   - Generate Test Keys (for testing)
   - Generate Live Keys (for production)
4. **Add to Environment Variables**
   ```
   RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=your-secret-key
   ```

---

## 7. GOOGLE SERVICES SETUP

### Google Analytics

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create Account → Property
3. Property name: SkinLuxe Meerut
4. Copy Measurement ID (G-XXXXXXXXXX)
5. Add to environment variables:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

### Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: your-domain.com
3. Verify ownership (DNS or HTML file)
4. Submit sitemap: `https://your-domain.com/sitemap.xml`

### Google My Business

1. Go to [business.google.com](https://business.google.com)
2. Create Business Profile
3. Business name: SkinLuxe Aesthetics & Academy
4. Category: Dermatologist / Skin Care Clinic
5. Address: Begum Bridge Road, Meerut
6. Phone: +91 74519 10272
7. Verify business (postcard/phone)

---

## 8. POST-DEPLOYMENT CHECKLIST

### Testing

- [ ] Visit deployed URL
- [ ] Test all pages load correctly
- [ ] Test booking system
- [ ] Test contact form
- [ ] Test mobile responsiveness
- [ ] Test on different browsers
- [ ] Check console for errors

### SEO

- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google My Business
- [ ] Add structured data
- [ ] Optimize meta descriptions
- [ ] Add alt text to images
- [ ] Test page speed (PageSpeed Insights)

### Security

- [ ] HTTPS enabled (auto with Vercel)
- [ ] Environment variables secured
- [ ] Database credentials secured
- [ ] Admin password changed
- [ ] CORS configured

### Monitoring

- [ ] Set up Google Analytics
- [ ] Set up error tracking (Sentry - optional)
- [ ] Set up uptime monitoring (UptimeRobot - optional)
- [ ] Monitor database usage

---

## 9. MAINTENANCE

### Regular Tasks

**Daily:**
- Check appointment bookings
- Respond to contact form submissions
- Monitor email deliverability

**Weekly:**
- Review analytics
- Check for broken links
- Update blog content
- Backup database

**Monthly:**
- Review and update content
- Check for security updates
- Optimize images
- Review performance metrics

---

## 10. TROUBLESHOOTING

### Build Fails

```bash
# Clear cache and rebuild
vercel --force

# Check build logs
vercel logs
```

### Database Connection Issues

- Verify connection strings
- Check database is running
- Verify IP whitelist (if applicable)
- Test connection locally

### Email Not Sending

- Check SMTP credentials
- Verify app password (Gmail)
- Check spam folder
- Verify email service is active

### Domain Not Working

- Wait for DNS propagation (up to 48 hours)
- Verify DNS records
- Clear browser cache
- Try incognito mode

---

## 11. SUPPORT & RESOURCES

### Documentation
- Next.js: [nextjs.org/docs](https://nextjs.org/docs)
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Supabase: [supabase.com/docs](https://supabase.com/docs)

### Community
- Next.js Discord
- Vercel Community
- Stack Overflow

---

## 🎉 DEPLOYMENT COMPLETE!

Your SkinLuxe website is now live at:
**https://your-domain.vercel.app**

### Next Steps:
1. Share the link with your team
2. Start accepting bookings
3. Promote on social media
4. Monitor analytics
5. Gather user feedback

---

**Deployed:** [Date]  
**Version:** 1.0  
**Status:** ✅ LIVE
