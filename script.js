// SΞNSΞ TRΛVΞL ΛGΞNCY - JavaScript

// ============================================
// CONFIGURATION - Update these URLs after setting up Google Sheets
// ============================================
const FORM_CONFIG = {
    // Replace with your Google Apps Script web app URLs (see SETUP_GUIDE.md)
    waitlistEndpoint: 'https://script.google.com/macros/s/AKfycbxZ84ICems4yphQQCfv_d0F7UhegyyICHwnEUj2Ue3CKlwPP6wTw9ffsFWo2IEFFzaKCQ/exec', // e.g. 'https://script.google.com/macros/s/AKfycb.../exec'
    ambassadorEndpoint: 'https://script.google.com/macros/s/AKfycbxZ84ICems4yphQQCfv_d0F7UhegyyICHwnEUj2Ue3CKlwPP6wTw9ffsFWo2IEFFzaKCQ/exec', // e.g. 'https://script.google.com/macros/s/AKfycb.../exec'
};

document.addEventListener('DOMContentLoaded', function() {
    initHeroSlideshow();
    initMobileNavigation();
    initTripFilters();
    initGalleryFilters();
    initPillarSlider();
    initSmoothScrolling();
    initFormHandling();
    initImageLoading();
    initScrollAnimations();
    initTripCounter();
    initTouchInteractions();
    handlePillarHash();
});

// ============================================
// FORM SUBMISSION (Google Sheets Integration)
// ============================================

async function submitFormData(endpoint, data, formType) {
    // If no endpoint configured, fall back to localStorage backup
    if (!endpoint) {
        console.warn(`No endpoint configured for ${formType}. Saving locally.`);
        saveToLocalBackup(formType, data);
        return { success: true, fallback: true };
    }

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            mode: 'no-cors', // Required for Google Apps Script
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...data,
                formType: formType,
                submittedAt: new Date().toISOString(),
            }),
        });
        // no-cors returns opaque response, so we assume success
        // Also save locally as backup
        saveToLocalBackup(formType, data);
        return { success: true };
    } catch (error) {
        console.error('Form submission error:', error);
        // Save locally as fallback
        saveToLocalBackup(formType, data);
        return { success: true, fallback: true };
    }
}

function saveToLocalBackup(formType, data) {
    try {
        const key = `sense_${formType}_submissions`;
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        existing.push({
            ...data,
            submittedAt: new Date().toISOString(),
        });
        localStorage.setItem(key, JSON.stringify(existing));
    } catch (e) {
        console.warn('localStorage not available:', e);
    }
}

