/**
 * Family Uploads Gallery JavaScript
 * Manages the display of user-uploaded photos from family_uploads directory
 */

// Configuration
const FAMILY_UPLOADS_CONFIG = {
    imagesPath: 'assets/images/family_uploads/',
    manifestFile: 'assets/images/family_uploads/manifest.json',
    containerElementId: 'family-uploads-container',
    statsElementId: 'upload-stats',
    enableLightbox: true
};

/**
 * Photo manifest structure:
 * {
 *   "photos": [
 *     {
 *       "filename": "photo1.jpg",
 *       "contributor": "Aunt Sophie",
 *       "description": "Marine's 5th birthday party",
 *       "date": "Summer 2023",
 *       "uploadDate": "2025-01-15"
 *     }
 *   ]
 * }
 */

class FamilyUploadsGallery {
    constructor(config) {
        this.config = config;
        this.photos = [];
        this.container = null;
        this.statsElement = null;
    }

    /**
     * Initialize the gallery
     */
    async init() {
        this.container = document.getElementById(this.config.containerElementId);
        this.statsElement = document.getElementById(this.config.statsElementId);

        if (!this.container) {
            console.error('Family uploads container not found');
            return;
        }

        // Load photos from manifest
        await this.loadPhotos();

        // Render gallery
        this.render();
    }

    /**
     * Load photos from manifest.json
     */
    async loadPhotos() {
        try {
            const response = await fetch(this.config.manifestFile);

            if (!response.ok) {
                // Manifest doesn't exist yet - no photos uploaded
                console.info('No manifest file found - gallery is empty');
                this.photos = [];
                return;
            }

            const data = await response.json();
            this.photos = data.photos || [];

            console.info(`Loaded ${this.photos.length} family photos`);
        } catch (error) {
            console.info('Could not load photos manifest:', error.message);
            this.photos = [];
        }
    }

    /**
     * Render the gallery
     */
    render() {
        if (!this.photos || this.photos.length === 0) {
            this.renderEmptyState();
            return;
        }

        this.renderGallery();
        this.updateStats();
    }

    /**
     * Render empty state (no photos yet)
     */
    renderEmptyState() {
        // Empty state is already in HTML, just ensure stats are hidden
        if (this.statsElement) {
            this.statsElement.style.display = 'none';
        }
    }

    /**
     * Render photo gallery
     */
    renderGallery() {
        const gridHTML = `
            <div class="family-uploads-grid">
                ${this.photos.map(photo => this.createPhotoCard(photo)).join('')}
            </div>
        `;

        this.container.innerHTML = gridHTML;

        // Attach click handlers for lightbox
        if (this.config.enableLightbox) {
            this.attachLightboxHandlers();
        }
    }

    /**
     * Create individual photo card HTML
     */
    createPhotoCard(photo) {
        const imagePath = `${this.config.imagesPath}${photo.filename}`;
        const contributor = this.escapeHtml(photo.contributor || 'Anonymous');
        const description = this.escapeHtml(photo.description || 'A special family moment');
        const date = this.escapeHtml(photo.date || '');

        return `
            <div class="family-upload-card" data-image="${imagePath}">
                <img src="${imagePath}"
                     alt="${description}"
                     class="family-upload-image"
                     loading="lazy">
                <div class="family-upload-info">
                    <div class="family-upload-contributor">
                        <span class="contributor-icon">👤</span>
                        <span>${contributor}</span>
                    </div>
                    <p class="family-upload-description">${description}</p>
                    ${date ? `<p class="family-upload-date">${date}</p>` : ''}
                </div>
            </div>
        `;
    }

    /**
     * Update statistics
     */
    updateStats() {
        if (!this.statsElement) return;

        const totalPhotos = this.photos.length;
        const contributors = new Set(this.photos.map(p => p.contributor)).size;

        document.getElementById('total-uploads').textContent = totalPhotos;
        document.getElementById('total-contributors').textContent = contributors;

        this.statsElement.style.display = 'flex';
    }

    /**
     * Attach lightbox click handlers
     */
    attachLightboxHandlers() {
        const cards = this.container.querySelectorAll('.family-upload-card');

        cards.forEach((card, index) => {
            card.addEventListener('click', () => {
                this.openLightbox(index);
            });
        });
    }

    /**
     * Open lightbox for photo viewing
     */
    openLightbox(index) {
        const photo = this.photos[index];
        const imagePath = `${this.config.imagesPath}${photo.filename}`;

        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox active';
        lightbox.innerHTML = `
            <button class="lightbox-close" aria-label="Close">&times;</button>
            <img src="${imagePath}" alt="${this.escapeHtml(photo.description || 'Family photo')}">
            <div class="lightbox-info" style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); background: rgba(255,255,255,0.95); padding: 1rem 2rem; border-radius: 12px; text-align: center; max-width: 90%;">
                <p style="margin: 0; font-weight: 600; color: var(--text-dark);">Shared by ${this.escapeHtml(photo.contributor || 'Anonymous')}</p>
                <p style="margin: 0.5rem 0 0; color: var(--text-light); font-size: 0.9rem;">${this.escapeHtml(photo.description || '')}</p>
            </div>
        `;

        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        // Close handlers
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                this.closeLightbox(lightbox);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeLightbox(lightbox);
            }
        });
    }

    /**
     * Close lightbox
     */
    closeLightbox(lightbox) {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.remove();
            document.body.style.overflow = '';
        }, 300);
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}

// Initialize gallery when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const gallery = new FamilyUploadsGallery(FAMILY_UPLOADS_CONFIG);
    gallery.init();
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FamilyUploadsGallery, FAMILY_UPLOADS_CONFIG };
}
