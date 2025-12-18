# SmartHeal React Native - Quick Start

Write-Host "🚀 SmartHeal React Native Setup" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""

# Check Node.js
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Check npm
Write-Host "Checking npm installation..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✅ npm found: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm not found. Please reinstall Node.js" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..." -ForegroundColor Gray
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🎉 Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Read SETUP_GUIDE.md for detailed instructions" -ForegroundColor White
Write-Host "2. Run 'npm start' to start the development server" -ForegroundColor White
Write-Host "3. Scan the QR code with Expo Go app on your phone" -ForegroundColor White
Write-Host ""
Write-Host "Quick commands:" -ForegroundColor Cyan
Write-Host "  npm start          - Start development server" -ForegroundColor White
Write-Host "  npm run android    - Run on Android emulator" -ForegroundColor White
Write-Host "  npm run ios        - Run on iOS simulator (macOS only)" -ForegroundColor White
Write-Host "  npm run web        - Run in web browser" -ForegroundColor White
Write-Host ""
Write-Host "Would you like to start the development server now? (Y/N)" -ForegroundColor Yellow
$response = Read-Host

if ($response -eq 'Y' -or $response -eq 'y') {
    Write-Host ""
    Write-Host "🚀 Starting development server..." -ForegroundColor Green
    npm start
} else {
    Write-Host ""
    Write-Host "Run 'npm start' when you're ready!" -ForegroundColor Cyan
    Write-Host ""
}
