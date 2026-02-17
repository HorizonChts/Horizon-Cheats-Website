// Horizon Website - Main JavaScript

// Cursor Glow Effect
function initCursorGlow() {
    const cursorGlow = document.getElementById('cursorGlow');
    if (!cursorGlow || window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let isActive = false;
    let rafId = null;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!isActive) {
            isActive = true;
            animate();
        }
    });

    document.addEventListener('mouseleave', () => {
        isActive = false;
        if (rafId) cancelAnimationFrame(rafId);
    });

    function animate() {
        if (!isActive) return;

        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        cursorGlow.style.left = currentX + 'px';
        cursorGlow.style.top = currentY + 'px';

        rafId = requestAnimationFrame(animate);
    }
}

// Navbar Scroll Effect
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Animated Counter
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

// Testimonials Carousel
function initTestimonials() {
    const carousel = document.getElementById('testimonialsCarousel');
    if (!carousel) return;

    const cards = carousel.querySelectorAll('.testimonial-card');
    const dots = carousel.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    
    let currentIndex = 0;
    let autoPlayInterval;

    function showTestimonial(index) {
        cards.forEach((card, i) => {
            card.classList.remove('active');
            dots[i].classList.remove('active');
        });

        cards[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    function nextTestimonial() {
        const next = (currentIndex + 1) % cards.length;
        showTestimonial(next);
    }

    function prevTestimonial() {
        const prev = (currentIndex - 1 + cards.length) % cards.length;
        showTestimonial(prev);
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
    if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });

    // Auto-play
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextTestimonial, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    startAutoPlay();
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Scroll Reveal Animation
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.section-header, .feature-card, .product-card, .download-card, ' +
        '.timeline-item, .testimonial-card, .faq-item, .contact-card'
    );

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
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

// Button Click Handlers
function initButtonHandlers() {
    // Buy buttons
    document.querySelectorAll('.product-card .btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Redirecting to checkout... (Demo)');
        });
    });

    // Download buttons
    document.querySelectorAll('.btn-download').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Starting download... (Demo)');
        });
    });

    // Discord buttons
    document.querySelectorAll('.btn-discord, a[href="#discord"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (btn.getAttribute('href') === '#') {
                e.preventDefault();
                alert('Joining Discord... (Demo)');
            }
        });
    });

    // Footer links that are placeholders
    document.querySelectorAll('.footer-column a[href="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Coming soon!');
        });
    });
}

// Performance: Pause animations when tab is hidden
function initVisibilityHandler() {
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            document.body.classList.add('paused');
        } else {
            document.body.classList.remove('paused');
        }
    });
}

// Initialize Everything
function init() {
    initCursorGlow();
    initNavbar();
    initAnimatedCounters();
    initTestimonials();
    initFAQ();
    initScrollReveal();
    initSmoothScroll();
    initButtonHandlers();
    initVisibilityHandler();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
