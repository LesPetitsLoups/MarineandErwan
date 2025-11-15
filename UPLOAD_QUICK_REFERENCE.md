# Family Photo Upload - Quick Reference Card

## 📤 For Family Members (Uploading Photos)

### How to Upload:

1. Visit the birthday website
2. Click the **"Upload Your Photos"** button
3. Fill out the form with your name and photo details
4. **Drag & drop photos** or click to browse
5. Submit!

### Direct Upload Link:
```
https://github.com/LesPetitsLoups/MarineandErwan/issues/new?template=upload-photo.yml
```

---

## 👨‍💼 For Admins (Managing Uploads)

### Quick Workflow:

```
1. Check Issues → 2. Download Photo → 3. Add to folder →
4. Update manifest.json → 5. Commit & Push → 6. Close Issue
```

### Step 1: Check for Uploads
**URL:** https://github.com/LesPetitsLoups/MarineandErwan/issues?q=label%3Aphoto-upload+label%3Apending-review

### Step 2: Download Photo from Issue
- Click photo → Right-click → "Save image as..."
- Save with descriptive name: `marine-birthday-2023.jpg`

### Step 3: Add to Repository
```bash
# Copy to family_uploads folder
cp ~/Downloads/photo.jpg assets/images/family_uploads/marine-birthday-2023.jpg
```

### Step 4: Update manifest.json
```json
{
  "photos": [
    {
      "filename": "marine-birthday-2023.jpg",
      "contributor": "Aunt Sophie",
      "description": "Marine's 5th birthday party",
      "date": "June 2023",
      "uploadDate": "2025-01-15"
    }
  ]
}
```

**Important:** Use double quotes, add comma between entries (NOT after last one)

### Step 5: Commit and Push
```bash
git add assets/images/family_uploads/
git commit -m "Add family photo from Aunt Sophie"
git push origin main
```

### Step 6: Respond to Contributor
1. Comment on issue: "Thank you! Your photo is now live! 🎉"
2. Add label: `approved`
3. Remove label: `pending-review`
4. Close issue

---

## 🚨 Common Issues & Fixes

### JSON Syntax Error?
- Validate at: https://jsonlint.com/
- Check for missing commas
- Ensure double quotes (not single)

### Photos not appearing?
1. Check filename matches exactly
2. Clear browser cache (Ctrl+F5)
3. Wait 2 minutes for GitHub Pages rebuild

### Upload button not working?
- Make sure `.github/ISSUE_TEMPLATE/upload-photo.yml` is pushed to GitHub
- Check repository is public

---

## 📋 Admin Checklist

Copy this for each upload:

```
[ ] Review GitHub Issue
[ ] Download photo(s)
[ ] Rename descriptively
[ ] Copy to assets/images/family_uploads/
[ ] Edit manifest.json
[ ] Validate JSON
[ ] git add assets/images/family_uploads/
[ ] git commit -m "Add photo from [name]"
[ ] git push origin main
[ ] Verify on live site
[ ] Comment & close issue
```

---

## 🔗 Important Links

| Link | URL |
|------|-----|
| View Pending Uploads | https://github.com/LesPetitsLoups/MarineandErwan/issues?q=label%3Aphoto-upload+label%3Apending-review |
| Upload Form | https://github.com/LesPetitsLoups/MarineandErwan/issues/new?template=upload-photo.yml |
| Live Website | https://lespetitsloups.github.io/MarineandErwan/ |
| JSON Validator | https://jsonlint.com/ |

---

## 📖 Full Documentation

- **ADMIN_WORKFLOW.md** - Complete step-by-step guide
- **UPLOAD_FEATURE_SUMMARY.md** - Feature overview
- **README.md** - General project documentation

---

**Print this page and keep it handy!**
