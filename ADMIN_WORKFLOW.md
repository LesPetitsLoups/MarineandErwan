# Admin Workflow Guide
## Managing Family Photo Uploads via GitHub Issues

This guide explains how to manage family photo uploads safely using GitHub Issues as the upload mechanism.

---

## 🎯 Overview

**Why This Approach?**
- ✅ **No backend needed** - Pure static site compatible with GitHub Pages
- ✅ **Safe & secure** - No public write access to repository
- ✅ **Manual review** - You approve each photo before it goes live
- ✅ **No login required** - Family can upload without GitHub accounts
- ✅ **Simple workflow** - Just GitHub Issues and manual file management

**How It Works:**
```
User clicks upload → GitHub Issue created → You review → Download photos →
Update manifest.json → Commit & push → Photos appear on site
```

---

## 📋 Step-by-Step Workflow

### Step 1: Receive Upload Notification

When someone uploads photos, you'll receive a notification:

1. **Email notification** from GitHub (if enabled)
2. **Or check manually**: https://github.com/LesPetitsLoups/MarineandErwan/issues

**Look for issues with labels:**
- `photo-upload`
- `pending-review`

---

### Step 2: Review the Upload

Open the GitHub Issue and review:

- ✅ **Contributor name** - Who uploaded?
- ✅ **Photo quality** - Are photos appropriate?
- ✅ **Description** - What's the context?
- ✅ **Consent checkbox** - Did they confirm permissions?

**Decide:** Approve or reject?

---

### Step 3A: Download Approved Photos

If approved:

1. **Click each photo** in the issue to view full size
2. **Right-click → "Save image as..."**
3. **Save to your computer** with a descriptive name

**File Naming Best Practices:**
```
marine-5th-birthday-2023.jpg
erwan-beach-summer-2022.jpg
family-christmas-dinner-2023.jpg
```

Use lowercase, hyphens, descriptive names.

---

### Step 3B: Add Photos to Repository

#### Option A: Using File Explorer + Git

1. **Copy photos** to:
   ```
   C:\Users\kevin\Desktop\Claude_code\MarineAndErwan\assets\images\family_uploads\
   ```

2. **Open** `manifest.json` in VS Code or text editor

3. **Add entry** for each photo:
   ```json
   {
     "photos": [
       {
         "filename": "marine-5th-birthday-2023.jpg",
         "contributor": "Aunt Sophie",
         "description": "Marine's 5th birthday party at the park",
         "date": "Summer 2023",
         "uploadDate": "2025-01-15"
       }
     ]
   }
   ```

4. **Save** `manifest.json`

5. **Validate JSON** at https://jsonlint.com/ (paste content, check for errors)

#### Option B: Using Git Bash / Terminal

```bash
# Navigate to project
cd C:\Users\kevin\Desktop\Claude_code\MarineAndErwan

# Copy photo (example)
cp ~/Downloads/photo.jpg assets/images/family_uploads/marine-birthday-2023.jpg

# Edit manifest.json with your preferred editor
code assets/images/family_uploads/manifest.json
```

---

### Step 4: Commit and Push Changes

```bash
# Stage the changes
git add assets/images/family_uploads/

# Commit with descriptive message
git commit -m "Add family photo from Aunt Sophie - Marine's birthday"

# Push to GitHub
git push origin main
```

**Or using VS Code:**
1. Open Source Control panel (Ctrl+Shift+G)
2. Stage changes (click + on changed files)
3. Enter commit message
4. Click ✓ Commit
5. Click ↑ Push

---

### Step 5: Respond to Contributor

1. **Go back to the GitHub Issue**

2. **Add a comment:**
   ```
   Thank you so much for sharing this wonderful photo! 🎉

   Your photo has been added to the website and is now live in the
   "Uploaded by Friends & Family" section!

   View it here: https://lespetitsloups.github.io/MarineandErwan/
   ```

3. **Update labels:**
   - Remove: `pending-review`
   - Add: `approved`

4. **Close the issue**

---

### Step 6: Verify on Website

1. **Wait 1-2 minutes** for GitHub Pages to rebuild
2. **Visit**: https://lespetitsloups.github.io/MarineandErwan/
3. **Scroll to** "Uploaded by Friends & Family" section
4. **Confirm** photo appears correctly

---

## 🚫 Rejecting an Upload

If a photo is inappropriate or doesn't meet guidelines:

1. **Add a polite comment:**
   ```
   Thank you for your submission! Unfortunately, we can't include this photo
   because [reason: quality issue / inappropriate content / etc.].

   Feel free to submit other photos - we'd love to see more memories!
   ```

2. **Update labels:**
   - Remove: `pending-review`
   - Add: `declined`

3. **Close the issue**

---

## 📝 manifest.json Reference

### Complete Structure

```json
{
  "photos": [
    {
      "filename": "photo1.jpg",
      "contributor": "Aunt Sophie",
      "description": "Marine's 5th birthday party at the park",
      "date": "Summer 2023",
      "uploadDate": "2025-01-15"
    },
    {
      "filename": "photo2.jpg",
      "contributor": "Uncle Marc",
      "description": "Erwan playing soccer",
      "date": "April 2022",
      "uploadDate": "2025-01-16"
    }
  ],
  "info": "This file contains metadata for family-uploaded photos."
}
```

### Field Descriptions

| Field | Required | Description |
|-------|----------|-------------|
| `filename` | ✅ Yes | Exact filename in family_uploads directory |
| `contributor` | ✅ Yes | Name of person who uploaded |
| `description` | ⚠️ Recommended | What's in the photo |
| `date` | ❌ Optional | When photo was taken |
| `uploadDate` | ❌ Optional | When added to website |

