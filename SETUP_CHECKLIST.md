# 🎵 Beat Store - Backend Setup Checklist

## Phase 1: Prerequisites ✓

- [x] Node.js 18+ installed
- [x] npm installed
- [x] All code files created (17 files)
- [x] Database schema designed
- [x] .env.local template created
- [x] dotenv package installed

## Phase 2: Database Setup (5-15 min)

Choose ONE option below:

### Option A: Supabase (Recommended - 5 min) ⭐
```bash
# 1. Go to https://supabase.com
# 2. Sign up with GitHub
# 3. Create new project
# 4. Go to Settings → Database → URI
# 5. Copy connection string
```

**In .env.local:**
```
DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"
```

**Then test:**
```bash
npx prisma db push --skip-generate
npx prisma studio
```

- [ ] Created Supabase project
- [ ] Got DATABASE_URL
- [ ] Updated .env.local
- [ ] Tested connection (`npx prisma studio`)

---

### Option B: Railway (5 min)
```bash
# 1. Go to https://railway.app
# 2. Sign up with GitHub
# 3. Create new PostgreSQL plugin
# 4. Go to Connect → Copy connection string
```

**In .env.local:**
```
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

**Then test:**
```bash
npx prisma db push --skip-generate
npx prisma studio
```

- [ ] Created Railway project
- [ ] Got DATABASE_URL
- [ ] Updated .env.local
- [ ] Tested connection

---

### Option C: Vercel Postgres (Free)
```bash
# 1. Go to https://vercel.com/postgres
# 2. Create new database
# 3. Copy .env.local content
# 4. Paste into your .env.local
```

**Then test:**
```bash
npx prisma db push --skip-generate
npx prisma studio
```

- [ ] Created Vercel Postgres database
- [ ] Got DATABASE_URL
- [ ] Updated .env.local
- [ ] Tested connection

---

### Option D: Local PostgreSQL (Advanced - 30 min)
```bash
# Windows: Download from https://www.postgresql.org/download/windows/
# Or use: choco install postgresql
# Then:
createdb beat_store
```

**In .env.local:**
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/beat_store"
```

**Then test:**
```bash
npx prisma db push --skip-generate
npx prisma studio
```

- [ ] Installed PostgreSQL
- [ ] Created database
- [ ] Got DATABASE_URL
- [ ] Updated .env.local
- [ ] Tested connection

---

## Phase 3: API Keys Setup (15-20 min)

### Stripe (5 min)
```bash
# 1. Go to https://dashboard.stripe.com/register
# 2. Sign up or log in
# 3. Click "Developers" → "API Keys"
# 4. Copy Secret Key (sk_test_...)
# 5. Copy Publishable Key (pk_test_...)
# 6. Create a Webhook Endpoint:
#    - Developers → Webhooks → Add Endpoint
#    - URL: https://yourdomain.com/api/payment/stripe/webhook
#    - Events: payment_intent.succeeded, payment_intent.payment_failed
#    - Copy webhook secret (whsec_...)
```

**In .env.local:**
```
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

**Test keys:**
- Secret starts with: `sk_test_` (dev) or `sk_live_` (prod)
- Publishable starts with: `pk_test_` (dev) or `pk_live_` (prod)
- Webhook starts with: `whsec_`

- [ ] Created Stripe account
- [ ] Got Secret Key (sk_test_...)
- [ ] Got Publishable Key (pk_test_...)
- [ ] Created webhook endpoint
- [ ] Got Webhook Secret (whsec_...)
- [ ] Updated .env.local

---

### Paystack (5 min)
```bash
# 1. Go to https://dashboard.paystack.co/signup
# 2. Sign up with email
# 3. Verify email
# 4. Go to Settings → API Keys
# 5. Copy Secret Key (sk_test_...)
# 6. Copy Public Key (pk_test_...)
```

**In .env.local:**
```
PAYSTACK_SECRET_KEY="sk_test_..."
PAYSTACK_PUBLIC_KEY="pk_test_..."
```

**Test keys:**
- Secret starts with: `sk_test_` (dev) or `sk_live_` (prod)
- Public starts with: `pk_test_` (dev) or `pk_live_` (prod)

- [ ] Created Paystack account
- [ ] Got Secret Key (sk_test_...)
- [ ] Got Public Key (pk_test_...)
- [ ] Updated .env.local

---

### SendGrid (5 min)
```bash
# 1. Go to https://app.sendgrid.com
# 2. Sign up or log in
# 3. Go to Settings → API Keys
# 4. Click "Create API Key"
# 5. Name it "Beat Store"
# 6. Copy the key (SG....)
# 7. Go to Settings → Sender Authentication
# 8. Verify your sender email
```

**In .env.local:**
```
SENDGRID_API_KEY="SG...."
SENDGRID_FROM_EMAIL="noreply@yourdomain.com"
```

**Test key:**
- Starts with: `SG.`

- [ ] Created SendGrid account
- [ ] Got API Key (SG....)
- [ ] Verified sender email
- [ ] Updated .env.local

---

## Phase 4: Environment Configuration

**Complete .env.local file:**

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Paystack
PAYSTACK_SECRET_KEY="sk_test_..."
PAYSTACK_PUBLIC_KEY="pk_test_..."

# SendGrid
SENDGRID_API_KEY="SG...."
SENDGRID_FROM_EMAIL="noreply@yourdomain.com"

# JWT
JWT_SECRET="your-secret-key-at-least-32-characters-long"

# File Storage
FILE_STORAGE_PATH="./public/uploads"
MAX_FILE_SIZE=314572800  # 300MB

# Base URL
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

- [ ] DATABASE_URL added
- [ ] STRIPE_* keys added
- [ ] PAYSTACK_* keys added
- [ ] SENDGRID_* keys added
- [ ] JWT_SECRET added
- [ ] FILE_STORAGE_PATH set
- [ ] NEXT_PUBLIC_BASE_URL set

---

## Phase 5: Database Initialization

```bash
# 1. Generate Prisma Client
npx prisma generate

