/* ============================================
   COACH SUBHAM - JavaScript
   Animations, Interactions & Dynamic Features
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initPreloader();
    initNavigation();
    initScrollAnimations();
    initCounterAnimation();
    initFormHandler();
    initGalleryNavigation();
    initBlogCards();
    initHeroTilt();
    initSmoothScroll();
});

/* ============================================
   PRELOADER
   ============================================ */
function initPreloader() {
    const preloader = document.getElementById('preloader');

    window.addEventListener('load', function () {
        setTimeout(function () {
            preloader.classList.add('hidden');
            // Enable body scroll after preloader
            document.body.style.overflow = 'visible';
            // Trigger hero animations
            animateHeroElements();
        }, 800);
    });
}

function animateHeroElements() {
    const heroElements = document.querySelectorAll('.hero [data-animate]');
    heroElements.forEach((el, index) => {
        const delay = el.dataset.delay || index * 100;
        setTimeout(() => {
            el.classList.add('animated');
        }, delay);
    });
}

/* ============================================
   NAVIGATION
   ============================================ */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        // Don't observe hero elements (they animate on page load)
        if (!el.closest('.hero')) {
            observer.observe(el);
        }
    });
}

/* ============================================
   COUNTER ANIMATION
   ============================================ */
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   FORM HANDLER
   ============================================ */
function initFormHandler() {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Show success message (you can integrate with your backend)
            showFormSuccess();

            // Reset form
            form.reset();
        });
    }
}

function showFormSuccess() {
    const btn = document.querySelector('.contact-form .btn');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<span>✓ Message Sent!</span>';
    btn.style.background = '#22c55e';

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
    }, 3000);
}

/* ============================================
   TYPING EFFECT (Optional Enhancement)
   ============================================ */
function initTypingEffect() {
    const element = document.querySelector('.typing-text');
    if (!element) return;

    const texts = ['Fat Loss', 'Fitness Boxing', 'Strength Training'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let delay = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            delay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            delay = 500;
        }

        setTimeout(type, delay);
    }

    type();
}

/* ============================================
   PARALLAX EFFECT (Optional Enhancement)
   ============================================ */
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    window.addEventListener('scroll', () => {
        parallaxElements.forEach(el => {
            const speed = el.dataset.parallax || 0.5;
            const yPos = -(window.scrollY * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
}

/* ============================================
   SERVICE CARDS TILT EFFECT
   ============================================ */
function initTiltEffect() {
    const cards = document.querySelectorAll('.service-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Initialize tilt effect after page load
window.addEventListener('load', initTiltEffect);

/* ============================================
   MAGNETIC BUTTON EFFECT
   ============================================ */
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// Initialize magnetic effect
window.addEventListener('load', initMagneticButtons);

/* ============================================
   CURSOR GLOW EFFECT (Optional)
   ============================================ */
function initCursorGlow() {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(255, 77, 77, 0.1) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 0;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
}

// Only enable on larger screens
if (window.innerWidth > 1024) {
    initCursorGlow();
}

/* ============================================
   GALLERY NAVIGATION
   ============================================ */
function initGalleryNavigation() {
    const galleryGrid = document.getElementById('galleryGrid');
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');

    if (!galleryGrid || !prevBtn || !nextBtn) return;

    const scrollAmount = 340; // Approx item width + gap

    prevBtn.addEventListener('click', () => {
        galleryGrid.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', () => {
        galleryGrid.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Handle button visibility based on scroll position
    const handleScroll = () => {
        const isStart = galleryGrid.scrollLeft <= 10;
        // Check if scrolled to end (allow 10px buffer)
        const isEnd = galleryGrid.scrollLeft + galleryGrid.clientWidth >= galleryGrid.scrollWidth - 10;

        prevBtn.style.opacity = isStart ? '0.3' : '1';
        prevBtn.style.pointerEvents = isStart ? 'none' : 'auto';

        nextBtn.style.opacity = isEnd ? '0.3' : '1';
        nextBtn.style.pointerEvents = isEnd ? 'none' : 'auto';
    };

    galleryGrid.addEventListener('scroll', handleScroll);
    // Initial check
    setTimeout(handleScroll, 100);
}

/* ============================================
   BLOG CARD INTERACTION
   ============================================ */
function initBlogCards() {
    const blogCards = document.querySelectorAll('.blog-card');

    blogCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function (e) {
            // Prevent redirection if clicking on a specific link inside the card (optional safety)
            // But main requirement is whole card redirects
            window.location.href = 'blog.html';
        });
    });
}

/* ============================================
   HERO IMAGE TILT EFFECT
   ============================================ */
function initHeroTilt() {
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-img-3d');

    if (!heroSection || !heroImage) return;

    heroSection.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        // Calculate percentage position from center
        const xPos = (clientX / innerWidth - 0.5) * 2; // -1 to 1
        const yPos = (clientY / innerHeight - 0.5) * 2; // -1 to 1

        // Tilt intensity
        const tiltIntensity = 15;

        // Calculate rotation
        const rotateY = xPos * tiltIntensity;
        const rotateX = -yPos * tiltIntensity;

        heroImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    // Reset on mouse leave
    heroSection.addEventListener('mouseleave', () => {
        heroImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
}
