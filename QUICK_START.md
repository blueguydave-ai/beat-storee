# 🚀 Quick Start - 30 Minutes to Running Backend

## TL;DR Setup Path

```
1. Pick database (5 min)
2. Get API keys (15 min - do in parallel)
3. Update .env.local (5 min)
4. Test (5 min)
```

---

## Step 1: Choose & Setup Database (5 min)

### ⭐ RECOMMENDED: Supabase

1. Go to https://supabase.com/
2. Click **"Sign Up"** → Sign in with GitHub
3. Create new project
4. Wait for setup (~30 seconds)
5. Click **"Settings"** (bottom left)
6. Click **"Database"**
7. Find **"Connection pooling"** section
8. Copy the **"Connection string"** (the long PostgreSQL URL)
9. Note: Replace `[YOUR-PASSWORD]` with your actual password (check email)

**Paste into `.env.local`:**
```env
DATABASE_URL="postgresql://[user]:[password]@[host]:5432/[database]?sslmode=require"
```

✅ Done! Supabase selected.

---

### Or: Railway (5 min)

1. Go to https://railway.app/
2. Click **"Deploy Now"** → Sign in with GitHub
3. Create new PostgreSQL plugin
4. Click **"PostgreSQL"**
5. Click **"Connect"** tab
6. Copy connection string under **"Postgres URI"**

**Paste into `.env.local`:**
```env
DATABASE_URL="postgresql://[user]:[password]@[host]:5432/[database]"
```

✅ Done! Railway selected.

---

### Or: Vercel Postgres (Free - 5 min)

1. Go to https://vercel.com/postgres
2. Click **"Create Database"**
3. Name it: `beat-store-db`
4. Click **"Create"**
5. Go to **".env.local"** tab
6. Copy the entire code block

**Paste into `.env.local`:**
```env
# Already includes DATABASE_URL
```

✅ Done! Vercel Postgres selected.

---

## Step 2: Get API Keys (15 min - Do All 3 in Parallel)

### Stripe Key (5 min)

1. Go to https://dashboard.stripe.com/register
2. Sign up
3. Click **"Developers"** → **"API Keys"**
4. Under **"Secret key"**, click **"Reveal"**
5. Copy it (starts with `sk_test_`)

**Paste into `.env.local`:**
```env
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

✅ Done! Stripe keys added.

---

### Paystack Key (5 min)

1. Go to https://dashboard.paystack.co/signup
2. Sign up with email
3. Verify email
4. Go to **"Settings"** → **"API Keys"**
5. Copy both keys under **"Test"** section

**Paste into `.env.local`:**
```env
PAYSTACK_SECRET_KEY="sk_test_..."
PAYSTACK_PUBLIC_KEY="pk_test_..."
```

✅ Done! Paystack keys added.

---

### SendGrid Key (5 min)

1. Go to https://app.sendgrid.com
2. Sign up
3. Verify email
4. Go to **"Settings"** → **"API Keys"**
5. Click **"Create API Key"**
6. Name: `Beat Store`
7. Copy the key (starts with `SG.`)

**Also:** Go to **"Settings"** → **"Sender Authentication"**
- Click **"Verify a Domain"** or **"Single Sender"**
- Add your email (or just use a placeholder for now)

**Paste into `.env.local`:**
```env
SENDGRID_API_KEY="SG...."
SENDGRID_FROM_EMAIL="noreply@example.com"
```

✅ Done! SendGrid key added.

---

## Step 3: Update `.env.local` (5 min)

Open `.env.local` and fill in:

```env
# Database (from Step 1)
DATABASE_URL="postgresql://user:password@host:5432/db?sslmode=require"

# Stripe (from Step 2)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..." # Leave blank for now

# Paystack (from Step 2)
PAYSTACK_SECRET_KEY="sk_test_..."
PAYSTACK_PUBLIC_KEY="pk_test_..."

# SendGrid (from Step 2)
SENDGRID_API_KEY="SG...."
SENDGRID_FROM_EMAIL="noreply@example.com"

# JWT (just make up something long)
JWT_SECRET="your-secret-key-at-least-32-characters-long-make-it-random"

# File Storage
FILE_STORAGE_PATH="./public/uploads"
MAX_FILE_SIZE=314572800

# Base URL
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

✅ Done! All keys configured.

---

## Step 4: Test Everything (5 min)

### 4.1: Generate Prisma Client
```bash
npx prisma generate
```

