# Git Setup Instructions

Follow these steps to push your website to GitHub:

## 🚀 Quick Setup (Copy & Paste)

Open a terminal in the project directory and run these commands:

```bash
# Navigate to project directory
cd C:\Users\kevin\Desktop\Claude_code\MarineAndErwan

# Initialize Git repository
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial birthday website release"

# Add remote repository
git remote add origin https://github.com/LesPetitsLoups/MarineandErwan.git

# Push to GitHub
git push -u origin main
```

## 📝 Step-by-Step Instructions

### 1. Check Git Installation

```bash
git --version
```

If Git is not installed, download from: https://git-scm.com/

### 2. Configure Git (First Time Only)

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 3. Initialize Repository

```bash
cd C:\Users\kevin\Desktop\Claude_code\MarineAndErwan
git init
```

### 4. Add Files

```bash
git add .
```

### 5. Create First Commit

```bash
git commit -m "Initial birthday website release"
```

### 6. Connect to GitHub

Make sure the repository exists at: https://github.com/LesPetitsLoups/MarineandErwan.git

```bash
git remote add origin https://github.com/LesPetitsLoups/MarineandErwan.git
```

### 7. Push to GitHub

```bash
git push -u origin main
```

If you get an error about the default branch, try:

```bash
git branch -M main
git push -u origin main
```

## 🔄 Future Updates

After making changes to your website:

```bash
# Check what changed
git status

# Add all changes
git add .

# Commit with descriptive message
git commit -m "Add more photos to Marine's gallery"

# Push to GitHub
git push
```

## 🌐 Enable GitHub Pages

1. Go to: https://github.com/LesPetitsLoups/MarineandErwan
2. Click **Settings**
3. Click **Pages** (left sidebar)
4. Under **Source**, select `main` branch
5. Click **Save**
6. Wait a few minutes
7. Your site will be live at: `https://lespetitsloups.github.io/MarineandErwan/`

## ❗ Troubleshooting

### "Repository not found" error

Make sure the repository exists on GitHub first:
1. Go to: https://github.com/LesPetitsLoups
2. Create a new repository named `MarineandErwan`
3. Don't initialize with README (we already have files)
4. Then run the git commands above

### "Permission denied" error

You may need to authenticate with GitHub:
- Use GitHub Desktop (easier): https://desktop.github.com/
- Or set up SSH keys: https://docs.github.com/en/authentication
- Or use Personal Access Token instead of password

### "Already exists" error

If the repository was already initialized:

```bash
# Check current remote
git remote -v

# Remove old remote
git remote remove origin

# Add correct remote
git remote add origin https://github.com/LesPetitsLoups/MarineandErwan.git

# Push
git push -u origin main
```

## ✅ Verification

After pushing, check:

1. Visit: https://github.com/LesPetitsLoups/MarineandErwan
2. You should see all your files
3. Go to **Settings** → **Pages** to enable the live site

---

**Need help?** Check the main README.md file or GitHub documentation.
