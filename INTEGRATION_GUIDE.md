# David Jayy Beats - Integration Checklist & Setup Guide

## 🔧 Pre-Deployment Setup

### 1. Database Setup
```bash
# Install PostgreSQL (or use managed service like Railway, Supabase)
# Create database named 'beat_store'

# Set DATABASE_URL in .env.local
DATABASE_URL="postgresql://username:password@localhost:5432/beat_store"

# Run migrations
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate
```

### 2. Payment Gateway Configuration

#### Stripe Setup
```bash
# 1. Create Stripe account at stripe.com
# 2. Get test keys from Dashboard → Developers → API Keys
# 3. Add to .env.local:
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx

# 4. Set webhook endpoint in Stripe Dashboard:
#    URL: https://yourdomain.com/api/webhooks/stripe
#    Events: payment_intent.succeeded, payment_intent.payment_failed

# 5. Copy webhook secret (Signing secret):
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

#### Paystack Setup
```bash
# 1. Create Paystack account at paystack.com
# 2. Get keys from Settings → API Keys & Webhooks
# 3. Add to .env.local:
PAYSTACK_SECRET_KEY=sk_live_xxxxxxxx or sk_test_xxxxxxxx
PAYSTACK_PUBLIC_KEY=pk_live_xxxxxxxx or pk_test_xxxxxxxx

# 4. Set webhook URL in Paystack Dashboard:
#    URL: https://yourdomain.com/api/webhooks/paystack
#    Events: charge.success, charge.failed
```

### 3. Email Service Configuration

#### SendGrid Setup
```bash
# 1. Create SendGrid account at sendgrid.com
# 2. Create API key in Settings → API Keys
# 3. Add to .env.local:
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@yourdomain.com

# 4. Verify sender email (Sender Authentication)
# 5. Optional: Set up Domain Authentication for better deliverability
```

### 4. File Storage Setup

#### Local File Storage (Development)
```bash
# Already configured at ./public/beats
# Ensure directory exists and is writable
mkdir -p public/beats
chmod 755 public/beats

# Configure in .env.local:
FILE_STORAGE_PATH=./public/beats
MAX_FILE_SIZE=314572800  # 300MB
```

#### AWS S3 Integration (Production)
```bash
# 1. Create S3 bucket: beat-store-files
# 2. Set bucket policy to private by default
# 3. Create IAM user with S3 access
# 4. Get access keys from IAM
# 5. Add to .env.local:
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_S3_BUCKET=beat-store-files
AWS_S3_REGION=us-east-1

# 6. Install AWS SDK:
npm install @aws-sdk/client-s3

# 7. Update fileManager.ts to use S3
```

---

## 🔌 API Integration Guide

### Payment Integration

#### Frontend - Initialize Payment
```typescript
// In checkout flow
async function initiatePayment(method: 'stripe' | 'paystack') {
  const response = await fetch('/api/payment/initialize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      method,
      amount: cartTotal,
      currency: 'usd',
      email: customer.email,
      beatIds: cart.items.map(i => i.beatId),
      licenseIds: cart.items.map(i => i.licenseId),
      orderId: order.id,
    }),
  });

  const data = await response.json();

  if (method === 'stripe') {
    // Use Stripe.js with clientSecret
    const stripe = await loadStripe(STRIPE_PUB_KEY);
    return stripe.confirmCardPayment(data.clientSecret);
  } else if (method === 'paystack') {
    // Redirect to authorizationUrl
    window.location.href = data.authorizationUrl;
  }
}
```

#### Backend - Webhook Handlers (Create these files)
```typescript
// POST /api/webhooks/stripe
// POST /api/webhooks/paystack

// On successful payment:
// 1. Update Order.paymentStatus to COMPLETED
// 2. Update Order.status to CONFIRMED
// 3. Create Download records for each OrderItem
// 4. Call sendOrderConfirmation()
// 5. Call sendDownloadLink()
```

### Email Integration

#### Usage Example
```typescript
import { sendOrderConfirmation, sendDownloadLink } from '@/lib/sendgrid';

// After payment success
await sendOrderConfirmation(
  customer.email,
  order.orderNumber,
  order.totalAmount,
  order.items.map(item => ({
    title: item.beat.title,
    license: item.license.licenseType,
    price: item.price,
  }))
);

// When download is requested
await sendDownloadLink(
  customer.email,
  beat.title,
  downloadUrl,
  '48 hours'
);
```

### File Management Integration

#### Upload Beat (Create endpoint)
```typescript
// POST /api/beats/upload
import { saveBeatFile } from '@/lib/fileManager';

const buffer = await file.arrayBuffer();
const saved = await saveBeatFile(
  Buffer.from(buffer),
  file.name,
  beatId,
  'mp3' // or 'wav', 'midi', 'stems'
);
// saved.filePath is now stored in database
```

#### Generate Download Link
```typescript
import { generateSecureToken } from '@/lib/fileManager';

const token = generateSecureToken();
const download = await prisma.download.create({
  data: {
    userId: user.id,
    beatId: beat.id,
    token,
    fileType: 'wav',
    filePath: beat.wavFilePath,
    expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000),
  },
});

const downloadUrl = `/api/download/file/${token}`;
```

---

## 📊 Analytics & Admin Features

### Enable Analytics Collection
```typescript
// Create an Analytics event logger
// Increment counters after each action:

