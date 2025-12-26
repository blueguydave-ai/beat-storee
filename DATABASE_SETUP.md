# 🗄️ Database Setup Guide - Choose Your Option

## Quick Start (Recommended for Development)

### Option 1: **Supabase** (Easiest - 5 minutes) ✨ RECOMMENDED

**Supabase** = PostgreSQL in the cloud, perfect for testing

1. **Go to:** https://supabase.com
2. **Click:** "Start your project"
3. **Create account** and verify email
4. **New project:**
   - Name: `beat-store`
   - Password: Generate strong password (save it!)
   - Region: Choose closest to you
   - Click "Create new project"
5. **Wait 2-3 minutes** for database creation
6. **Get Connection String:**
   - Left sidebar → "Settings"
   - Click "Database"
   - Scroll down → "Connection string"
   - Copy the **"URI"** (postgres://...)
7. **Update `.env.local`:**
   ```
   DATABASE_URL=paste_your_supabase_uri_here
   ```

✅ **Done! Database is live and ready**

---

### Option 2: **Railway** (Also Easy - 5 minutes)

**Railway** = Simple cloud database deployment

1. **Go to:** https://railway.app
2. **Sign up** with GitHub (easiest)
3. **New Project** → **Provision PostgreSQL**
4. **Wait for deployment** (1-2 minutes)
5. **Get Connection String:**
   - Click the PostgreSQL service
   - "Connect" tab
   - Copy the full connection string
6. **Update `.env.local`:**
   ```
   DATABASE_URL=paste_railway_connection_string
   ```

✅ **Done! Database is live**

---

### Option 3: **Vercel Postgres** (Free tier)

1. **Go to:** https://vercel.com/postgres
2. **Create database** (free tier available)
3. **Get connection string** from dashboard
4. **Update `.env.local`:**
   ```
   DATABASE_URL=paste_vercel_postgres_uri
   ```

---

### Option 4: **Local PostgreSQL** (Advanced - 30 minutes)

If you prefer local development:

**Windows - Using WSL2:**
```bash
# Install PostgreSQL via package manager
sudo apt-get install postgresql postgresql-contrib

# Start PostgreSQL service
sudo service postgresql start

# Create database
createdb beat_store

# Get connection string
DATABASE_URL="postgresql://postgres:password@localhost:5432/beat_store"
```

**Or Download PostgreSQL:**
- Go to: https://www.postgresql.org/download/windows/
- Install PostgreSQL
- Create database: `beat_store`
- Update `.env.local`

---

## ✅ Step 2: Verify Connection

After updating `.env.local`:

```bash
cd c:\Users\1012\ G2\Downloads\beat-store

# Test connection
npx prisma db push --skip-generate

# If it works, you'll see: ✔ Database synced!
```

---

## ✅ Step 3: Generate Prisma Client

```bash
npx prisma generate
```

---

## ✅ Step 4: Seed Database (Optional Mock Data)

```bash
# This will populate test data
npx prisma db seed
```

---

## 📋 Your Connection String Format

Most cloud databases provide:
```
postgresql://username:password@host:port/database
```

Example from Supabase:
```
postgresql://postgres:abc123XYZ@db.supabase.co:5432/postgres
```

---

## 🧪 Test It Works

Run this command:

```bash
npx prisma studio
```

This opens **Prisma Studio** in browser (http://localhost:5555) where you can:
- ✅ See all database tables
- ✅ View records
- ✅ Add test data
- ✅ Verify connection works

---

## ⚡ Next Steps After Database

1. **Get API Keys:**
   - [ ] Stripe keys (see below)
   - [ ] Paystack keys (see below)
   - [ ] SendGrid key (see below)

2. **Update `.env.local`** with all keys

3. **Start dev server:**
   ```bash
   npm run dev
   ```

4. **Test API endpoints:**
   - Go to http://localhost:3000/api/beats
   - Should return beat list

---

## 🔑 Getting API Keys

### Stripe (2 minutes)
1. Go to: https://dashboard.stripe.com/register
2. Create account
3. Skip onboarding
4. **Developers** → **API Keys**
5. Copy:
   - `sk_test_xxx` → `STRIPE_SECRET_KEY`
   - `pk_test_xxx` → `STRIPE_PUBLISHABLE_KEY`

### Paystack (2 minutes)
1. Go to: https://dashboard.paystack.co/signup
2. Create account
3. Email verification
4. **Settings** → **API Keys & Webhooks**
5. Copy test keys:
   - `sk_test_xxx` → `PAYSTACK_SECRET_KEY`
   - `pk_test_xxx` → `PAYSTACK_PUBLIC_KEY`

### SendGrid (2 minutes)
1. Go to: https://app.sendgrid.com/
2. Create account
3. Verify email
4. **Settings** → **API Keys**
5. Click **Create API Key**
6. Copy key → `SENDGRID_API_KEY`
7. Set sender email → `SENDGRID_FROM_EMAIL`

---

## 📝 Updated `.env.local` Template

After getting all keys:

```env
# Database - COPY FROM YOUR CLOUD DATABASE
DATABASE_URL=postgresql://...

# Stripe - FROM https://dashboard.stripe.com
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_test_...

# Paystack - FROM https://dashboard.paystack.co
PAYSTACK_SECRET_KEY=sk_test_...
PAYSTACK_PUBLIC_KEY=pk_test_...

# SendGrid - FROM https://app.sendgrid.com
SENDGRID_API_KEY=SG...
SENDGRID_FROM_EMAIL=your@email.com

# JWT Secret - GENERATE: openssl rand -base64 32
JWT_SECRET=your_random_key_here

# File Storage
FILE_STORAGE_PATH=./public/beats
MAX_FILE_SIZE=314572800

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## 🚀 Summary

1. **Pick database** (Supabase recommended)
2. **Get connection string** and update `.env.local`
3. **Get API keys** (Stripe, Paystack, SendGrid)
4. **Update `.env.local`** with all keys
5. **Test connection:**
   ```bash
   npx prisma studio
   ```
6. **Start development:**
   ```bash
   npm run dev
   ```

---

## ❓ Common Issues

**"Connection refused"**
- Check DATABASE_URL spelling
- Verify database is running
- Test connection string in Prisma

**"Authentication failed"**
- Check password in connection string
- Verify database user has permission
- Try resetting database password

**"Port already in use"**
- PostgreSQL using default port 5432
- Change port or kill existing process

**"Prisma generate fails"**
- Delete `node_modules/.prisma`
- Run `npx prisma generate` again

---

**Estimated Total Time:** 15-20 minutes  
**Difficulty:** Easy ⭐  
**Ready to proceed?** Let me know once you have the DATABASE_URL!
