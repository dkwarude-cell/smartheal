# SmartHeal Project Mover Script
# This script moves the project to a simpler path to avoid Expo/Metro bundler issues on Windows

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "SmartHeal Project Mover" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Issue: Expo Metro bundler cannot handle paths with spaces and special characters on Windows." -ForegroundColor Yellow
Write-Host "Solution: Move project to a simpler path`n" -ForegroundColor Green

# Suggested new path
$newPath = "C:\Projects\SmartHeal"

Write-Host "Current path: $PWD" -ForegroundColor White
Write-Host "Suggested new path: $newPath`n" -ForegroundColor Cyan

$response = Read-Host "Would you like to move the project to $newPath? (Y/N)"

if ($response -eq 'Y' -or $response -eq 'y') {
    Write-Host "`nMoving project..." -ForegroundColor Yellow
    
    # Create parent directory if it doesn't exist
    if (!(Test-Path "C:\Projects")) {
        New-Item -ItemType Directory -Path "C:\Projects" | Out-Null
        Write-Host "✓ Created C:\Projects directory" -ForegroundColor Green
    }
    
    # Copy the project
    Write-Host "Copying files (this may take a minute)..." -ForegroundColor Yellow
    Copy-Item -Path $PWD -Destination $newPath -Recurse -Force
    
    Write-Host "✓ Project copied successfully!" -ForegroundColor Green
    Write-Host "`nNext steps:" -ForegroundColor Cyan
    Write-Host "1. cd $newPath" -ForegroundColor White
    Write-Host "2. npm install" -ForegroundColor White
    Write-Host "3. npm start`n" -ForegroundColor White
    
    $openNew = Read-Host "Would you like to open the new location in Explorer? (Y/N)"
    if ($openNew -eq 'Y' -or $openNew -eq 'y') {
        explorer $newPath
    }
    
    Write-Host "`n✅ Done! Navigate to the new location and run npm start" -ForegroundColor Green
    
}
else {
    Write-Host "`nAlternative solutions:" -ForegroundColor Yellow
    Write-Host "1. Use a custom path: Manually copy to any path without spaces (e.g., C:\Dev\SmartHeal)" -ForegroundColor White
    Write-Host "2. Use WSL: Run the project in Windows Subsystem for Linux" -ForegroundColor White
    Write-Host "3. Use React Native CLI: Convert to bare React Native (more complex)`n" -ForegroundColor White
}

Write-Host "`nPress any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
