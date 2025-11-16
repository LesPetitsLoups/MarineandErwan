#!/usr/bin/env python3
"""
Quick Batch Photo Processor for Marine & Erwan Website
Usage:
1. Download all email attachments to a folder
2. Organize photos into subfolders: marine/, erwan/, or both/
3. Run this script to auto-update HTML files and commit to git
"""

import os
import re
import subprocess
from pathlib import Path
from datetime import datetime

# Configuration
REPO_PATH = Path('C:/Users/kevin/Desktop/Claude_code/MarineAndErwan')
MARINE_HTML = REPO_PATH / 'marine.html'
ERWAN_HTML = REPO_PATH / 'erwan.html'
PARTY_HTML = REPO_PATH / 'party.html'
MARINE_ASSETS = REPO_PATH / 'assets/images/marine'
ERWAN_ASSETS = REPO_PATH / 'assets/images/erwan'
PARTY_ASSETS = REPO_PATH / 'assets/images/The_Party!'

# Temporary processing folder (create this manually)
PROCESSING_FOLDER = REPO_PATH / 'photo_inbox'

def find_image_array_section(html_content, person_name):
    """Find the JavaScript array section in HTML"""
    pattern = rf"const {person_name}Images = \[(.*?)\];"
    match = re.search(pattern, html_content, re.DOTALL)
    if match:
        return match.group(0), match.start(), match.end()
    return None, None, None

def create_photo_entry(filename, person_name):
    """Create a JavaScript object entry for a photo"""
    return f"""            {{
                src: 'assets/images/{person_name.lower()}/{filename}',
                alt: '{person_name}',
                caption: ''
            }}"""

def get_existing_photos(html_content, person_name):
    """Extract existing photo filenames from HTML"""
    existing = []
    pattern = rf"src: 'assets/images/{person_name.lower()}/(.*?)'"
    matches = re.findall(pattern, html_content)
    return set(matches)

def update_html_with_photos(html_path, person_name, new_photos):
    """Update HTML file with new photos"""

    # Read current HTML
    with open(html_path, 'r', encoding='utf-8') as f:
        html_content = f.read()

    # Get existing photos to avoid duplicates
    existing_photos = get_existing_photos(html_content, person_name)

    # Filter out duplicates
    new_unique_photos = [p for p in new_photos if p not in existing_photos]

    if not new_unique_photos:
        print(f"   ⏭️  No new photos for {person_name} (all already exist)")
        return 0

    # Find the image array
    array_section, start_pos, end_pos = find_image_array_section(html_content, person_name.lower())

    if not array_section:
        print(f"   ❌ Could not find {person_name}Images array in HTML")
        return 0

    # Extract existing entries
    existing_entries = re.findall(r'\{[^}]+\}', array_section)

    # Create new entries
    new_entries = [create_photo_entry(photo, person_name) for photo in new_unique_photos]

    # Combine all entries
    all_entries = existing_entries + new_entries
    entries_text = ',\n'.join(all_entries)

    # Build new array
    new_array = f"const {person_name.lower()}Images = [\n{entries_text}\n        ];"

    # Replace in HTML
    new_html = html_content[:start_pos] + new_array + html_content[end_pos:]

    # Write back
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(new_html)

    print(f"   ✅ Added {len(new_unique_photos)} new photo(s) to {person_name}")
    return len(new_unique_photos)

def copy_photos_to_assets(source_folder, target_folder):
    """Copy photos from source to assets folder"""
    copied = []

    if not source_folder.exists():
        return copied

    valid_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.webp'}

    for file in source_folder.iterdir():
        if file.is_file() and file.suffix.lower() in valid_extensions:
            target_path = target_folder / file.name

            # Skip if already exists
            if target_path.exists():
                print(f"   ⏭️  Skipping {file.name} (already exists)")
                continue

            # Copy file
            import shutil
            shutil.copy2(file, target_path)
            copied.append(file.name)
            print(f"   📁 Copied {file.name}")

    return copied