// In GET /beats (when user views beat)
await prisma.analytics.update({
  where: { date: today },
  data: { beatsViewed: { increment: 1 } },
});

// In POST /orders (when order created)
const totalRevenue = order.totalAmount;
await prisma.analytics.upsert({
  where: { date: today },
  create: {
    date: today,
    totalRevenue,
    totalSales: 1,
    averageOrderValue: totalRevenue,
    newUsers: 0,
    activeUsers: 0,
    beatsViewed: 0,
    beatsFavorited: 0,
    previewsPlayed: 0,
  },
  update: {
    totalRevenue: { increment: totalRevenue },
    totalSales: { increment: 1 },
  },
});
```

### Access Analytics Endpoints
```bash
# Overall analytics
GET /api/admin/analytics?timeframe=30&metric=all

# Specific metrics
GET /api/admin/analytics?metric=revenue
GET /api/admin/analytics?metric=sales
GET /api/admin/analytics?metric=conversion

# Customer management
GET /api/admin/customers?page=1&limit=20&sort=revenue
PUT /api/admin/customers?customerId=xxx

# Beat performance
GET /api/admin/beats/beat-123/performance?period=30
```

---

## 🧪 Testing Checklist

### Payment Testing
- [ ] Stripe test card: 4242 4242 4242 4242
- [ ] Paystack test: Use sandbox keys
- [ ] Test successful payment flow
- [ ] Test failed payment handling
- [ ] Test webhook signature verification
- [ ] Test refund processing

### Email Testing
- [ ] Order confirmation email format
- [ ] Download link validity
- [ ] Email delivery (check SendGrid logs)
- [ ] Template rendering
- [ ] Custom metadata in emails

### File Management Testing
- [ ] Upload beat file (MP3)
- [ ] Upload preview (30-second clip)
- [ ] Generate download token
- [ ] Verify token expiry
- [ ] Test download with token
- [ ] Test path traversal protection

### Analytics Testing
- [ ] Verify metrics are incrementing
- [ ] Check chart data generation
- [ ] Test date filtering
- [ ] Test aggregation queries
- [ ] Verify performance metrics

---

## 🚀 Deployment Steps

### 1. Prepare Environment
```bash
# Update .env.local with production values
# Test all environment variables
npx dotenv-cli echo STRIPE_SECRET_KEY

# Generate Prisma Client for production
npx prisma generate

# Run database migrations
npx prisma migrate deploy
```

### 2. Deploy to Vercel (Recommended for Next.js)
```bash
# Connect repository
# Set environment variables in Vercel dashboard
# Production database URL
# Production payment keys
# Production API keys

# Deploy
git push  # Triggers automatic deployment
```

### 3. Configure Webhooks
```bash
# Update webhook URLs in payment dashboards:
# Stripe: https://yourdomain.com/api/webhooks/stripe
# Paystack: https://yourdomain.com/api/webhooks/paystack

# Copy webhook secrets to environment
```

### 4. Test Production
```bash
# Use production payment keys (not test keys)
# Process test order with real payment flow
# Verify email delivery
# Check file download works
# Monitor analytics
```

---

## 📝 Configuration Reference

### Database Tables
- `User` - 8 fields + timestamps
- `Beat` - 15 fields + arrays + timestamps
- `License` - 7 fields + timestamps
- `Order` - 14 fields + timestamps
- `OrderItem` - 5 fields + index
- `Download` - 8 fields + index
- `Review` - 5 fields + unique constraint
- `Favorite` - 3 fields + unique constraint
- `Coupon` - 9 fields + timestamps
- `EmailLog` - 8 fields
- `Analytics` - 10 fields + index

### Environment Variables
```
DATABASE_URL              # PostgreSQL connection
STRIPE_SECRET_KEY        # Stripe API key
STRIPE_PUBLISHABLE_KEY   # Stripe frontend key
STRIPE_WEBHOOK_SECRET    # Stripe webhook signing
PAYSTACK_SECRET_KEY      # Paystack secret
PAYSTACK_PUBLIC_KEY      # Paystack public
SENDGRID_API_KEY         # SendGrid API key
SENDGRID_FROM_EMAIL      # Default from address
JWT_SECRET               # JWT signing key
FILE_STORAGE_PATH        # Local file storage
MAX_FILE_SIZE            # Max upload size (bytes)
NEXT_PUBLIC_BASE_URL     # App base URL
AWS_ACCESS_KEY_ID        # AWS credentials (S3)
AWS_SECRET_ACCESS_KEY    # AWS credentials (S3)
```

---

## 📞 Support & Documentation

### Stripe
- Dashboard: https://dashboard.stripe.com
- API Docs: https://stripe.com/docs/api
- Testing: https://stripe.com/docs/testing

### Paystack
- Dashboard: https://dashboard.paystack.co
- API Docs: https://paystack.com/docs/api
- Testing: Use sandbox mode

### SendGrid
- Dashboard: https://app.sendgrid.com
- API Docs: https://docs.sendgrid.com
- Template Editor: Built-in

### Prisma
- Docs: https://www.prisma.io/docs
- Reference: https://www.prisma.io/docs/reference/api-reference

---

**Last Updated:** December 23, 2025
**Status:** Ready for Production Integration
**Next:** Webhook handlers and UI updates
