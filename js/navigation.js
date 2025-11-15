/**
 * Navigation & Shared JavaScript Utilities
 * MarineAndErwan Birthday Website
 */

/**
 * Smooth scroll to section
 */
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Add active class to current navigation item
 */
function highlightActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || href === `./${currentPage}`) {
            link.classList.add('active');
        }
    });
}

/**
 * Create a back-to-home button
 */
function createBackButton() {
    const backBtn = document.createElement('a');
    backBtn.href = 'index.html';
    backBtn.className = 'btn btn-primary back-to-home';
    backBtn.innerHTML = '← Back to Home';
    backBtn.style.position = 'fixed';
    backBtn.style.bottom = '20px';
    backBtn.style.right = '20px';
    backBtn.style.zIndex = '999';

    document.body.appendChild(backBtn);

    // Hide on scroll up, show on scroll down (mobile UX improvement)
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            backBtn.style.opacity = '0.7';
        } else {
            backBtn.style.opacity = '1';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });
}

/**
 * Lazy load images for performance
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

/**
 * Animate elements on scroll (fade in on view)
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in, .scale-in');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'none';
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }
}

/**
 * Mobile menu toggle (if needed)
 */
function initMobileMenu() {
    const nav = document.querySelector('.nav-links');
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'mobile-menu-toggle';
    toggleBtn.innerHTML = '☰';
    toggleBtn.setAttribute('aria-label', 'Toggle menu');

    // Only show on mobile
    toggleBtn.style.display = 'none';

    const navContainer = document.querySelector('.nav-container');
    if (navContainer && window.innerWidth <= 768) {
        toggleBtn.style.display = 'block';
        navContainer.insertBefore(toggleBtn, nav);

        toggleBtn.addEventListener('click', () => {
            nav.classList.toggle('mobile-open');
            toggleBtn.innerHTML = nav.classList.contains('mobile-open') ? '✕' : '☰';
        });
    }
}

/**
 * Photo marquee animation (for index page)
 */
function initPhotoMarquee() {
    const photoTrack = document.querySelector('.photo-track');
    if (!photoTrack) return;

    // Clone photos for infinite scroll effect
    const photos = Array.from(photoTrack.children);
    photos.forEach(photo => {
        const clone = photo.cloneNode(true);
        photoTrack.appendChild(clone);
    });

    // Pause on hover
    photoTrack.addEventListener('mouseenter', () => {
        photoTrack.style.animationPlayState = 'paused';
    });

    photoTrack.addEventListener('mouseleave', () => {
        photoTrack.style.animationPlayState = 'running';
    });
}

/**
 * Add birthday confetti effect (optional)
 */
function createConfetti() {
    const colors = [
        'var(--pastel-pink)',
        'var(--pastel-blue)',
        'var(--pastel-lavender)',
        'var(--pastel-yellow)',
        'var(--pastel-mint)',
        'var(--pastel-coral)'
    ];

    function createConfettiPiece() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.animationDelay = Math.random() * 2 + 's';

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }

    // Create initial confetti
    for (let i = 0; i < 50; i++) {
        setTimeout(createConfettiPiece, i * 100);
    }
}

/**
 * Detect mobile device
 */
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Optimize performance for mobile
 */
function optimizeForMobile() {
    if (isMobile()) {
        // Reduce animation complexity
        document.documentElement.style.setProperty('--transition-normal', '0.2s');

        // Disable hover effects on touch devices
        document.body.classList.add('touch-device');
    }
}

/**
 * Handle page visibility changes (pause animations when tab is hidden)
 */
function handleVisibilityChange() {
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Pause animations
            document.querySelectorAll('.photo-track').forEach(track => {
                track.style.animationPlayState = 'paused';
            });
        } else {
            // Resume animations
            document.querySelectorAll('.photo-track').forEach(track => {
                track.style.animationPlayState = 'running';
            });
        }
    });
}

/**
 * Initialize all navigation and utility functions
 */
function initNavigation() {
    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        highlightActiveNavItem();
        initLazyLoading();
        initScrollAnimations();
        initPhotoMarquee();
        optimizeForMobile();
        handleVisibilityChange();

        // Add back button on gallery pages
        if (window.location.pathname.includes('marine.html') ||
            window.location.pathname.includes('erwan.html')) {
            createBackButton();
        }

        // Add confetti on index page (optional - can be removed)
        if (window.location.pathname.includes('index.html') ||
            window.location.pathname === '/' ||
            window.location.pathname === '') {
            // Uncomment to enable confetti effect:
            // setTimeout(createConfetti, 1000);
        }
    }
}

/**
 * Utility: Format image paths from directory
 */
function getImagesFromFolder(folderPath, fileNames) {
    return fileNames.map((fileName, index) => ({
        src: `${folderPath}/${fileName}`,
        alt: `Photo ${index + 1}`,
        caption: null
    }));
}

/**
 * Load all images from assets folder dynamically
 */
async function loadImageList(directory) {
    // This would typically be done server-side or with a build tool
    // For static sites, images need to be manually listed
    // This is a placeholder function
    console.info('Image loading function - images should be listed manually in HTML/JS');
    return [];
}

// Auto-initialize
initNavigation();

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        smoothScrollTo,
        highlightActiveNavItem,
        createBackButton,
        initLazyLoading,
        initScrollAnimations,
        createConfetti,
        isMobile,
        getImagesFromFolder
    };
}
