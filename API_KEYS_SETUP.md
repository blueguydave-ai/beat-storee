# 🔑 API Keys Setup - Quick Links

## Get All 3 API Keys (15 minutes total)

### 1️⃣ Stripe (5 minutes)
```
Step 1: https://dashboard.stripe.com/register
Step 2: Create account
Step 3: Developers → API Keys
Step 4: Copy sk_test_xxx and pk_test_xxx
```

**Add to `.env.local`:**
```
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_test_1234567890
```

---

### 2️⃣ Paystack (5 minutes)
```
Step 1: https://dashboard.paystack.co/signup
Step 2: Verify email
Step 3: Settings → API Keys & Webhooks
Step 4: Copy test keys (sk_test_xxx and pk_test_xxx)
```

**Add to `.env.local`:**
```
PAYSTACK_SECRET_KEY=sk_test_your_paystack_key
PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_key
```

---

### 3️⃣ SendGrid (5 minutes)
```
Step 1: https://app.sendgrid.com/
Step 2: Create account + verify email
Step 3: Settings → API Keys → Create API Key
Step 4: Copy full key
Step 5: Set sender email in verified senders
```

**Add to `.env.local`:**
```
SENDGRID_API_KEY=SG.your_full_key_here
SENDGRID_FROM_EMAIL=your@verified.email
```

---

## 📋 Complete `.env.local` Template

Copy this and fill in your values:

```env
# Database - Get from https://supabase.com (recommended)
DATABASE_URL="postgresql://your_user:your_password@host:5432/beat_store"

# Stripe - Get from https://dashboard.stripe.com
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_test_xxx

# Paystack - Get from https://dashboard.paystack.co
PAYSTACK_SECRET_KEY=sk_test_xxx
PAYSTACK_PUBLIC_KEY=pk_test_xxx

# SendGrid - Get from https://app.sendgrid.com
SENDGRID_API_KEY=SG.xxx
SENDGRID_FROM_EMAIL=noreply@davidjayy.com

# JWT Secret - Generate with: openssl rand -base64 32
JWT_SECRET=generate_random_key_here

# File Storage
FILE_STORAGE_PATH=./public/beats
MAX_FILE_SIZE=314572800

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## ✅ Verification

After adding all keys, test connection:

```bash
npx prisma db push --skip-generate
```

You should see: ✔ Database synced!

---

**Next:** Run `npm run dev` to start the server!
