// SΞNSΞ TRΛVΞL ΛGΞNCY - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
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
    
    // Handle pillar hash on page load
    handlePillarHash();
});

// Add touch-friendly interactions to all interactive elements
function initTouchInteractions() {
    // Buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        btn.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Pillar cards
    document.querySelectorAll('.pillar').forEach(pillar => {
        pillar.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-3px) scale(0.98)';
        });
        
        pillar.addEventListener('touchend', function() {
            this.style.transform = 'translateY(-3px) scale(1)';
        });
    });
    
    // Trip cards
    document.querySelectorAll('.trip-card').forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        item.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Form inputs
    document.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Ambassador section specific interactions
    document.querySelectorAll('.ambassador-cta .btn').forEach(btn => {
        btn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        btn.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Role and perks info cards
    document.querySelectorAll('.role-info, .perks-info').forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
            this.style.boxShadow = '0 8px 25px rgba(30, 58, 138, 0.15)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'var(--shadow)';
        });
    });
}

// Hero Image Slideshow
function initHeroSlideshow() {
    const heroImages = document.querySelectorAll('.hero-image');
    let currentImage = 0;
    
    function nextImage() {
        heroImages[currentImage].classList.remove('active');
        currentImage = (currentImage + 1) % heroImages.length;
        heroImages[currentImage].classList.add('active');
    }
    
    // Change image every 5 seconds
    setInterval(nextImage, 5000);
}

// Mobile Navigation
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    console.log('Mobile Navigation Init:', { hamburger: !!hamburger, navMenu: !!navMenu });
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Hamburger clicked');
            
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            console.log('Menu active:', navMenu.classList.contains('active'));
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
        
        // Add touch event for mobile
        hamburger.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Hamburger touched');
            
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            console.log('Menu active:', navMenu.classList.contains('active'));
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
            
            // Add touch feedback
            link.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            link.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Trip Filters
function initTripFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const tripCards = document.querySelectorAll('.trip-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter trip cards
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

// Gallery Category Filters
function initGalleryFilters() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
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

// Pillar Slider Navigation
let currentSlide = 0;
const totalSlides = 4;
let autoScrollInterval;
let isAutoScrolling = true;

// Auto-scroll functionality (global)
function startAutoScroll() {
    if (autoScrollInterval) clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(() => {
        if (isAutoScrolling) {
            currentSlide = (currentSlide + 1) % totalSlides;
            updatePillarSlider();
        }
    }, 6000); // 6 seconds
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
    
    // Update slider position
    function updateSlider() {
        updatePillarSlider();
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
            pauseAutoScroll();
            setTimeout(resumeAutoScroll, 10000); // Resume after 10 seconds
        });
    });
    
    // Arrow navigation
    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
            pauseAutoScroll();
            setTimeout(resumeAutoScroll, 10000); // Resume after 10 seconds
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlider();
            pauseAutoScroll();
            setTimeout(resumeAutoScroll, 10000); // Resume after 10 seconds
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentSlide > 0) {
            currentSlide--;
            updateSlider();
            pauseAutoScroll();
            setTimeout(resumeAutoScroll, 10000); // Resume after 10 seconds
        } else if (e.key === 'ArrowRight' && currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlider();
            pauseAutoScroll();
            setTimeout(resumeAutoScroll, 10000); // Resume after 10 seconds
        }
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    let isDragging = false;
    
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        slider.style.transition = 'none';
    });
    
    slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        const translateX = -currentSlide * 25 - (diff / slider.offsetWidth) * 25;
        
        slider.style.transform = `translateX(${translateX}%)`;
    });
    
    slider.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        slider.style.transition = 'transform 0.3s ease-in-out';
        
        if (Math.abs(diff) > 80) { // Minimum swipe distance
            if (diff > 0 && currentSlide < totalSlides - 1) {
                // Swipe left
                currentSlide++;
                updateSlider();
                pauseAutoScroll();
                setTimeout(resumeAutoScroll, 10000); // Resume after 10 seconds
            } else if (diff < 0 && currentSlide > 0) {
                // Swipe right
                currentSlide--;
                updateSlider();
                pauseAutoScroll();
                setTimeout(resumeAutoScroll, 10000); // Resume after 10 seconds
            } else {
                // Reset to current position
                updateSlider();
            }
        } else {
            // Reset to current position
            updateSlider();
        }
        
        isDragging = false;
    });
    
    // Add touch feedback to navigation buttons
    [prevBtn, nextBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-50%) scale(0.95)';
            });
            
            btn.addEventListener('touchend', function() {
                this.style.transform = 'translateY(-50%) scale(1)';
            });
        }
    });
    
    // Add touch feedback to dots
    dots.forEach(dot => {
        dot.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.9)';
        });
        
        dot.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Initialize
    updateSlider();
    startAutoScroll();
}