// Utility: export local submissions as CSV (for admin use)
function exportLocalSubmissions(formType) {
    const key = `sense_${formType}_submissions`;
    const data = JSON.parse(localStorage.getItem(key) || '[]');
    if (data.length === 0) {
        console.log('No local submissions found.');
        return;
    }
    const headers = Object.keys(data[0]);
    const csv = [
        headers.join(','),
        ...data.map(row => headers.map(h => `"${(row[h] || '').toString().replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formType}_submissions.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

// ============================================
// TOUCH INTERACTIONS
// ============================================

function initTouchInteractions() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        }, { passive: true });
        btn.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        }, { passive: true });
    });

    document.querySelectorAll('.pillar').forEach(pillar => {
        pillar.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-3px) scale(0.98)';
        }, { passive: true });
        pillar.addEventListener('touchend', function() {
            this.style.transform = 'translateY(-3px) scale(1)';
        }, { passive: true });
    });

    document.querySelectorAll('.trip-card').forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        }, { passive: true });
        card.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        }, { passive: true });
    });

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        }, { passive: true });
        item.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        }, { passive: true });
    });

    document.querySelectorAll('.role-info, .perks-info').forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
            this.style.boxShadow = '0 8px 25px rgba(30, 58, 138, 0.15)';
        }, { passive: true });
        card.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
        }, { passive: true });
    });
}

// ============================================
// HERO SLIDESHOW
// ============================================

function initHeroSlideshow() {
    const heroImages = document.querySelectorAll('.hero-image');
    if (heroImages.length <= 1) return;
    let currentImage = 0;

    setInterval(() => {
        heroImages[currentImage].classList.remove('active');
        currentImage = (currentImage + 1) % heroImages.length;
        heroImages[currentImage].classList.add('active');
    }, 5000);
}

// ============================================
// MOBILE NAVIGATION
// ============================================

function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (!hamburger || !navMenu) return;

    function toggleMenu(e) {
        e.preventDefault();
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    hamburger.addEventListener('click', toggleMenu);

    // Close menu on link click
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// TRIP FILTERS
// ============================================

function initTripFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const tripCards = document.querySelectorAll('.trip-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            tripCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ============================================
// GALLERY FILTERS
// ============================================

function initGalleryFilters() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ============================================
// PILLAR SLIDER
// ============================================

let currentSlide = 0;
const totalSlides = 4;
let autoScrollInterval;
let isAutoScrolling = true;

function startAutoScroll() {
    if (autoScrollInterval) clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(() => {
        if (isAutoScrolling) {
            currentSlide = (currentSlide + 1) % totalSlides;
            updatePillarSlider();
        }
    }, 6000);
}

function pauseAutoScroll() {
    isAutoScrolling = false;
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    }
}

function resumeAutoScroll() {
    isAutoScrolling = true;
    startAutoScroll();
}

function initPillarSlider() {
    const slider = document.querySelector('.pillar-slider');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.pillar-nav-btn.prev');
    const nextBtn = document.querySelector('.pillar-nav-btn.next');
    if (!slider) return;

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updatePillarSlider();
            pauseAutoScroll();
            setTimeout(resumeAutoScroll, 10000);
        });
    });

  if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
            } else {
                currentSlide = totalSlides - 1;
            }
            updatePillarSlider();
            pauseAutoScroll();
            setTimeout(resumeAutoScroll, 10000);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
            } else {
                currentSlide = 0;
            }
            updatePillarSlider();
            pauseAutoScroll();
            setTimeout(resumeAutoScroll, 10000);
        });
    }

    // Touch/swipe support
    let startX = 0;
    let isDragging = false;

    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        slider.style.transition = 'none';
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        const translateX = -currentSlide * 25 - (diff / slider.offsetWidth) * 25;
        slider.style.transform = `translateX(${translateX}%)`;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        slider.style.transition = 'transform 0.3s ease-in-out';

        if (Math.abs(diff) > 80) {
            if (diff > 0 && currentSlide < totalSlides - 1) {
                currentSlide++;
            } else if (diff < 0 && currentSlide > 0) {
                currentSlide--;
            }
            pauseAutoScroll();
            setTimeout(resumeAutoScroll, 10000);
        }
        updatePillarSlider();
        isDragging = false;
    });

    updatePillarSlider();
    startAutoScroll();
}

function scrollToPillar(pillarId) {
    const safetySection = document.getElementById('safety');
    if (!safetySection) return;
    safetySection.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
        const pillarMap = { 'luxury': 0, 'peer-built': 1, 'personalized': 2, 'safety-pillar': 3 };
        if (pillarMap.hasOwnProperty(pillarId)) {
            currentSlide = pillarMap[pillarId];
            updatePillarSlider();
            pauseAutoScroll();
            setTimeout(resumeAutoScroll, 5000);
        }
    }, 800);
}

function updatePillarSlider() {
    const slider = document.querySelector('.pillar-slider');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.pillar-nav-btn.prev');
    const nextBtn = document.querySelector('.pillar-nav-btn.next');
    if (!slider) return;

    slider.style.transform = `translateX(${-currentSlide * 25}%)`;
    dots.forEach((dot, index) => dot.classList.toggle('active', index === currentSlide));
}

function handlePillarHash() {
    const hash = window.location.hash.substring(1);
    const pillarMap = { 'luxury': 0, 'peer-built': 1, 'personalized': 2, 'safety': 3 };
    if (hash && pillarMap.hasOwnProperty(hash)) {
        currentSlide = pillarMap[hash];
        updatePillarSlider();
    }
}

// ============================================
// SMOOTH SCROLLING
// ============================================

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });
}

// ============================================
// FORM HANDLING (with Google Sheets submission)
// ============================================

function initFormHandling() {
    // Waitlist form
    const waitlistForm = document.getElementById('waitlist-form');
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            if (!validateForm(this)) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;

            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            const result = await submitFormData(FORM_CONFIG.waitlistEndpoint, data, 'waitlist');

            if (result.success) {
                if (result.fallback) {
                    showNotification(
                        'Thank you! You\'ve been added to our waitlist. We\'ll be in touch soon!',
                        'success'
                    );
                } else {
                    showNotification(
                        'Thank you! You\'ve been added to our waitlist. We\'ll be in touch soon!',
                        'success'
                    );
                }
                this.reset();
            } else {
                showNotification('Something went wrong. Please try again.', 'error');
            }

            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    }

    // Ambassador form
    const ambassadorForm = document.getElementById('ambassador-form');
    if (ambassadorForm) {
        ambassadorForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            if (!validateForm(this)) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;

            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            const result = await submitFormData(FORM_CONFIG.ambassadorEndpoint, data, 'ambassador');

            if (result.success) {
                showNotification(
                    'Thank you for your application! We\'ll review it and get back to you within 5-7 business days.',
                    'success'
                );
                this.reset();
            } else {
                showNotification('Something went wrong. Please try again.', 'error');
            }

            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    }
}

// ============================================
// FORM VALIDATION
// ============================================

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        // Remove previous error state
        input.classList.remove('input-error');

        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('input-error');
            // Scroll to first error
            if (isValid === false) {
                input.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        // Email validation
        if (input.type === 'email' && input.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value.trim())) {
                isValid = false;
                input.classList.add('input-error');
            }
        }
    });

    return isValid;
}

// ============================================
// NOTIFICATIONS
// ============================================

function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;

    const colors = {
        success: '#148c84',
        error: '#DC2626',
        info: '#44c0c5',
    };

    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
            <span class="notification-text">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: min(90vw, 450px);
        animation: notificationSlideIn 0.4s ease;
        font-size: 0.95rem;
        line-height: 1.5;
    `;

    document.body.appendChild(notification);

    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'notificationSlideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });

    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'notificationSlideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ============================================
// IMAGE LOADING
// ============================================

function initImageLoading() {
    document.querySelectorAll('img').forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() { this.classList.add('loaded'); });
            img.addEventListener('error', function() { this.style.display = 'none'; });
        }
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.trip-card, .gallery-item, .pillar, .safety-feature, .benefit-card, .role-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(20, 140, 132, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
    } else {
        navbar.style.background = 'rgba(20, 140, 132, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ============================================
// GALLERY HOVER EFFECTS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.gallery-overlay');
            if (overlay) overlay.style.transform = 'translateY(0)';
        });
        item.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.gallery-overlay');
            if (overlay) overlay.style.transform = 'translateY(100%)';
        });
    });
});