**Expected output:**
```
✓ Generated Prisma Client
```

### 4.2: Create Database Tables
```bash
npx prisma db push --skip-generate
```

**Expected output:**
```
✓ Database synced
```

### 4.3: Verify Connection
```bash
npx prisma studio
```

**Should open:** `http://localhost:5555`
**You should see:** All 11 tables (User, Beat, License, Order, etc.)

### 4.4: Start Development Server
```bash
npm run dev
```

**Expected output:**
```
  ▲ Next.js 16.1.1
  - ready started server on 0.0.0.0:3000, url: http://localhost:3000
```

### 4.5: Test API
```bash
curl http://localhost:3000/api/beats
```

**Expected:** Returns JSON array of beats (currently empty, that's okay)

---

## ✅ Done! Backend is Running

| Component | Status |
|-----------|--------|
| Database | ✅ Connected |
| API Server | ✅ Running (localhost:3000) |
| Prisma | ✅ Schema synced |
| Stripe | ✅ Keys configured |
| Paystack | ✅ Keys configured |
| SendGrid | ✅ Keys configured |
| Authentication | ✅ Ready |
| File Storage | ✅ Ready |
| Admin Analytics | ✅ Ready |

---

## Next: Test Payments

### Test Stripe Payment
```bash
# Visit frontend: http://localhost:3000/checkout

# Use test card:
Card Number: 4242 4242 4242 4242
Expiry: 12/25
CVC: 123

# Should process successfully
```

### Test Paystack Payment
```bash
# Use test authorization:
Authorization: 408444

# Paystack will show payment page
```

---

## Troubleshooting

### ❌ "DATABASE_URL is invalid"
→ Check the URL format in `.env.local`
→ Verify password doesn't have special characters (@ # $ %)
→ If special chars needed, URL-encode them

### ❌ "Stripe key error"
→ Key should start with `sk_test_` (not `sk_live_`)
→ Don't include quotes in actual key
→ Check for extra spaces

### ❌ "SendGrid key error"
→ Key should start with `SG.`
→ Not a personal key, must be API key
→ Check for extra spaces

### ❌ "Connection timeout"
→ Check database host is correct
→ Verify IP whitelist (if applicable)
→ Try pinging the host from command line
→ Restart dev server: `npm run dev`

### ❌ "Migration failed"
→ Delete `.env.local` and recreate
→ Make sure DATABASE_URL doesn't have typos
→ Run: `npx prisma migrate reset` (WARNING: deletes data)

---

## Files Created

```
✓ setup.sh              # Automated setup (macOS/Linux)
✓ setup.ps1            # Automated setup (Windows)
✓ SETUP_CHECKLIST.md   # Detailed checklist
✓ QUICK_START.md       # This file
✓ DATABASE_SETUP.md    # Database guides
✓ API_KEYS_SETUP.md    # API key guides
```

---

## Important Notes

⚠️ **Never commit `.env.local` to git!**
```bash
# Add to .gitignore (if not already there)
echo ".env.local" >> .gitignore
```

⚠️ **Keep API keys secret!**
- Don't share `.env.local`
- Don't commit to GitHub
- Don't post online

⚠️ **Use test keys for development**
- Stripe: Keys starting with `sk_test_`
- Paystack: Keys starting with `sk_test_`
- SendGrid: Test account works fine

---

## What's Running

**Frontend:** http://localhost:3000
**Prisma Studio:** http://localhost:5555 (when running `npx prisma studio`)

**API Endpoints Available:**
- `GET /api/beats` - List beats
- `GET /api/beats/[id]` - Get single beat
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/payment/initialize` - Start payment
- `POST /api/orders` - Create order
- `GET /api/admin/analytics` - Admin analytics
- `GET /api/admin/customers` - Admin customers
- ... and many more

---

## Timeline

| Step | Task | Time |
|------|------|------|
| 1 | Choose database | 5 min |
| 2 | Get API keys | 15 min |
| 3 | Update `.env.local` | 5 min |
| 4 | Test everything | 5 min |
| **TOTAL** | | **30 min** |

---

## 🎉 You're Done!

Your backend is now:
- ✅ Connected to PostgreSQL database
- ✅ Configured with payment gateways (Stripe + Paystack)
- ✅ Configured with email service (SendGrid)
- ✅ Ready for file uploads/downloads
- ✅ Running admin analytics
- ✅ Ready for production

**Start developing:** `npm run dev`

**Need help?** Check [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md) for detailed troubleshooting.
