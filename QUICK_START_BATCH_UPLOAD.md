# 🚀 Quick Start: Batch Photo Upload (100+ photos)

## For Tomorrow's Email Backlog

This is the **fastest way** to process bulk photos from email. The full Gmail API automation (AUTOMATION_WORKFLOW.md) is better long-term, but requires 2-3 hours setup.

---

## ⚡ Quick Method (15 minutes total)

### Step 1: Download Email Attachments (5 mins)

**Gmail Method:**
1. Open Gmail: marineeterwan29@gmail.com
2. Search: `has:attachment`
3. For each email with photos:
   - Click the email
   - Click the download icon (⬇️) next to attachments
   - OR: Right-click attachment → "Save all to disk"
4. Save to Downloads folder

**Tip:** Gmail allows selecting multiple attachments at once with Ctrl+Click

---

### Step 2: Organize Photos into Folders (5 mins)

The script expects photos in these folders:

```
C:\Users\kevin\Desktop\Claude_code\MarineAndErwan\photo_inbox\
├── marine/     ← Photos for Marine only
├── erwan/      ← Photos for Erwan only
└── both/       ← Photos for both galleries
```

**How to organize:**

Look at the email **subject** to know where photos go:

| Email Subject | Move Photos To |
|---------------|----------------|
| `Photos pour Marine` | `photo_inbox/marine/` |
| `Photos pour Erwan` | `photo_inbox/erwan/` |
| `Photos pour Marine et Erwan` | `photo_inbox/both/` |

**Example:**
```
Downloads/
├── signal-2025-11-16-100001.jpeg  ← From "Photos pour Marine"
├── signal-2025-11-16-100002.jpeg  ← From "Photos pour Marine"
└── IMG_12345.jpg                  ← From "Photos pour Erwan"

Move to:
photo_inbox/
├── marine/
│   ├── signal-2025-11-16-100001.jpeg
│   └── signal-2025-11-16-100002.jpeg
└── erwan/
    └── IMG_12345.jpg
```

---

### Step 3: Run the Batch Processor (5 mins)

1. **Open Command Prompt / Terminal**
   - Press `Win + R`
   - Type `cmd`
   - Press Enter

2. **Navigate to repository**
   ```bash
   cd C:\Users\kevin\Desktop\Claude_code\MarineAndErwan
   ```

3. **Run the script**
   ```bash
   python batch_photo_processor.py
   ```

4. **What happens:**
   ```
   🚀 Marine & Erwan Batch Photo Processor

   👧 Processing Marine photos...
      📁 Copied signal-2025-11-16-100001.jpeg
      📁 Copied signal-2025-11-16-100002.jpeg
      ✅ Added 2 new photo(s) to Marine

   👦 Processing Erwan photos...
      📁 Copied IMG_12345.jpg
      ✅ Added 1 new photo(s) to Erwan

   📊 SUMMARY
   Marine: +2 photos
   Erwan:  +1 photos
   Total:  3 photos processed

   🤔 Commit and push to GitHub? (yes/no)
   > yes

   ✅ Successfully committed and pushed 3 photo(s) to GitHub
   🌐 Site will refresh at marineeterwan.com in ~2 minutes
   ```

5. **Type `yes` when asked to commit**

---

## 📋 What the Script Does Automatically

✅ **Copies photos** from `photo_inbox/` to `assets/images/`
✅ **Updates HTML files** (marine.html, erwan.html) with new photo entries
✅ **Avoids duplicates** (checks if photo already exists)
✅ **Git commit & push** to GitHub
✅ **Cleans up** processed photos remain in photo_inbox for your records

---

## 🎯 Pro Tips

### For 100+ Photos

**Batch by email subject:**
1. First, process all "Marine" emails → Run script
2. Then, process all "Erwan" emails → Run script
3. Finally, process "Both" emails → Run script

You can run the script **multiple times** safely - it won't create duplicates.

### Supported File Types
- `.jpg`, `.jpeg`
- `.png`
- `.gif`
- `.webp`

### Photo Names Don't Matter
The script works with any filename. Keep the original names from email attachments.

---

## 🛠️ Troubleshooting

### "Python is not recognized"

**Install Python:**
1. Download: https://www.python.org/downloads/
2. Check "Add Python to PATH" during installation
3. Restart Command Prompt

**OR use Python from Microsoft Store:**
1. Open Microsoft Store
2. Search "Python 3.12"
3. Install

### "No module named 'pathlib'"

The script uses only built-in Python modules. If you see this error, you're using Python 2.x.

**Fix:** Install Python 3.8+ (see above)

### "Git push failed"

The script will tell you photos are copied but not pushed. You can push manually:

```bash
cd C:\Users\kevin\Desktop\Claude_code\MarineAndErwan
git push
```

### Photos not showing on website

1. Check GitHub Actions: https://github.com/LesPetitsLoups/MarineandErwan/actions
2. Wait 2-3 minutes for GitHub Pages to rebuild
3. Hard refresh browser: `Ctrl + Shift + R`

---

## 🔄 After Processing

The photos remain in `photo_inbox/` for your records. You can:

- **Keep them** as backup
- **Delete them** after verifying website updated
- **Archive them** to another folder

The script **never deletes** your originals.

---

## 📊 Example: Processing 100 Photos

**Scenario:** 100 photos in email inbox

**Time breakdown:**
- Download from Gmail: 10 mins (bulk download)
- Organize by subject: 10 mins (drag & drop)
- Run script: 2 mins (automated)
- GitHub Pages rebuild: 2 mins (automatic)
- **Total: ~24 minutes**

Compare to manual:
- Add each photo to HTML manually: 100 × 1 min = 100 mins
- Fix typos, duplicates: 20 mins
- **Total: ~2 hours**

**Batch processor saves 90+ minutes** for 100 photos!

---

## 🚀 Next Steps: Full Automation

Once you've handled tomorrow's backlog, set up the **full Gmail API automation** from `AUTOMATION_WORKFLOW.md`.

That system will:
- ✅ Check email every hour automatically
- ✅ Extract attachments directly from Gmail
- ✅ Route by subject automatically
- ✅ Update website with zero manual work

**Setup time:** 2-3 hours
**Payoff:** Never manually process photos again

---

## 📞 Need Help?

If the script doesn't work:

1. Check you're in the right directory: `pwd` (shows current directory)
2. Check Python version: `python --version` (should be 3.8+)
3. Check photo_inbox folders exist:
   ```bash
   ls photo_inbox
   ```
   Should show: `both/  erwan/  marine/`

---

**Created:** 2025-11-15
**For:** Handling email backlog before full automation
**Estimated time savings:** 90+ minutes for 100 photos
