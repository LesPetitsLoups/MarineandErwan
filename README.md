# Marine & Erwan Birthday Website

A modern, responsive birthday celebration website featuring beautiful pastel colors, family photos, and interactive galleries for Marine and Erwan.

## 🎂 Features

- **Modern Design**: Sleek, responsive layout with light pastel color theme
- **Hero Landing Page**: Birthday-themed welcome page with animated elements
- **Family Photo Showcase**: Auto-scrolling photo marquee on the home page
- **Individual Galleries**: Separate photo galleries for Marine and Erwan
- **Dual View Modes**:
  - 📱 **Grid View**: Mobile-optimized, scrollable photo grid
  - 🎬 **Slideshow**: Automated diaporama with touch/swipe support
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Touch-Friendly**: Swipe gestures and mobile-first design
- **Modular Architecture**: Clean, maintainable code structure

## 📁 Project Structure

```
MarineAndErwan/
├── index.html              # Birthday landing page
├── marine.html             # Marine's photo gallery
├── erwan.html              # Erwan's photo gallery
├── README.md               # This file
├── css/
│   ├── main.css           # Shared styles & pastel theme
│   ├── gallery.css        # Gallery/slideshow styles
│   └── index.css          # Landing page specific styles
├── js/
│   ├── gallery.js         # Gallery & slideshow functionality
│   └── navigation.js      # Navigation & utilities
└── assets/
    └── images/
        ├── opening/       # 15 photos for landing page
        ├── marine/        # Marine's photos (expandable)
        └── erwan/         # Erwan's photos (expandable)
```

## 🎨 Color Theme

The website uses a beautiful light pastel color palette:

- **Pastel Pink** (#f7d6e0)
- **Pastel Blue** (#b8e0ea)
- **Pastel Lavender** (#e6e6fa)
- **Pastel Mint** (#d6f5e6)
- **Pastel Peach** (#ffe5d0)
- **Pastel Yellow** (#fff7d6)
- **Pastel Sand** (#f9f6f2) - Background

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for best experience)

### Installation

1. **Clone or Download** the repository:
   ```bash
   # If using git
   git clone https://github.com/LesPetitsLoups/MarineandErwan.git
   cd MarineAndErwan
   ```

2. **Open the website**:
   - **Option A**: Simply double-click `index.html` to open in your browser
   - **Option B**: Use a local server for best experience:
     ```bash
     # Using Python 3
     python -m http.server 8000

     # Using PHP
     php -S localhost:8000

     # Using Node.js (with http-server installed)
     npx http-server
     ```
   - Then visit `http://localhost:8000` in your browser

## 📸 Adding More Photos

### Current Photo Count:
- **Opening/Landing Page**: 15 photos ✅
- **Marine's Gallery**: 1 photo (ready for 20-30)
- **Erwan's Gallery**: 1 photo (ready for 20-30)

### How to Add Photos:

#### For Marine's Gallery:

1. **Add image files** to `assets/images/marine/` folder
2. **Edit `marine.html`** and add entries to the `marineImages` array:
   ```javascript
   const marineImages = [
       {
           src: 'assets/images/marine/20211002_114329.jpg',
           alt: 'Marine - Special Moment 1',
           caption: 'Marine\'s Special Day'
       },
       {
           src: 'assets/images/marine/your-new-photo.jpg',
           alt: 'Marine - Special Moment 2',
           caption: 'Another beautiful day'
       }
       // Add more photos here...
   ];
   ```

#### For Erwan's Gallery:

1. **Add image files** to `assets/images/erwan/` folder
2. **Edit `erwan.html`** and add entries to the `erwanImages` array:
   ```javascript
   const erwanImages = [
       {
           src: 'assets/images/erwan/IMG_20180824_121320.jpg',
           alt: 'Erwan - Adventure 1',
           caption: 'Erwan\'s Fun Time'
       },
       {
           src: 'assets/images/erwan/your-new-photo.jpg',
           alt: 'Erwan - Adventure 2',
           caption: 'More adventures'
       }
       // Add more photos here...
   ];
   ```

### Image Optimization (Optional)

For better performance, you can optimize images using **Pillow** (Python library):

```bash
# Install Pillow
pip install pillow

# Resize and optimize images (example Python script)
from PIL import Image
import os

def optimize_image(input_path, output_path, max_size=(1200, 1200), quality=85):
    img = Image.open(input_path)
    img.thumbnail(max_size, Image.Resampling.LANCZOS)
    img.save(output_path, optimize=True, quality=quality)

# Usage
optimize_image('original-photo.jpg', 'assets/images/marine/photo.jpg')
```

## 🎬 Gallery Features

### Grid View
- Responsive grid layout
- Hover effects with image zoom
- Click to open lightbox (full-size view)
- Mobile-optimized scrolling

### Slideshow Mode
- Auto-advancing slides (configurable interval)
- Previous/Next navigation buttons
- Thumbnail strip for quick navigation
- Touch/swipe gestures on mobile
- Keyboard controls (← → arrows, spacebar for play/pause)
- Photo counter display

## 🌐 Deploying to GitHub Pages

### Initial Setup:

```bash
# Initialize git repository (if not already done)
cd C:\Users\kevin\Desktop\Claude_code\MarineAndErwan
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial birthday website release"

# Add remote repository
git remote add origin https://github.com/LesPetitsLoups/MarineandErwan.git

# Push to GitHub
git push -u origin main
```

### Enable GitHub Pages:

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select `main` branch
4. Click **Save**
5. Your site will be live at: `https://lespetitsloups.github.io/MarineandErwan/`

### Updating the Website:

```bash
# After making changes
git add .
git commit -m "Add more photos to Marine's gallery"
git push origin main
```

## 📱 Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Customization

### Changing Colors:

Edit `css/main.css` and modify the CSS variables:

```css
:root {
    --pastel-pink: #f7d6e0;
    --pastel-blue: #b8e0ea;
    /* Change these to your preferred colors */
}
```

### Modifying Slideshow Speed:

Edit the gallery initialization in `marine.html` or `erwan.html`:

```javascript
marineGallery = new Gallery('marine-gallery', marineImages, {
    mode: 'grid',
    autoplay: true,
    autoplayInterval: 5000  // Change to desired milliseconds
});
```

### Adding Confetti Effect:

Uncomment the confetti code in `js/navigation.js`:

```javascript
// Around line 200
if (window.location.pathname.includes('index.html')) {
    setTimeout(createConfetti, 1000);  // Uncomment this line
}
```

## 🐛 Troubleshooting

### Photos Not Displaying?

- Check that image paths are correct (case-sensitive on some servers)
- Ensure photos are in the correct folders
- Check browser console for errors (F12)

### Slideshow Not Working?

- Make sure JavaScript is enabled
- Check that `gallery.js` is loading correctly
- Ensure image array has valid photo entries

### Site Not Responsive on Mobile?

- Clear browser cache
- Check viewport meta tag is present
- Test in different mobile browsers

## 📄 License

This is a personal birthday celebration website. All rights reserved.

## ❤️ Credits

Created with love for Marine & Erwan's birthday celebration.

---

**Happy Birthday Marine & Erwan! 🎉🎂🎈**