// ============================================
// TRIP COUNTER
// ============================================

function initTripCounter() {
    const el = document.getElementById('trip-count');
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Currently 0 trips, update this number as trips happen
                el.textContent = '0';
                observer.unobserve(entry.target);
            }
        });
    });
    observer.observe(el);
}

// ============================================
// LAZY LOADING
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============================================
// INJECTED STYLES
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes notificationSlideIn {
        from { transform: translateX(-50%) translateY(-20px); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    @keyframes notificationSlideOut {
        from { transform: translateX(-50%) translateY(0); opacity: 1; }
        to { transform: translateX(-50%) translateY(-20px); opacity: 0; }
    }
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    .notification-icon {
        font-size: 1.2rem;
        font-weight: bold;
        flex-shrink: 0;
    }
    .notification-text {
        flex: 1;
    }
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        opacity: 0.8;
        flex-shrink: 0;
    }
    .notification-close:hover { opacity: 1; }
    .input-error {
        border-color: #DC2626 !important;
        box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15) !important;
    }
    button[disabled] {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;
document.head.appendChild(style);



// Highlight contact section and WhatsApp when navigating to contact
function highlightContact() {
    const contactSection = document.getElementById('contact');
    const whatsappBtn = document.querySelector('.whatsapp-chat');
    
    if (contactSection) {
        contactSection.style.transition = 'box-shadow 0.3s ease';
        contactSection.style.boxShadow = '0 0 0 4px var(--larimar-blue)';
        setTimeout(() => {
            contactSection.style.boxShadow = 'none';
        }, 2000);
    }
    
    if (whatsappBtn) {
        whatsappBtn.classList.add('pulse');
        setTimeout(() => {
            whatsappBtn.classList.remove('pulse');
        }, 3000);
    }
}

// Listen for clicks on links that go to #contact
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href="#contact"]');
    if (link) {
        setTimeout(highlightContact, 800);
    }
});
