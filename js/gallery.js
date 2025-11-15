/**
 * Gallery & Slideshow JavaScript
 * Mobile-optimized photo display with touch support
 */

class Gallery {
    constructor(containerId, images, options = {}) {
        this.container = document.getElementById(containerId);
        this.images = images;
        this.currentIndex = 0;
        this.mode = options.mode || 'grid'; // 'grid' or 'slideshow'
        this.autoplay = options.autoplay || false;
        this.autoplayInterval = options.autoplayInterval || 3000;
        this.autoplayTimer = null;
        this.touchStartX = 0;
        this.touchEndX = 0;

        this.init();
    }

    init() {
        if (!this.container) {
            console.error('Gallery container not found');
            return;
        }

        this.render();
        this.attachEventListeners();

        if (this.mode === 'slideshow' && this.autoplay) {
            this.startAutoplay();
        }
    }

    render() {
        if (this.mode === 'grid') {
            this.renderGrid();
        } else {
            this.renderSlideshow();
        }
    }

    renderGrid() {
        const gridHTML = `
            <div class="gallery-grid">
                ${this.images.map((image, index) => `
                    <div class="gallery-item" data-index="${index}">
                        <img src="${image.src}" alt="${image.alt || `Photo ${index + 1}`}" loading="lazy">
                        ${image.caption ? `
                            <div class="gallery-item-overlay">
                                <p>${image.caption}</p>
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        `;

        this.container.innerHTML = gridHTML;
    }

    renderSlideshow() {
        const slideshowHTML = `
            <div class="slideshow-container">
                <div class="slideshow-counter">
                    <span class="current-slide">1</span> / <span class="total-slides">${this.images.length}</span>
                </div>

                <div class="slideshow-slides">
                    ${this.images.map((image, index) => `
                        <div class="slideshow-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
                            <img src="${image.src}" alt="${image.alt || `Photo ${index + 1}`}" loading="${index === 0 ? 'eager' : 'lazy'}">
                        </div>
                    `).join('')}
                </div>

                <button class="slideshow-nav prev" aria-label="Previous photo">&lsaquo;</button>
                <button class="slideshow-nav next" aria-label="Next photo">&rsaquo;</button>

                ${this.images.some(img => img.caption) ? `
                    <div class="slideshow-caption">
                        <p>${this.images[0].caption || ''}</p>
                    </div>
                ` : ''}
            </div>

            <div class="slideshow-thumbnails">
                ${this.images.map((image, index) => `
                    <div class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
                        <img src="${image.src}" alt="Thumbnail ${index + 1}" loading="lazy">
                    </div>
                `).join('')}
            </div>

            <div class="autoplay-controls">
                <button class="play-pause-btn">${this.autoplay ? '⏸ Pause' : '▶ Play'}</button>
            </div>
        `;

        this.container.innerHTML = slideshowHTML;
    }

    attachEventListeners() {
        if (this.mode === 'grid') {
            this.attachGridListeners();
        } else {
            this.attachSlideshowListeners();
        }
    }

    attachGridListeners() {
        const items = this.container.querySelectorAll('.gallery-item');
        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.openLightbox(index);
            });
        });
    }

    attachSlideshowListeners() {
        // Navigation buttons
        const prevBtn = this.container.querySelector('.slideshow-nav.prev');
        const nextBtn = this.container.querySelector('.slideshow-nav.next');

        if (prevBtn) prevBtn.addEventListener('click', () => this.previousSlide());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());

        // Thumbnail clicks
        const thumbnails = this.container.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => this.goToSlide(index));
        });

        // Play/Pause button
        const playPauseBtn = this.container.querySelector('.play-pause-btn');
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => this.toggleAutoplay());
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
            if (e.key === ' ') {
                e.preventDefault();
                this.toggleAutoplay();
            }
        });

        // Touch/Swipe support
        const slideshowContainer = this.container.querySelector('.slideshow-container');
        if (slideshowContainer) {
            slideshowContainer.addEventListener('touchstart', (e) => {
                this.touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            slideshowContainer.addEventListener('touchend', (e) => {
                this.touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
            }, { passive: true });
        }
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.previousSlide();
            }
        }
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateSlideshow();
    }

    previousSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateSlideshow();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlideshow();

        if (this.autoplay) {
            this.resetAutoplay();
        }
    }

    updateSlideshow() {
        // Update slides
        const slides = this.container.querySelectorAll('.slideshow-slide');
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentIndex);
        });

        // Update thumbnails
        const thumbnails = this.container.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === this.currentIndex);
        });

        // Update counter
        const currentSlideEl = this.container.querySelector('.current-slide');
        if (currentSlideEl) {
            currentSlideEl.textContent = this.currentIndex + 1;
        }

        // Update caption if exists
        const captionEl = this.container.querySelector('.slideshow-caption p');
        if (captionEl && this.images[this.currentIndex].caption) {
            captionEl.textContent = this.images[this.currentIndex].caption;
        }

        // Scroll thumbnail into view
        if (thumbnails[this.currentIndex]) {
            thumbnails[this.currentIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }

    startAutoplay() {
        this.autoplay = true;
        this.autoplayTimer = setInterval(() => {
            this.nextSlide();
        }, this.autoplayInterval);

        this.updatePlayPauseButton();
    }

    stopAutoplay() {
        this.autoplay = false;
        if (this.autoplayTimer) {
            clearInterval(this.autoplayTimer);
            this.autoplayTimer = null;
        }

        this.updatePlayPauseButton();
    }

    resetAutoplay() {
        this.stopAutoplay();
        this.startAutoplay();
    }

    toggleAutoplay() {
        if (this.autoplay) {
            this.stopAutoplay();
        } else {
            this.startAutoplay();
        }
    }

    updatePlayPauseButton() {
        const btn = this.container.querySelector('.play-pause-btn');
        if (btn) {
            btn.textContent = this.autoplay ? '⏸ Pause' : '▶ Play';
        }
    }

    switchMode(newMode) {
        this.mode = newMode;
        this.stopAutoplay();
        this.render();
        this.attachEventListeners();
    }

    openLightbox(index) {
        // Create lightbox modal
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox active';
        lightbox.innerHTML = `
            <button class="lightbox-close" aria-label="Close">&times;</button>
            <img src="${this.images[index].src}" alt="${this.images[index].alt || `Photo ${index + 1}`}">
        `;

        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        // Close on click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                this.closeLightbox(lightbox);
            }
        });

        // Close on escape key
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                this.closeLightbox(lightbox);
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }

    closeLightbox(lightbox) {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.remove();
            document.body.style.overflow = '';
        }, 300);
    }

    destroy() {
        this.stopAutoplay();
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

/**
 * Utility function to load images from a directory
 */
function loadImagesFromDirectory(directory, count, options = {}) {
    const images = [];
    const prefix = options.prefix || '';
    const extension = options.extension || 'jpg';

    for (let i = 1; i <= count; i++) {
        images.push({
            src: `${directory}/${prefix}${i}.${extension}`,
            alt: options.alt ? `${options.alt} ${i}` : `Photo ${i}`,
            caption: options.captions ? options.captions[i - 1] : null
        });
    }

    return images;
}

/**
 * Create gallery controls for switching modes
 */
function createGalleryControls(galleryInstance, containerId) {
    const controlsHTML = `
        <div class="gallery-controls">
            <button class="control-btn" data-mode="grid">Grid View</button>
            <button class="control-btn" data-mode="slideshow">Slideshow</button>
        </div>
    `;

    const container = document.getElementById(containerId);
    if (container) {
        container.insertAdjacentHTML('beforebegin', controlsHTML);

        const buttons = document.querySelectorAll(`#${containerId}`).parentElement.querySelectorAll('.control-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const mode = btn.getAttribute('data-mode');
                galleryInstance.switchMode(mode);

                // Update active state
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });

            // Set initial active state
            if (btn.getAttribute('data-mode') === galleryInstance.mode) {
                btn.classList.add('active');
            }
        });
    }
}

// Export for use in HTML pages
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Gallery, loadImagesFromDirectory, createGalleryControls };
}