def git_commit_and_push(added_count):
    """Commit and push changes to GitHub"""
    try:
        os.chdir(REPO_PATH)

        # Git add
        subprocess.run(['git', 'add', 'assets/images/'], check=True)
        subprocess.run(['git', 'add', 'marine.html', 'erwan.html', 'party.html'], check=True)

        # Git commit
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M')
        commit_msg = f"Batch upload: {added_count} photo(s) - {timestamp}"
        subprocess.run(['git', 'commit', '-m', commit_msg], check=True)

        # Git push
        subprocess.run(['git', 'push'], check=True)

        print(f"\n✅ Successfully committed and pushed {added_count} photo(s) to GitHub")
        print(f"🌐 Site will refresh at marineeterwan.com in ~2 minutes")
        return True

    except subprocess.CalledProcessError as e:
        print(f"\n❌ Git error: {e}")
        print("⚠️  Photos are copied but not pushed to GitHub")
        return False

def main():
    """Main processing function"""
    print("🚀 Marine & Erwan Batch Photo Processor\n")
    print(f"📂 Repository: {REPO_PATH}")
    print(f"📥 Processing folder: {PROCESSING_FOLDER}\n")

    # Create processing folder if it doesn't exist
    PROCESSING_FOLDER.mkdir(exist_ok=True)
    (PROCESSING_FOLDER / 'marine').mkdir(exist_ok=True)
    (PROCESSING_FOLDER / 'erwan').mkdir(exist_ok=True)
    (PROCESSING_FOLDER / 'party').mkdir(exist_ok=True)
    (PROCESSING_FOLDER / 'both').mkdir(exist_ok=True)

    total_added = 0

    # Process Marine photos
    print("👧 Processing Marine photos...")
    marine_photos = copy_photos_to_assets(
        PROCESSING_FOLDER / 'marine',
        MARINE_ASSETS
    )
    marine_added = update_html_with_photos(MARINE_HTML, 'Marine', marine_photos)
    total_added += marine_added

    # Process Erwan photos
    print("\n👦 Processing Erwan photos...")
    erwan_photos = copy_photos_to_assets(
        PROCESSING_FOLDER / 'erwan',
        ERWAN_ASSETS
    )
    erwan_added = update_html_with_photos(ERWAN_HTML, 'Erwan', erwan_photos)
    total_added += erwan_added

    # Process Party photos
    print("\n🎉 Processing The Party! photos...")
    party_photos = copy_photos_to_assets(
        PROCESSING_FOLDER / 'party',
        PARTY_ASSETS
    )
    party_added = update_html_with_photos(PARTY_HTML, 'party', party_photos)
    total_added += party_added

    # Process "Both" photos (add to both galleries)
    print("\n👧👦 Processing shared photos (both)...")
    both_marine = copy_photos_to_assets(
        PROCESSING_FOLDER / 'both',
        MARINE_ASSETS
    )
    both_erwan = copy_photos_to_assets(
        PROCESSING_FOLDER / 'both',
        ERWAN_ASSETS
    )
    both_marine_added = update_html_with_photos(MARINE_HTML, 'Marine', both_marine)
    both_erwan_added = update_html_with_photos(ERWAN_HTML, 'Erwan', both_erwan)
    total_added += both_marine_added + both_erwan_added

    # Summary
    print("\n" + "="*60)
    print(f"📊 SUMMARY")
    print("="*60)
    print(f"Marine:     +{marine_added + both_marine_added} photos")
    print(f"Erwan:      +{erwan_added + both_erwan_added} photos")
    print(f"The Party!: +{party_added} photos")
    print(f"Total:      {total_added} photos processed")
    print("="*60)

    if total_added > 0:
        print("\n🤔 Commit and push to GitHub? (yes/no)")
        response = input("> ").strip().lower()

        if response in ['yes', 'y', 'oui', 'o']:
            git_commit_and_push(total_added)
        else:
            print("⏸️  Skipped git push. Run 'git push' manually when ready.")
    else:
        print("\n✨ No new photos to process!")

    print("\n" + "="*60)
    print("📝 INSTRUCTIONS FOR NEXT BATCH:")
    print("="*60)
    print(f"1. Download email attachments")
    print(f"2. Organize into folders:")
    print(f"   - {PROCESSING_FOLDER / 'marine'}  (photos for Marine)")
    print(f"   - {PROCESSING_FOLDER / 'erwan'}   (photos for Erwan)")
    print(f"   - {PROCESSING_FOLDER / 'party'}   (photos for The Party!)")
    print(f"   - {PROCESSING_FOLDER / 'both'}    (photos for both M&E)")
    print(f"3. Run this script again")
    print("="*60)

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⏹️  Process interrupted by user")
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}")
        import traceback
        traceback.print_exc()