### JSON Syntax Rules

✅ **Correct:**
```json
{
  "photos": [
    { "filename": "photo1.jpg", "contributor": "Sophie" },
    { "filename": "photo2.jpg", "contributor": "Marc" }
  ]
}
```

❌ **Wrong (missing comma):**
```json
{
  "photos": [
    { "filename": "photo1.jpg", "contributor": "Sophie" }
    { "filename": "photo2.jpg", "contributor": "Marc" }
  ]
}
```

❌ **Wrong (trailing comma):**
```json
{
  "photos": [
    { "filename": "photo1.jpg", "contributor": "Sophie" },
  ]
}
```

---

## 🔧 Quick Commands Reference

### Check for pending uploads
```bash
# Visit this URL
https://github.com/LesPetitsLoups/MarineandErwan/issues?q=label%3Aphoto-upload+label%3Apending-review
```

### Add and commit photos
```bash
cd C:\Users\kevin\Desktop\Claude_code\MarineAndErwan
git add assets/images/family_uploads/
git commit -m "Add family photos from [contributor name]"
git push origin main
```

### Validate manifest.json
```bash
# Using Python (if installed)
python -m json.tool assets/images/family_uploads/manifest.json

# Or paste content into: https://jsonlint.com/
```

### View live site
```
https://lespetitsloups.github.io/MarineandErwan/
```

---

## ❓ Troubleshooting

### Photos not appearing on website?

1. **Check manifest.json syntax**
   - Use https://jsonlint.com/ to validate
   - Look for missing commas, quotes

2. **Verify filenames match**
   - Filename in manifest must exactly match file in directory
   - Check for typos, case sensitivity

3. **Clear browser cache**
   - Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

4. **Wait for GitHub Pages rebuild**
   - Can take 1-5 minutes after pushing changes

### GitHub Issue template not appearing?

1. **Ensure template is in correct location:**
   ```
   .github/ISSUE_TEMPLATE/upload-photo.yml
   ```

2. **Push template to GitHub:**
   ```bash
   git add .github/
   git commit -m "Add photo upload issue template"
   git push origin main
   ```

3. **Wait a few minutes** for GitHub to process

4. **Test the direct URL:**
   ```
   https://github.com/LesPetitsLoups/MarineandErwan/issues/new?template=upload-photo.yml
   ```

### Upload button link not working?

**Update the URL in index.html:**

Current link format:
```
https://github.com/LesPetitsLoups/MarineandErwan/issues/new?assignees=&labels=photo-upload%2Cpending-review&template=upload-photo.yml&title=%5BPHOTO+UPLOAD%5D+
```

Replace `LesPetitsLoups/MarineandErwan` with your actual GitHub username/repo.

---

## 📊 Workflow Checklist

Use this checklist for each upload:

- [ ] Receive notification of new upload
- [ ] Review GitHub Issue
- [ ] Check photo quality and appropriateness
- [ ] Download photo(s) from issue
- [ ] Rename with descriptive filename
- [ ] Copy to `assets/images/family_uploads/`
- [ ] Update `manifest.json` with photo metadata
- [ ] Validate JSON syntax
- [ ] Commit and push changes
- [ ] Wait for GitHub Pages to rebuild
- [ ] Verify photo appears on live site
- [ ] Comment on issue thanking contributor
- [ ] Add `approved` label
- [ ] Remove `pending-review` label
- [ ] Close the issue

---

## 🎨 Best Practices

### Photo Quality
- Accept: Clear, well-lit photos of Marine, Erwan, or family
- Reject: Blurry, inappropriate, or unrelated content

### Response Time
- Aim to review within 1-3 days
- Contributors appreciate quick feedback

### Communication
- Always be polite and thankful
- Explain if you can't accept a photo
- Encourage more submissions

### Organization
- Use consistent file naming
- Keep manifest.json well-formatted
- Document any special notes in commit messages

---

## 📞 Getting Help

**JSON Validation:**
- https://jsonlint.com/

**Git Help:**
- https://docs.github.com/en/get-started

**GitHub Issues:**
- https://docs.github.com/en/issues

**Question? Issue?**
- Check the main README.md
- Review this workflow guide
- Test on a local copy first

---

## 🎉 Success Example

**Complete workflow example:**

1. ✉️ Email: "New issue: [PHOTO UPLOAD] Marine's Birthday"
2. 👀 Review: Aunt Sophie uploaded 2 photos
3. ✅ Approve: Photos look great!
4. 💾 Download: `marine-birthday-2023-1.jpg`, `marine-birthday-2023-2.jpg`
5. 📝 Edit manifest.json:
   ```json
   {
     "photos": [
       {
         "filename": "marine-birthday-2023-1.jpg",
         "contributor": "Aunt Sophie",
         "description": "Marine blowing out birthday candles",
         "date": "June 2023",
         "uploadDate": "2025-01-15"
       },
       {
         "filename": "marine-birthday-2023-2.jpg",
         "contributor": "Aunt Sophie",
         "description": "Marine with her birthday cake",
         "date": "June 2023",
         "uploadDate": "2025-01-15"
       }
     ]
   }
   ```
6. 🚀 Commit: `git add .` → `git commit -m "Add Sophie's photos"` → `git push`
7. 💬 Comment: "Thank you Sophie! Photos are live! 🎉"
8. ✅ Close issue with `approved` label
9. 🌐 Verify on website

**Result:** Happy contributor, beautiful photos on the site! 🎂

---

**Remember:** This workflow keeps the site safe while allowing family participation!
