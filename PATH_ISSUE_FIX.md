# ⚠️ IMPORTANT: Path Issue on Windows

## The Problem

Expo Metro bundler is trying to create directories with colons in the name (like `node:sea`) which is **not allowed on Windows**. This causes the error:

```
Error: ENOENT: no such file or directory, mkdir '...\node:sea'
```

This is a known issue with Expo SDK on Windows when the project path contains spaces or special characters.

## ✅ RECOMMENDED SOLUTION: Move Project

The project needs to be in a simpler path without spaces.

### Option 1: Automated Move (Easiest)

Run the provided script:

```powershell
.\move-project.ps1
```

This will:

- Move the project to `C:\Projects\SmartHeal`
- Preserve all your files
- Provide instructions for next steps

### Option 2: Manual Move

1. Create a new folder with a simple path:

   ```
   C:\SmartHeal
   OR
   C:\Projects\SmartHeal
   OR
   C:\Dev\SmartHeal
   ```

2. Copy all files from this folder to the new location

3. Open terminal in the new location:
   ```powershell
   cd C:\SmartHeal
   npm install
   npm start
   ```

## Alternative Solutions

### Use Windows Subsystem for Linux (WSL)

If you have WSL installed:

```bash
# In WSL terminal
cd /mnt/d/
mkdir SmartHeal
cp -r "/mnt/d/Smartheal FF/Smart Heal (Copy) new/"* SmartHeal/
cd SmartHeal
npm install
npm start
```

### Use React Native CLI (Advanced)

Convert to a bare React Native project (not recommended for beginners).

## Why This Happens

- Windows doesn't allow colons (`:`) in file/folder names
- Expo Metro bundler tries to create `node:sea` as a directory name
- The project path has spaces which compounds the issue
- This is a known Expo issue on Windows (affects SDK 49 and 50)

## After Moving

Once in the new location, everything will work:

```powershell
# In the new location
npm install      # Reinstall dependencies
npm start        # Start Expo dev server
```

Then scan the QR code with Expo Go app on your phone!

## Need Help?

Run the automated script:

```powershell
.\move-project.ps1
```

---

**The app code is perfect - it's just the folder path causing issues!**