# 2. Create database tables
npx prisma migrate dev --name init

# 3. Open Prisma Studio (verify tables exist)
npx prisma studio

# 4. (Optional) Seed test data
npx prisma db seed
```

- [ ] Generated Prisma Client
- [ ] Ran migrations
- [ ] Verified tables in Prisma Studio
- [ ] (Optional) Seeded test data

---

## Phase 6: Verification

### Test Database Connection
```bash
npx prisma studio
# Should open http://localhost:5555
# You should see all 11 tables:
# ✓ User
# ✓ Beat
# ✓ License
# ✓ Order
# ✓ OrderItem
# ✓ Download
# ✓ Review
# ✓ Favorite
# ✓ Coupon
# ✓ EmailLog
# ✓ Analytics
```

- [ ] Prisma Studio opened
- [ ] All 11 tables visible

### Start Development Server
```bash
npm run dev
```

**Should see:**
```
> next-js-app@0.1.0 dev
> next dev

  ▲ Next.js 16.1.1
  - ready started server on 0.0.0.0:3000, url: http://localhost:3000
  ✓ Ready in 2.4s
```

- [ ] Server started successfully
- [ ] No errors in console

### Test API Endpoints
```bash
# Test health check
curl http://localhost:3000/api/search?q=test

# Test authentication
curl http://localhost:3000/api/auth/me

# Test beats
curl http://localhost:3000/api/beats
```

- [ ] Search API responds
- [ ] Auth API responds
- [ ] Beats API responds

---

## Phase 7: Payment Testing

### Stripe Test Flow
```bash
# Test card: 4242 4242 4242 4242
# Expiry: Any future date (e.g., 12/25)
# CVC: Any 3 digits (e.g., 123)
# ZIP: Any 5 digits (e.g., 12345)

# This will create a successful PaymentIntent
```

- [ ] Stripe test card processed
- [ ] Payment intent created
- [ ] Verification endpoint works

### Paystack Test Flow
```bash
# Test authorization: 408444
# Expiry: Any future date
# PIN: Any 4 digits

# Paystack will show payment screen
```

- [ ] Paystack test auth processed
- [ ] Transaction reference generated
- [ ] Verification endpoint works

---

## Phase 8: Email Testing

### SendGrid Test
```bash
# Check SendGrid dashboard for sent emails
# Go to https://app.sendgrid.com/statistics

# Verify these templates rendered:
# ✓ Order confirmation (itemized with total)
# ✓ Download link (48-hour expiry)
# ✓ Welcome email (purple/pink branding)
# ✓ Password reset (secure link)
```

- [ ] SendGrid dashboard shows sent emails
- [ ] All templates rendered correctly
- [ ] Branding matches (purple/pink)

---

## Phase 9: File Upload/Download Testing

```bash
# 1. Try uploading a beat file
# 2. Verify it's in ./public/uploads
# 3. Get download token
# 4. Test download with token
# 5. Verify token expires after 48 hours

# Path traversal protection:
# Uploading "../../../etc/passwd" should fail
```

- [ ] File uploaded successfully
- [ ] File stored securely
- [ ] Download token generated
- [ ] Download works with token
- [ ] Path traversal blocked

---

## Phase 10: Admin Features Testing

### Analytics
```bash
curl http://localhost:3000/api/admin/analytics

