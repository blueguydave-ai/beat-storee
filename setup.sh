#!/bin/bash
# Beat Store - Backend Setup Script
# This script guides you through the entire setup process

echo "🎵 David Jayy Beats - Backend Setup"
echo "===================================="
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
node --version
npm --version
echo ""

# Check if .env.local exists
if [ -f .env.local ]; then
    echo "✓ .env.local exists"
    echo ""
    read -p "Update .env.local now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Please update .env.local with:"
        echo "1. DATABASE_URL from Supabase/Railway"
        echo "2. STRIPE keys from dashboard.stripe.com"
        echo "3. PAYSTACK keys from dashboard.paystack.co"
        echo "4. SENDGRID key from app.sendgrid.com"
        echo ""
        read -p "Press Enter when done..."
    fi
else
    echo "✗ .env.local not found"
    echo "Copy .env.example to .env.local and update with your keys"
    exit 1
fi

# Test database connection
echo ""
echo "🔧 Testing database connection..."
npx prisma db push --skip-generate

if [ $? -eq 0 ]; then
    echo "✓ Database connected!"
else
    echo "✗ Database connection failed"
    echo "Check your DATABASE_URL in .env.local"
    exit 1
fi

# Generate Prisma Client
echo ""
echo "⚙️ Generating Prisma Client..."
npx prisma generate

if [ $? -eq 0 ]; then
    echo "✓ Prisma generated!"
else
    echo "✗ Prisma generation failed"
    exit 1
fi

# Seed database
echo ""
echo "🌱 Seed database with test data? (y/n)"
read -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npx prisma db seed
    echo "✓ Database seeded!"
fi

# Start dev server
echo ""
echo "✅ Setup complete!"
echo ""
echo "Ready to start? (y/n)"
read -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npm run dev
fi
