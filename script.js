// ===================================
// Performance Optimized JavaScript
// ===================================

// Throttle function for performance
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

function initNavDropdown() {
    const dropdown = document.querySelector('[data-nav-dropdown-container]');
    const toggle = dropdown?.querySelector('[data-nav-dropdown]');
    const menu = dropdown?.querySelector('.nav-dropdown-menu');
    if (!dropdown || !toggle || !menu) return;

    const closeDropdown = () => dropdown.classList.remove('open');

    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            closeDropdown();
        }
    });
}

function initInfoModals() {
    const modal = document.querySelector('[data-info-modal]');
    const titleEl = document.querySelector('[data-info-title]');
    const bodyEl = document.querySelector('[data-info-body]');
    const triggers = document.querySelectorAll('[data-info-trigger]');
    const closeButtons = document.querySelectorAll('[data-info-close]');
    const templates = {
        terms: document.getElementById('info-terms'),
        privacy: document.getElementById('info-privacy'),
        affiliate: document.getElementById('info-affiliate')
    };

    if (!modal || !titleEl || !bodyEl || !triggers.length) return;

    const openModal = (target) => {
        const template = templates[target];
        if (!template) return;
        titleEl.textContent = target === 'affiliate' ? 'Affiliate Program' : target === 'privacy' ? 'Privacy Policy' : 'Terms of Service';
        bodyEl.innerHTML = template.innerHTML;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
    };

    const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    };

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const target = trigger.getAttribute('data-info-target');
            openModal(target);
        });
    });

    closeButtons.forEach(btn => btn.addEventListener('click', closeModal));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
}

// RequestAnimationFrame throttle
function rafThrottle(func) {
    let rafId = null;
    return function(...args) {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
            func.apply(this, args);
            rafId = null;
        });
    };
}

// Cursor Glow Effect
function initCursorGlow() {
    const cursor = document.querySelector('.cursor-glow');
    if (!cursor || window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let isActive = false;
    let rafId = null;
    let inactivityTimeout = null;

    function updateCursor() {
        if (!isActive) return;
        
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        rafId = requestAnimationFrame(updateCursor);
    }

    const throttledMouseMove = throttle((e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!isActive) {
            isActive = true;
            updateCursor();
        }
        
        clearTimeout(inactivityTimeout);
        inactivityTimeout = setTimeout(() => {
            isActive = false;
            if (rafId) cancelAnimationFrame(rafId);
        }, 100);
    }, 16);

    document.addEventListener('mousemove', throttledMouseMove, { passive: true });
}

