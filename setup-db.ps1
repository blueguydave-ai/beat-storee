$env:DATABASE_URL="postgresql://postgres:mysupabase1@db.ifsydvqnouqesfrndtap.supabase.co:5432/postgres"
Write-Host "Pushing schema to database..."
npx prisma db push --accept-data-loss
