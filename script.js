// Cursor Glow Effect
const cursorGlow = document.getElementById('cursorGlow');
let mouseX = 0;
let mouseY = 0;
let glowX = 0;
let glowY = 0;
let isMouseMoving = false;
let mouseTimeout;

// Smooth cursor following with requestAnimationFrame - Reduced delay
function animateCursor() {
    const dx = mouseX - glowX;
    const dy = mouseY - glowY;
    
    glowX += dx * 0.3; // Increased from 0.1 to 0.3 for faster response
    glowY += dy * 0.3; // Increased from 0.1 to 0.3 for faster response
    
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    
    requestAnimationFrame(animateCursor);
}

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    isMouseMoving = true;
    cursorGlow.style.opacity = '0.4'; // Increased opacity for better visibility
    
    clearTimeout(mouseTimeout);
    mouseTimeout = setTimeout(() => {
        isMouseMoving = false;
        cursorGlow.style.opacity = '0.15'; // Reduced fade-out opacity
    }, 200); // Reduced from 100ms to 200ms for faster fade
});

// Initialize cursor animation
animateCursor();

// Hide cursor glow on mobile devices
if (window.innerWidth <= 768) {
    cursorGlow.style.display = 'none';
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for Scroll Animations
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
document.querySelectorAll('.feature-card, .download-card, .reseller-info, .reseller-form').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Parallax Effect for Hero Background
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    heroBg.style.transform = `translateY(${parallax}px)`;
});

// Dynamic Glow Effect on Hover
document.querySelectorAll('.hover-glow, .btn').forEach(element => {
    element.addEventListener('mouseenter', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        element.style.setProperty('--mouse-x', `${x}px`);
        element.style.setProperty('--mouse-y', `${y}px`);
    });
    
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        element.style.setProperty('--mouse-x', `${x}px`);
        element.style.setProperty('--mouse-y', `${y}px`);
    });
});

// GitHub API Integration (Mock)
async function fetchGitHubData() {
    try {
        // In a real implementation, this would fetch from GitHub API
        // const response = await fetch('https://api.github.com/repos/horizon-cheats/horizon-cheats');
        // const data = await response.json();
        
        // Mock data for demonstration
        const mockData = {
            stargazers_count: 1234,
            forks_count: 567,
            open_issues_count: 23,
            updated_at: '2024-01-15T10:30:00Z'
        };
        
        // Update GitHub stats if elements exist
        document.querySelectorAll('.github-stats').forEach(el => {
            if (el.dataset.stat === 'stars') {
                el.textContent = mockData.stargazers_count.toLocaleString();
            }
        });
        
    } catch (error) {
        console.log('GitHub API not available, using mock data');
    }
}

// Initialize GitHub data on load
fetchGitHubData();

// Shop Purchase Handlers
document.querySelectorAll('.shop-card .btn-primary').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.shop-card');
        const productName = card.querySelector('h3').textContent;
        const price = card.querySelector('.price-tag').textContent;
        
        // Show purchase state
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        this.disabled = true;
        
        // Simulate purchase processing
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-check"></i> Purchase Successful!';
            this.style.background = 'var(--success)';
            
            // Show success notification
            showNotification(`Successfully purchased ${productName} for ${price}!`, 'success');
            
            // Reset button after delay
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.background = '';
                this.disabled = false;
            }, 3000);
        }, 2000);
    });
});

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success)' : 'var(--glow-color)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Close button handler
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
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
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(notificationStyles);

// Download Button Handlers
document.querySelectorAll('.download-card .btn-primary').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.download-card');
        const productName = card.querySelector('h3').textContent;
        
        // Show download state
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
        this.disabled = true;
        
        // Simulate download
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-check"></i> Download Started!';
            this.style.background = 'var(--success)';
            
            // Reset after delay
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.background = '';
                this.disabled = false;
            }, 3000);
        }, 1500);
    });
});

// GitHub API Integration (Mock)
async function fetchGitHubData() {
    try {
        // In a real implementation, this would fetch from GitHub API
        // const response = await fetch('https://api.github.com/repos/horizon-cheats/horizon-cheats');
        // const data = await response.json();
        
        // Mock data for demonstration
        const mockData = {
            stargazers_count: 1234,
            forks_count: 567,
            open_issues_count: 23,
            updated_at: '2024-01-15T10:30:00Z'
        };
        
        // Update GitHub stats if elements exist
        document.querySelectorAll('.github-stats').forEach(el => {
            if (el.dataset.stat === 'stars') {
                el.textContent = mockData.stargazers_count.toLocaleString();
            }
        });
        
    } catch (error) {
        console.log('GitHub API not available, using mock data');
    }
}

// Initialize GitHub data on load
fetchGitHubData();

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// Scroll Progress Indicator
function updateScrollProgress() {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    
    // Create progress bar if it doesn't exist
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--glow-color), var(--cyan));
            z-index: 10000;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// Performance optimization - Debounce scroll events
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

// Debounced scroll handlers
const debouncedScroll = debounce(() => {
    updateScrollProgress();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Add CSS for scroll progress bar
const style = document.createElement('style');
style.textContent = `
    .scroll-progress {
        box-shadow: 0 0 10px rgba(96, 165, 250, 0.5);
    }
`;
document.head.appendChild(style);

// Console Easter Egg
console.log('%c🚀 Horizon Cheats Website', 'font-size: 20px; color: #60a5fa; font-weight: bold;');
console.log('%cBuilt with dark blue theme, cursor glow effects, and GitHub integration', 'color: #94a3b8;');
console.log('%cCheck out our GitHub repository for the source code!', 'color: #06b6d4;');