// Mobile Menu
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isOpen = navLinks.classList.contains('active');
        toggle.innerHTML = isOpen 
            ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
            : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            toggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
        });
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;
    
    const handleScroll = rafThrottle(() => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        }
        
        lastScroll = currentScroll;
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (!question || !answer) return;

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all others
            faqItems.forEach(other => {
                other.classList.remove('active');
                const otherAnswer = other.querySelector('.faq-answer');
                if (otherAnswer) otherAnswer.style.maxHeight = null;
            });
            
            // Toggle current
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// Feature Modal
function initFeatureModal() {
    const cards = document.querySelectorAll('.feature-card[data-feature-title]');
    const modal = document.querySelector('[data-feature-modal]');
    const modalTitle = document.querySelector('[data-feature-modal-title]');
    const modalBody = document.querySelector('[data-feature-modal-body]');
    const closeTriggers = document.querySelectorAll('[data-feature-close]');
    if (!cards.length || !modal || !modalTitle || !modalBody) return;

    let lastFocusedElement = null;

    const openModal = (title, detail) => {
        lastFocusedElement = document.activeElement;
        modalTitle.textContent = title;
        modalBody.textContent = detail;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        requestAnimationFrame(() => {
            const dialog = modal.querySelector('.feature-modal-dialog');
            dialog?.focus?.();
        });
    };

    const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    };

    cards.forEach(card => {
        const handler = () => {
            const title = card.getAttribute('data-feature-title') || 'Feature';
            const detail = card.getAttribute('data-feature-detail') || '';
            openModal(title, detail);
        };

        card.addEventListener('click', handler);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handler();
            }
        });
    });

    closeTriggers.forEach(trigger => {
        trigger.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Reveal Animations
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.feature-card, .download-card, .faq-item, .changelog-item');
    if (revealElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Magnetic Button Effect
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.magnetic-btn');
    if (buttons.length === 0) return;

    if (window.matchMedia('(pointer: coarse)').matches) return;

    buttons.forEach(button => {
        const handleMove = rafThrottle((e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        button.addEventListener('mousemove', handleMove);
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
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

// Active Navigation Link
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;

    const handleScroll = rafThrottle(() => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
}

let changelogLoading = false;
let changelogLoaded = false;

// Github Changelog Feed
async function initChangelogFeed() {
    const statusEl = document.querySelector('[data-changelog-status]');
    const changelogList = document.querySelector('.changelog-list');
    if (!statusEl || !changelogList || changelogLoading || changelogLoaded) return;

    changelogLoading = true;

    const endpoint = 'https://raw.githubusercontent.com/HorizonChts/Horizon-Update-Logs/main/README.md';
    statusEl.textContent = 'Fetching latest updates...';

    try {
        const response = await fetch(endpoint, {
            headers: {
                'Accept': 'text/plain'
            }
        });

        if (!response.ok) {
            throw new Error('Unable to reach GitHub');
        }

        const text = await response.text();
        const updatedAt = response.headers.get('last-modified');
        const formattedDate = updatedAt
            ? new Date(updatedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            })
            : 'Recently updated';

        const entries = parseReadmeChangelog(text);

        if (entries.length === 0) {
            statusEl.textContent = 'No updates published yet.';
            return;
        }

        statusEl.remove();

        entries.slice(0, 5).forEach(entry => {
            const title = entry.title || 'Update';
            const changes = entry.body.length > 0 ? entry.body : ['Refer to README for details'];

            const item = document.createElement('div');
            item.className = 'changelog-item';

            const marker = document.createElement('div');
            marker.className = 'changelog-marker';

            const content = document.createElement('div');
            content.className = 'changelog-content';

            const header = document.createElement('div');
            header.className = 'changelog-header';

            const titleEl = document.createElement('h3');
            titleEl.textContent = title;

            const dateEl = document.createElement('span');
            dateEl.className = 'changelog-date';
            dateEl.textContent = formattedDate;

            header.appendChild(titleEl);
            header.appendChild(dateEl);

            const list = document.createElement('ul');
            list.className = 'changelog-changes';
            changes.forEach(change => {
                const li = document.createElement('li');
                li.textContent = change;
                list.appendChild(li);
            });

            content.appendChild(header);
            content.appendChild(list);

            item.appendChild(marker);
            item.appendChild(content);

            changelogList.appendChild(item);
        });

        changelogLoaded = true;
    } catch (error) {
        statusEl.textContent = 'Unable to load updates. Please try again later.';
        console.error('Changelog fetch failed:', error);
    } finally {
        changelogLoading = false;
    }
}

function setupChangelogLazyLoad() {
    const section = document.getElementById('changelog');
    if (!section) return;

    if (!('IntersectionObserver' in window)) {
        initChangelogFeed();
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initChangelogFeed();
                observer.disconnect();
            }
        });
    }, {
        rootMargin: '0px 0px -35% 0px'
    });

    observer.observe(section);
}

function parseReadmeChangelog(rawText) {
    if (!rawText) return [];
    const normalized = rawText.replace(/\r\n/g, '\n').trim();
    if (!normalized) return [];

    const lines = normalized.split('\n');
    const entries = [];
    let current = null;

    lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;

        if (trimmed.startsWith('## ')) {
            if (current) entries.push(current);
            current = { title: trimmed.replace(/^##\s+/, '').trim(), body: [] };
        } else if (trimmed.startsWith('# ') && !current) {
            current = { title: trimmed.replace(/^#\s+/, '').trim(), body: [] };
        } else {
            if (!current) {
                current = { title: 'Latest Update', body: [] };
            }
            current.body.push(trimmed.replace(/^[-*]\s*/, ''));
        }
    });

    if (current && (current.title || current.body.length)) {
        entries.push(current);
    }

    return entries;
}

// Initialize Everything
function init() {
    initCursorGlow();
    initMobileMenu();
    initNavDropdown();
    initNavbarScroll();
    initFAQ();
    initFeatureModal();
    initInfoModals();
    initRevealAnimations();
    initMagneticButtons();
    initSmoothScroll();
    initActiveNavLink();
    setupChangelogLazyLoad();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
