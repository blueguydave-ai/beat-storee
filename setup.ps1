#!/usr/bin/env pwsh
# Beat Store - Backend Setup Script (Windows)
# This script guides you through the entire setup process

Write-Host "🎵 David Jayy Beats - Backend Setup" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "✓ Checking Node.js..." -ForegroundColor Green
node --version
npm --version
Write-Host ""

# Check if .env.local exists
if (Test-Path ".env.local") {
    Write-Host "✓ .env.local exists" -ForegroundColor Green
    Write-Host ""
    $update = Read-Host "Update .env.local now? (y/n)"
    if ($update -eq "y" -or $update -eq "Y") {
        Write-Host "Please update .env.local with:" -ForegroundColor Yellow
        Write-Host "1. DATABASE_URL from Supabase/Railway"
        Write-Host "2. STRIPE keys from dashboard.stripe.com"
        Write-Host "3. PAYSTACK keys from dashboard.paystack.co"
        Write-Host "4. SENDGRID key from app.sendgrid.com"
        Write-Host ""
        Read-Host "Press Enter when done"
    }
} else {
    Write-Host "✗ .env.local not found" -ForegroundColor Red
    Write-Host "Copy .env.example to .env.local and update with your keys"
    exit 1
}

# Test database connection
Write-Host ""
Write-Host "🔧 Testing database connection..." -ForegroundColor Cyan
npx prisma db push --skip-generate

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Database connected!" -ForegroundColor Green
} else {
    Write-Host "✗ Database connection failed" -ForegroundColor Red
    Write-Host "Check your DATABASE_URL in .env.local"
    exit 1
}

# Generate Prisma Client
Write-Host ""
Write-Host "⚙️ Generating Prisma Client..." -ForegroundColor Cyan
npx prisma generate

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Prisma generated!" -ForegroundColor Green
} else {
    Write-Host "✗ Prisma generation failed" -ForegroundColor Red
    exit 1
}

# Seed database
Write-Host ""
$seed = Read-Host "Seed database with test data? (y/n)"
if ($seed -eq "y" -or $seed -eq "Y") {
    npx prisma db seed
    Write-Host "✓ Database seeded!" -ForegroundColor Green
}

# Start dev server
Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
$start = Read-Host "Ready to start development server? (y/n)"
if ($start -eq "y" -or $start -eq "Y") {
    npm run dev
}
