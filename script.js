// ===================================
// Horizon Website - Main JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Add animation styles first
    addAnimationStyles();
    
    // Initialize all components
    initCursorGlow();
    initMobileMenu();
    initSmoothScroll();
    initNavbarScroll();
    initCounterAnimation();
    initFAQAccordion();
    initRevealAnimations();
    initParallaxEffect();
    
    // Initialize new animation effects
    initMagneticButtons();
    
    // Initialize text effects after a short delay
    setTimeout(() => {
        initTextScramble();
        initTypingEffect();
    }, 500);
});

// ===================================
// Cursor Glow Effect - Optimized
// ===================================
function initCursorGlow() {
    const cursorGlow = document.querySelector('.cursor-glow');
    if (!cursorGlow) return;

    // Check for touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
        cursorGlow.style.display = 'none';
        return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;
    let isActive = false;
    let rafId = null;
    let mouseTimeout = null;

    // Throttle mousemove to 60fps max (16ms)
    let lastMouseMove = 0;
    document.addEventListener('mousemove', (e) => {
        const now = performance.now();
        if (now - lastMouseMove < 16) return; // Skip if less than 16ms
        lastMouseMove = now;
        
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!isActive) {
            isActive = true;
            cursorGlow.style.opacity = '1';
            animateGlow();
        }
        
        // Clear existing timeout
        clearTimeout(mouseTimeout);
        // Pause after 100ms of no movement
        mouseTimeout = setTimeout(() => {
            isActive = false;
            cancelAnimationFrame(rafId);
        }, 100);
    }, { passive: true });

    function animateGlow() {
        if (!isActive) return;
        
        // Smooth follow with easing - only update if moved enough
        const dx = mouseX - glowX;
        const dy = mouseY - glowY;
        
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
            glowX += dx * 0.15;
            glowY += dy * 0.15;
            cursorGlow.style.left = `${glowX}px`;
            cursorGlow.style.top = `${glowY}px`;
        }

        rafId = requestAnimationFrame(animateGlow);
    }

    // Pause when tab is hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            isActive = false;
            cancelAnimationFrame(rafId);
        }
    });

    // Hide on mouse leave
    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
        isActive = false;
        cancelAnimationFrame(rafId);
    });

    document.addEventListener('mouseenter', () => {
        cursorGlow.style.opacity = '1';
    });
}

// ===================================
// Mobile Menu
// ===================================
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = menuBtn.querySelectorAll('span');
        menuBtn.classList.toggle('active');
        
        if (menuBtn.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
            const spans = menuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
            const spans = menuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// ===================================
// Smooth Scroll
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// Navbar Scroll Effect
// ===================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const currentScroll = window.scrollY;

                // Add/remove scrolled class
                if (currentScroll > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }

                // Hide/show navbar on scroll direction
                if (currentScroll > lastScroll && currentScroll > 100) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }

                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    });

    // Update active nav link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                let current = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 100;
                    if (scrollY >= sectionTop) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ===================================
// Counter Animation
// ===================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    if (!counters.length) return;

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
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
    };

    // Use Intersection Observer to trigger animation
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

// ===================================
// FAQ Accordion - Enhanced Version
// ===================================
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items with smooth animation
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = null;
                    }
                }
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                // Set actual height for smooth transition
                if (answer) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
                
                // Add click ripple effect
                createRipple(question);
            } else {
                item.classList.remove('active');
                if (answer) {
                    answer.style.maxHeight = null;
                }
            }
        });
        
        // Remove hover effects that could cause lag
        item.addEventListener('mouseenter', () => {
            // Just highlight border, no transform
            item.style.borderColor = 'var(--accent-primary)';
        });
        
        item.addEventListener('mouseleave', () => {
            if (!item.classList.contains('active')) {
                item.style.borderColor = '';
            }
        });
    });
}

