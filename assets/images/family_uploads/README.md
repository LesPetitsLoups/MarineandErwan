# Family Uploads Directory

This directory contains photos uploaded by friends and family through the GitHub Issues workflow.

## How It Works

1. **Users Upload**: Family members click the "Upload Your Photos" button on the website
2. **GitHub Issue Created**: They fill out the form and attach photos via GitHub Issues
3. **Admin Review**: You review the issue and download the photos
4. **Manual Addition**: You add approved photos to this directory and update `manifest.json`
5. **Website Update**: Photos automatically appear in the "Uploaded by Friends & Family" section

## Directory Structure

```
family_uploads/
├── manifest.json          # Photo metadata (MUST BE UPDATED)
├── README.md              # This file
└── [photo files]          # Actual uploaded photos
```

## Adding Photos (Admin Workflow)

### Step 1: Review GitHub Issue

1. Go to: https://github.com/LesPetitsLoups/MarineandErwan/issues
2. Look for issues with label `photo-upload` and `pending-review`
3. Review the uploaded photos and contributor information

### Step 2: Download Photos

1. Click on each photo in the issue
2. Right-click → "Save image as..."
3. Save with a descriptive filename (e.g., `marine-birthday-2023-aunt-sophie.jpg`)

### Step 3: Add to Repository

1. Copy the photo file to this directory (`assets/images/family_uploads/`)
2. Open `manifest.json` and add an entry:

```json
{
  "photos": [
    {
      "filename": "marine-birthday-2023-aunt-sophie.jpg",
      "contributor": "Aunt Sophie",
      "description": "Marine's 5th birthday party at the park",
      "date": "Summer 2023",
      "uploadDate": "2025-01-15"
    }
  ]
}
```

### Step 4: Commit and Push

```bash
git add assets/images/family_uploads/
git commit -m "Add family photo from Aunt Sophie"
git push
```

### Step 5: Update GitHub Issue

1. Go back to the GitHub issue
2. Add a comment: "Thank you! Your photo has been added to the website! 🎉"
3. Add label: `approved`
4. Remove label: `pending-review`
5. Close the issue

## manifest.json Format

Each photo entry must include:

- **filename** (required): Exact filename in this directory
- **contributor** (required): Name of the person who uploaded
- **description** (optional): Description of the photo
- **date** (optional): When the photo was taken
- **uploadDate** (optional): When it was added to the site

### Example manifest.json

```json
{
  "photos": [
    {
      "filename": "photo1.jpg",
      "contributor": "Aunt Sophie",
      "description": "Marine's 5th birthday party",
      "date": "Summer 2023",
      "uploadDate": "2025-01-15"
    },
    {
      "filename": "photo2.jpg",
      "contributor": "Uncle Marc",
      "description": "Erwan playing at the beach",
      "date": "August 2022",
      "uploadDate": "2025-01-16"
    }
  ],
  "info": "This file contains metadata for family-uploaded photos."
}
```

## File Naming Convention

Use descriptive, lowercase filenames with hyphens:

✅ Good:
- `marine-birthday-2023.jpg`
- `erwan-beach-vacation.jpg`
- `family-christmas-2022.jpg`

❌ Avoid:
- `IMG_1234.jpg`
- `photo.jpg`
- `Untitled.jpg`

## Image Guidelines

- **Format**: JPG or PNG
- **Size**: Recommend max 2MB per file
- **Resolution**: 1920px max width (resize larger images)
- **Orientation**: Any (portrait, landscape, square)

## Security Notes

✅ **This workflow is safe because:**
- Users cannot directly write to the repository
- All uploads go through GitHub Issues for review
- You manually approve each photo before adding
- No backend or database required
- No security vulnerabilities

## Troubleshooting

### Photos not appearing on website?

1. Check `manifest.json` syntax is valid (use a JSON validator)
2. Ensure filename in manifest matches actual file
3. Clear browser cache and refresh
4. Check browser console for errors

### JSON syntax error?

Use a JSON validator: https://jsonlint.com/

Make sure:
- All strings use double quotes `"`
- Commas between entries (but not after last entry)
- Proper bracket structure `{ }`

## Quick Reference

**Review Issues**: https://github.com/LesPetitsLoups/MarineandErwan/issues?q=label%3Aphoto-upload+label%3Apending-review

**Add Photo Checklist**:
- [ ] Download photo from issue
- [ ] Rename with descriptive filename
- [ ] Copy to this directory
- [ ] Update manifest.json
- [ ] Commit and push changes
- [ ] Comment on issue thanking contributor
- [ ] Close issue with "approved" label

---

For detailed instructions, see: `ADMIN_WORKFLOW.md` in the project root.
