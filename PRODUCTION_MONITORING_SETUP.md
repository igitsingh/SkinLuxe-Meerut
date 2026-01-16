# Production Monitoring Setup Guide

This guide covers setting up comprehensive monitoring for the SkinLuxe production system.

---

## 1. Error Tracking with Sentry

### Why Sentry?
- Real-time error tracking and alerting
- Performance monitoring
- Release tracking
- User impact analysis
- Security incident detection

### Setup Steps:

#### Step 1: Create Sentry Account
1. Go to https://sentry.io
2. Sign up for a free account (supports up to 5,000 errors/month)
3. Create a new project:
   - **Platform:** Node.js
   - **Project Name:** SkinLuxe API
   - **Alert Frequency:** Real-time

#### Step 2: Get Your DSN
1. After project creation, copy your DSN (looks like: `https://xxxxx@o123456.ingest.sentry.io/7654321`)
2. Add to Render environment variables:
   ```
   SENTRY_DSN=https://xxxxx@o123456.ingest.sentry.io/7654321
   ```

#### Step 3: Install Sentry Package (if not already installed)
```bash
cd apps/api
npm install @sentry/node @sentry/profiling-node
```

#### Step 4: Uncomment Sentry Code
In `apps/api/src/config/monitoring.ts`, uncomment the Sentry initialization code (lines 13-72).

#### Step 5: Deploy
Push changes and redeploy to Render. Check Sentry dashboard for incoming events.

### Sentry Best Practices:
- **Set up Alerts:** Configure email/Slack notifications for critical errors
- **Release Tracking:** Tag deployments with version numbers
- **Performance Monitoring:** Enable transaction tracing (already configured)
- **User Context:** Add user IDs to error reports (privacy-safe)

---

## 2. Uptime Monitoring with UptimeRobot

### Why UptimeRobot?
- Free tier: 50 monitors, 5-minute intervals
- Email/SMS/Slack alerts
- Public status pages
- 99.9% uptime SLA

### Setup Steps:

#### Step 1: Create UptimeRobot Account
1. Go to https://uptimerobot.com
2. Sign up for a free account

#### Step 2: Add Monitors

**Monitor 1: API Health Check**
- **Monitor Type:** HTTP(s)
- **Friendly Name:** SkinLuxe API Health
- **URL:** `https://skinluxe-meerut-api.onrender.com/healthz`
- **Monitoring Interval:** 5 minutes
- **Alert Contacts:** Your email
- **Expected Response:** HTTP 200
- **Keyword Check:** `"status":"ok"`

**Monitor 2: Customer Website**
- **Monitor Type:** HTTP(s)
- **Friendly Name:** SkinLuxe Customer Site
- **URL:** `https://skinluxe-meerut-web-og.vercel.app`
- **Monitoring Interval:** 5 minutes
- **Expected Response:** HTTP 200

**Monitor 3: Admin Panel**
- **Monitor Type:** HTTP(s)
- **Friendly Name:** SkinLuxe Admin Panel
- **URL:** `https://skinluxe-meerut-admin-og.vercel.app`
- **Monitoring Interval:** 5 minutes
- **Expected Response:** HTTP 200

#### Step 3: Configure Alerts
1. Go to **My Settings** → **Alert Contacts**
2. Add:
   - Your email address
   - SMS number (optional, requires verification)
   - Slack webhook (optional)

#### Step 4: Set Up Status Page (Optional)
1. Go to **Public Status Pages**
2. Create a new status page
3. Add all monitors
4. Share URL with stakeholders

---

## 3. Database Monitoring (Render PostgreSQL)

### Render Built-in Monitoring:
1. Go to Render Dashboard → Your Database
2. Enable **Metrics** tab to view:
   - Connection count
   - Query performance
   - Disk usage
   - Memory usage

### Set Up Alerts:
1. In Render Dashboard, go to **Notifications**
2. Add email for:
   - High connection count (>80% of max)
   - Disk usage (>80%)
   - Database downtime

---

## 4. Log Aggregation (Optional - Recommended for Production)

### Option A: Render Logs (Built-in)
- View real-time logs in Render Dashboard
- Limited retention (7 days on free tier)
- No search/filtering capabilities

### Option B: Logtail (Recommended)
1. Sign up at https://logtail.com (free tier: 1GB/month)
2. Create a source for "SkinLuxe API"
3. Add to Render environment variables:
   ```
   LOGTAIL_SOURCE_TOKEN=your_token_here
   ```
4. Install package:
   ```bash
   npm install @logtail/node
   ```
5. Integrate in `apps/api/src/config/monitoring.ts`

---

## 5. Performance Monitoring

### Metrics to Track:
- **API Response Time:** Target <200ms for 95th percentile
- **Database Query Time:** Target <50ms average
- **Error Rate:** Target <0.1%
- **Uptime:** Target 99.9%

### Tools:
- **Sentry Performance:** Already configured (transaction tracing)
- **Render Metrics:** Built-in CPU/Memory graphs
- **Google Analytics:** For customer website traffic

---

## 6. Security Monitoring

### What to Monitor:
- Failed login attempts (>5 in 15 minutes)
- Password reset requests (unusual patterns)
- API rate limit hits
- Database connection errors
- Unauthorized access attempts

### Implementation:
Already implemented via:
- Rate limiting (Express rate-limit)
- Error tracking (Sentry)
- Health checks (UptimeRobot)

### Additional Security Alerts:
Add custom Sentry alerts for:
- `RATE_LIMIT_EXCEEDED` errors
- `Invalid credentials` (>10/hour)
- Database connection failures

---

## 7. Incident Response Checklist

When an alert fires:

1. **Check Sentry:** View error details, stack trace, user impact
2. **Check UptimeRobot:** Verify which service is down
3. **Check Render Logs:** Look for deployment issues or crashes
4. **Check Database:** Verify connection and query performance
5. **Rollback if needed:** Revert to last known good deployment
6. **Notify stakeholders:** Use status page or direct communication

---

## 8. Monthly Monitoring Review

Schedule a monthly review to:
- Analyze error trends
- Review uptime statistics
- Optimize slow queries
- Update alert thresholds
- Review security incidents

---

## Quick Start Checklist

- [ ] Sign up for Sentry
- [ ] Add SENTRY_DSN to Render environment variables
- [ ] Uncomment Sentry code in monitoring.ts
- [ ] Deploy to Render
- [ ] Sign up for UptimeRobot
- [ ] Add 3 monitors (API, Customer Site, Admin Panel)
- [ ] Configure email alerts
- [ ] Test alerts by intentionally breaking a service
- [ ] Set up Render database alerts
- [ ] Document incident response process

---

## Cost Summary

| Service | Free Tier | Paid Tier (if needed) |
|---------|-----------|----------------------|
| **Sentry** | 5,000 errors/month | $26/month (50k errors) |
| **UptimeRobot** | 50 monitors, 5-min intervals | $7/month (1-min intervals) |
| **Logtail** | 1GB/month | $10/month (5GB) |
| **Total** | **$0/month** | ~$43/month (if scaling) |

**Recommendation:** Start with free tiers. Upgrade only when limits are reached.

---

## Support

For issues with monitoring setup, contact:
- Sentry: https://sentry.io/support
- UptimeRobot: https://uptimerobot.com/contact
- Render: https://render.com/docs