// Create ripple effect helper
function createRipple(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        animation: rippleEffect 0.6s ease-out forwards;
    `;
    
    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

// ===================================
// Reveal Animations - Enhanced (Intersection Observer)
// ===================================
function initRevealAnimations() {
    // Support both old and new animation classes
    const revealElements = document.querySelectorAll(
        '.feature-card, .pricing-card, .download-card, .testimonial-card, .showcase-item, .changelog-item, .faq-item'
    );

    if (!revealElements.length) return;

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger delay based on element index
                const delay = Math.min(index * 100, 600);
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) translateX(0) scale(1)';
                    entry.target.classList.add('revealed');
                }, delay);
                
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach((el, index) => {
        // Set initial state
        el.style.opacity = '0';
        
        // Alternate between left/right for visual interest
        if (index % 2 === 0) {
            el.style.transform = 'translateY(40px)';
        } else {
            el.style.transform = 'translateY(30px) translateX(10px)';
        }
        
        el.style.transition = 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
        revealObserver.observe(el);
    });

    // Also handle section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                headerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    sectionHeaders.forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(30px)';
        header.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        headerObserver.observe(header);
    });
}

// ===================================
// Parallax Effect for Hero - Optimized
// ===================================
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const orbs = document.querySelectorAll('.gradient-orb');
    
    if (!hero || !orbs.length) return;

    // Skip on mobile
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let ticking = false;
    let rafId = null;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            rafId = requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                const rate = scrolled * 0.3;

                orbs.forEach((orb, index) => {
                    const speed = (index + 1) * 0.1;
                    orb.style.transform = `translateY(${rate * speed}px)`;
                });

                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ===================================
// Utility Functions
// ===================================

// Magnetic Button Effect - Optimized with throttling
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn:not(.btn-discord)');
    
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    buttons.forEach(button => {
        let rafId = null;
        let isHovering = false;
        
        button.addEventListener('mousemove', (e) => {
            if (!isHovering) return;
            
            // Cancel pending animation
            if (rafId) cancelAnimationFrame(rafId);
            
            rafId = requestAnimationFrame(() => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Subtle magnetic pull (max 8px)
                const maxMove = 8;
                const moveX = (x / rect.width) * maxMove;
                const moveY = (y / rect.height) * maxMove;
                
                button.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        }, { passive: true });
        
        button.addEventListener('mouseenter', () => {
            isHovering = true;
        });
        
        button.addEventListener('mouseleave', () => {
            isHovering = false;
            if (rafId) cancelAnimationFrame(rafId);
            button.style.transform = '';
        });
    });
}

// Text Scramble Effect for Headers
function initTextScramble() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.textContent;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    let iteration = 0;
    const interval = setInterval(() => {
        heroTitle.textContent = originalText
            .split('')
            .map((char, index) => {
                if (index < iteration) {
                    return originalText[index];
                }
                if (char === ' ' || char === '\n') return char;
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
        
        if (iteration >= originalText.length) {
            clearInterval(interval);
        }
        
        iteration += 1/3;
    }, 30);
    
    // Clear after animation completes
    setTimeout(() => {
        clearInterval(interval);
        heroTitle.textContent = originalText;
    }, 2000);
}

// Typing Effect for Status Badges
function initTypingEffect() {
    const badges = document.querySelectorAll('.status-badge span:not(.status-dot)');
    
    badges.forEach((badge, index) => {
        const text = badge.textContent;
        badge.textContent = '';
        badge.style.opacity = '1';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                badge.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 50 + (index * 20));
    });
}

// Add ripple animation keyframes
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(2);
                opacity: 0;
            }
        }
        
        @keyframes countUp {
            0% {
                opacity: 0;
                transform: translateY(20px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(40px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .revealed {
            animation: slideInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
    `;
    document.head.appendChild(style);
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add ripple effect to buttons - Optimized
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Skip if already has ripple
        if (this.querySelector('.ripple')) return;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out forwards;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Loading state handler
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Performance: Pause animations when tab is hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.body.style.animationPlayState = 'paused';
    } else {
        document.body.style.animationPlayState = 'running';
    }
});