# Should return:
# - Total revenue
# - Total sales
# - Conversion rate
# - Traffic metrics
# - Customer metrics
# - Inventory metrics
```

- [ ] Analytics endpoint responds
- [ ] All metrics calculated
- [ ] Data format correct

### Customer Management
```bash
curl http://localhost:3000/api/admin/customers

# Should return:
# - Customer list
# - Total customers
# - Search functionality
# - Sort/filter functionality
```

- [ ] Customers endpoint responds
- [ ] List format correct
- [ ] Search works

### Beat Performance
```bash
curl http://localhost:3000/api/admin/beats/1/performance

# Should return:
# - Play count
# - Download count
# - Revenue
# - Geographic data
# - Reviews
```

- [ ] Performance endpoint responds
- [ ] Metrics calculated
- [ ] Data format correct

---

## Troubleshooting

### Database Connection Failed
```bash
# 1. Check DATABASE_URL format
# 2. Verify host/port are correct
# 3. Verify credentials are correct
# 4. Verify IP whitelist (Supabase/Railway)
# 5. Try: npx prisma studio
```

### Stripe Keys Not Working
```bash
# 1. Check keys start with correct prefixes:
#    - sk_test_ or sk_live_
#    - pk_test_ or pk_live_
# 2. Verify keys are not reversed
# 3. Check for extra spaces/characters
# 4. Regenerate keys if needed
```

### SendGrid Emails Not Sending
```bash
# 1. Verify API key is correct (SG....)
# 2. Verify sender email is verified
# 3. Check SendGrid dashboard for errors
# 4. Verify SENDGRID_FROM_EMAIL matches verified sender
```

### Paystack Transaction Fails
```bash
# 1. Check PUBLIC_KEY is public (pk_test_)
# 2. Check SECRET_KEY is secret (sk_test_)
# 3. Verify keys are not reversed
# 4. Use Paystack test authorization: 408444
```

### File Upload Permission Denied
```bash
# 1. Check ./public/uploads directory exists
# 2. Verify write permissions: chmod 755 public/uploads
# 3. Check FILE_STORAGE_PATH is correct
# 4. Verify MAX_FILE_SIZE is reasonable (300MB default)
```

---

## Quick Commands Reference

```bash
# Development
npm run dev                          # Start development server
npm run build                        # Build for production
npm start                            # Start production server

# Database
npx prisma studio                    # Open Prisma Studio
npx prisma migrate dev --name init   # Create migrations
npx prisma db push                   # Push schema changes
npx prisma generate                  # Generate Prisma Client
npx prisma db seed                   # Seed test data

# Testing
npm run test                         # Run tests (if configured)
npm run lint                         # Run ESLint

# Deployment
npm run build                        # Build for production
export NODE_ENV=production           # Set environment
npm start                            # Start server
```

---

## Setup Automation Scripts

### Windows (PowerShell)
```bash
./setup.ps1
```

### macOS/Linux (Bash)
```bash
chmod +x setup.sh
./setup.sh
```

---

## Final Status Check

```bash
# All items should be ✓

✓ Node.js installed
✓ Database connected
✓ Prisma tables created
✓ Stripe keys valid
✓ Paystack keys valid
✓ SendGrid key valid
✓ Development server running
✓ API endpoints responding
✓ Authentication working
✓ Payments can be processed
✓ Emails can be sent
✓ Files can be uploaded/downloaded
✓ Admin features accessible
```

---

## Estimated Timeline

| Phase | Task | Time |
|-------|------|------|
| 1 | Prerequisites | ✓ |
| 2 | Database Setup | 5-15 min |
| 3 | API Keys Setup | 15-20 min |
| 4 | Environment Config | 5 min |
| 5 | Database Init | 3-5 min |
| 6 | Verification | 10 min |
| 7 | Payment Testing | 10 min |
| 8 | Email Testing | 5 min |
| 9 | File Testing | 10 min |
| 10 | Admin Testing | 10 min |
| **TOTAL** | | **90-120 min** |

---

## Success Criteria

✅ Backend is fully configured when:
1. `npm run dev` runs without errors
2. `npx prisma studio` connects to database
3. All API endpoints respond
4. Payment endpoints work with test keys
5. Emails send through SendGrid
6. File upload/download works
7. Admin analytics available
8. No console errors

---

**👉 Start with Phase 2: Choose your database provider!**

Need help? Check:
- [DATABASE_SETUP.md](DATABASE_SETUP.md) - Detailed database guides
- [API_KEYS_SETUP.md](API_KEYS_SETUP.md) - API key retrieval
- [API_DOCS.md](API_DOCS.md) - Full API reference
