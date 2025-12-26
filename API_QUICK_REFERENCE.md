# Beat Store - New API Endpoints (Phase 3)

## Payment Endpoints

### Initialize Payment
```
POST /api/payment/initialize
Body: {
  method: "stripe" | "paystack",
  amount: number,
  currency: "usd" | "ngn",
  email: string,
  beatIds?: string[],
  licenseIds?: string[],
  orderId?: string
}

Response (Stripe):
{
  provider: "stripe",
  clientSecret: "pi_xxx_secret",
  paymentIntentId: "pi_xxx",
  status: "requires_payment_method"
}

Response (Paystack):
{
  provider: "paystack",
  authorizationUrl: "https://checkout.paystack.com/...",
  accessCode: "xxx",
  reference: "ref_xxx"
}
```

### Verify Stripe Payment
```
POST /api/payment/stripe/verify
Body: { paymentIntentId: string }

Response: {
  id: "pi_xxx",
  status: "succeeded" | "processing" | "requires_payment_method",
  amount: 2900,
  currency: "usd",
  clientSecret: "pi_xxx_secret"
}
```

### Verify Paystack Payment
```
POST /api/payment/paystack/verify
Body: { reference: string }

Response: {
  reference: "ref_xxx",
  status: "success",
  amount: 290000,
  currency: "NGN",
  customer: { email: "..." },
  authorization: { ... }
}
```

---

## File Management Endpoints

### Download Beat File (Secure)
```
GET /api/download/file/[token]

Query/Path: token (64-character secure token)

Response: Binary file with headers
Content-Type: audio/wav | audio/mpeg | application/zip
Content-Disposition: attachment; filename="beat.wav"

Error: 404 if token expired or not found
Error: 401 if token is invalid
```

---

## Admin Analytics Endpoints

### Get Advanced Analytics
```
GET /api/admin/analytics?timeframe=30&metric=all

Query Parameters:
- timeframe: 7, 30, 60, 90 (days)
- metric: "all" | "revenue" | "sales" | "conversion" | "traffic" | 
          "customers" | "inventory" | "performance"

Response: {
  revenue: {
    total: 12450.50,
    trend: "+12.5%",
    daily: 415.02,
    chart: [{ date, revenue }],
    topProducts: [{ id, title, revenue, sales }]
  },
  sales: {
    total: 256,
    byLicenseType: { ... },
    byGenre: { ... }
  },
  conversion: {
    rate: 3.2,
    trend: "+14.3%",
    conversionFunnel: [{ stage, count, percentage }]
  },
  traffic: {
    total: 8000,
    sources: { organic, direct, referral, paid },
    devices: { desktop, mobile, tablet },
    topReferrers: [{ source, visits }]
  },
  customers: {
    total: 1234,
    new: 156,
    churnRate: 2.1,
    topCountries: [{ country, count, revenue }]
  },
  inventory: {
    totalBeats: 456,
    byGenre: { ... }
  },
  performance: {
    avgLoadTime: "1.2s",
    topPages: [{ path, views, avgTime }]
  }
}
```

### Custom Analytics Query
```
POST /api/admin/analytics
Body: {
  query: string,
  filters: { ... }
}

Response: {
  query: string,
  filters: object,
  results: array
}
```

---

## Customer Management Endpoints

### List Customers
```
GET /api/admin/customers?page=1&limit=20&search=&sort=newest&filter=all

Query Parameters:
- page: 1-based page number
- limit: Results per page (default: 20)
- search: Search by email/name/country
- sort: "newest" | "email" | "purchases" | "revenue"
- filter: "all" | "active" | "inactive" | "vip"

Response: {
  customers: [{
    id: string,
    email: string,
    fullName: string,
    country: string,
    totalPurchases: number,
    totalSpent: number,
    lastPurchase: date,
    joinDate: date,
    status: "active" | "inactive" | "vip"
  }],
  total: number,
  page: number,
  totalPages: number,
  summary: {
    totalCustomers: number,
    activeCustomers: number,
    vipCustomers: number,
    totalRevenue: number,
    avgCustomerValue: string
  }
}
```

