# Deploy Setup Script for SoulHub.net
# This script initializes git, adds all files, and prepares for Vercel deployment.

Write-Host "Starting Deployment Setup..." -ForegroundColor Cyan

# 1. Initialize Git if not already done
if (!(Test-Path .git)) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
} else {
    Write-Host "Git repository already initialized." -ForegroundColor Green
}

# 2. Add all files
Write-Host "Adding files to stage..." -ForegroundColor Yellow
git add .

# 3. Commit
Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m "Production Release: SoulHub.net v1 (Pepsi Aesthetic)"

# 4. Instructions for Vercel
Write-Host "`nDeployment Setup Complete!" -ForegroundColor Green
Write-Host "To deploy to Vercel, run the following commands:" -ForegroundColor Cyan
Write-Host "1. npx vercel login"
Write-Host "2. npx vercel"
Write-Host "`nFollow the prompts, select 'N' for existing project (if asked), and your site will be live!" -ForegroundColor Cyan