// Scroll to pillar function
function scrollToPillar(pillarId) {
    const safetySection = document.getElementById('safety');
    if (!safetySection) return;
    
    // Smooth scroll to safety section
    safetySection.scrollIntoView({ behavior: 'smooth' });
    
    // Set the correct slide after scrolling
    setTimeout(() => {
        const pillarMap = {
            'luxury': 0,
            'peer-built': 1,
            'personalized': 2,
            'safety-pillar': 3
        };
        
        if (pillarMap.hasOwnProperty(pillarId)) {
            currentSlide = pillarMap[pillarId];
            updatePillarSlider();
            // Pause auto-scroll when navigating from other sections
            pauseAutoScroll();
            // Resume after 5 seconds
            setTimeout(resumeAutoScroll, 5000);
        }
    }, 800); // Wait for scroll to complete
}

// Update pillar slider function
function updatePillarSlider() {
    const slider = document.querySelector('.pillar-slider');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.pillar-nav-btn.prev');
    const nextBtn = document.querySelector('.pillar-nav-btn.next');
    
    if (!slider) return;
    
    const translateX = -currentSlide * 25;
    slider.style.transform = `translateX(${translateX}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    
    // Update navigation buttons
    if (prevBtn && nextBtn) {
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;
    }
}

// Handle URL hash for direct pillar access
function handlePillarHash() {
    const hash = window.location.hash.substring(1);
    const pillarMap = {
        'luxury': 0,
        'peer-built': 1,
        'personalized': 2,
        'safety': 3
    };
    
    if (hash && pillarMap.hasOwnProperty(hash)) {
        currentSlide = pillarMap[hash];
        updatePillarSlider();
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Handling
function initFormHandling() {
    const waitlistForm = document.getElementById('waitlist-form');
    
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show success message (in a real app, this would send to a server)
            showNotification('Thank you! You\'ve been added to our waitlist. We\'ll be in touch soon!', 'success');
            
            // Reset form
            this.reset();
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Image Loading
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
            
            img.addEventListener('error', function() {
                this.style.display = 'none';
            });
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.trip-card, .gallery-item, .pillar, .safety-feature');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(240, 249, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(240, 249, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Gallery hover effects
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.gallery-overlay').style.transform = 'translateY(0)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.gallery-overlay').style.transform = 'translateY(100%)';
        });
    });
});

// Trip card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const tripCards = document.querySelectorAll('.trip-card');
    
    tripCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 1rem;
        padding: 0;
        line-height: 1;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 100vh;
            background: linear-gradient(135deg, rgba(240, 249, 255, 0.98), rgba(255, 255, 255, 0.95));
            backdrop-filter: blur(15px);
            padding: 6rem 2rem 2rem;
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
            z-index: 1000;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// WhatsApp integration
document.addEventListener('DOMContentLoaded', function() {
    const whatsappButton = document.querySelector('.whatsapp-chat a');
    if (whatsappButton) {
        whatsappButton.addEventListener('click', function(e) {
            // You can add analytics tracking here
            console.log('WhatsApp chat initiated');
        });
    }
});

// Trip Counter
function initTripCounter() {
    const tripCountElement = document.getElementById('trip-count');
    if (tripCountElement) {
        // For now, set to 0. In the future, this could be dynamic
        let currentCount = 0;
        
        // Animate the counter on page load
        const animateCounter = () => {
            const targetCount = 0; // This will be updated when trips are added
            const duration = 2000; // 2 seconds
            const steps = 60;
            const increment = targetCount / steps;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= targetCount) {
                    current = targetCount;
                    clearInterval(timer);
                }
                tripCountElement.textContent = Math.floor(current);
            }, duration / steps);
        };
        
        // Start animation when the element comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(tripCountElement);
    }
}

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#D95E4B';
        } else {
            input.style.borderColor = '';
        }
    });
    
    return isValid;
}

// Add form validation to the waitlist form
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('waitlist-form');
    if (form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        
        submitBtn.addEventListener('click', function(e) {
            if (!validateForm(form)) {
                e.preventDefault();
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    }
    
    // Ambassador form handling
    const ambassadorForm = document.getElementById('ambassador-form');
    if (ambassadorForm) {
        ambassadorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm(this)) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show success message
            showNotification('Thank you for your application! We\'ll review it and get back to you within 5-7 business days.', 'success');
            
            // Reset form
            this.reset();
        });
    }
}); 