### Update Customer
```
PUT /api/admin/customers
Body: {
  customerId: string,
  updates: {
    status?: string,
    tags?: string[],
    notes?: string
  }
}

Response: {
  message: "Customer updated successfully",
  customerId: string,
  updates: object
}
```

---

## Beat Performance Endpoints

### Get Beat Performance Analytics
```
GET /api/admin/beats/[beatId]/performance?period=30

Query Parameters:
- period: 7, 30, 60, 90 (days)

Response: {
  beatId: string,
  period: number,
  summary: {
    totalPlays: number,
    totalDownloads: number,
    totalRevenue: number,
    averageRating: number,
    favoriteCount: number
  },
  trends: {
    plays: {
      thisMonth: number,
      lastMonth: number,
      trend: "+32.8%",
      chart: [{ date, value }]
    },
    downloads: { ... },
    revenue: {
      thisMonth: number,
      byLicense: { basic_lease, premium_lease, unlimited_lease, exclusive },
      chart: [{ date, value }]
    }
  },
  topCountries: [{
    country: string,
    plays: number,
    downloads: number,
    revenue: number
  }],
  reviews: {
    total: number,
    averageRating: number,
    distribution: { 5, 4, 3, 2, 1 },
    recentReviews: [{ id, userName, rating, comment, date }]
  },
  demographics: {
    topGenres: string[],
    topMoods: string[],
    topInstruments: string[]
  }
}
```

---

## Email Endpoints (Internal - Not HTTP)

### Available Email Functions (src/lib/sendgrid.ts)
```typescript
// Order confirmation with itemized breakdown
sendOrderConfirmation(email, orderNumber, total, items)

// Secure download link with expiration
sendDownloadLink(email, beatTitle, downloadUrl, expiresIn)

// New user welcome
sendWelcomeEmail(email, fullName)

// Password reset with secure token
sendPasswordReset(email, resetToken, expiresIn)

// Generic email sender
sendEmail({ to, subject, html, from, replyTo, cc, bcc })
```

---

## File Management Functions (Internal - Not HTTP)

### Available File Functions (src/lib/fileManager.ts)
```typescript
// Save beat file with security validation
saveBeatFile(buffer, fileName, beatId, fileType)

// Get beat file from storage
getBeatFile(filePath)

// Delete single file
deleteBeatFile(filePath)

// Delete entire beat directory
deleteBeatDirectory(beatId)

// List all files for beat
listBeatFiles(beatId)

// Generate secure download token
generateSecureToken() → string

// Validate file type
isValidFileType(fileType) → boolean

// Get file extension for type
getFileExtension(fileType) → string
```

---

## Environment Variables Required

```bash
# Database
DATABASE_URL=postgresql://...

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Paystack
PAYSTACK_SECRET_KEY=sk_test_...
PAYSTACK_PUBLIC_KEY=pk_test_...

# SendGrid
SENDGRID_API_KEY=SG.xxx
SENDGRID_FROM_EMAIL=noreply@davidjayy.com

# JWT
JWT_SECRET=your_secret

# Files
FILE_STORAGE_PATH=./public/beats
MAX_FILE_SIZE=314572800

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## Common Response Codes

```
200 OK               - Successful GET/POST/PUT/DELETE
201 Created          - Resource created successfully
400 Bad Request      - Missing/invalid parameters
401 Unauthorized     - Authentication required/failed
403 Forbidden        - Permission denied
404 Not Found        - Resource not found
429 Too Many Requests - Rate limit exceeded
500 Server Error     - Unexpected error
```

---

## Error Response Format

```json
{
  "success": false,
  "error": "Descriptive error message"
}
```

---

**Last Updated:** December 23, 2025
**Version:** Phase 3 - Production Ready
