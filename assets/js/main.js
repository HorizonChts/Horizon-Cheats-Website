document.addEventListener("DOMContentLoaded", () => {
  initCursorSpotlight();
  initFadeInObserver();
  initAccordions();
  initCopyButtons();
  initMouseTracking();
  initProximityHover();
});

function initCursorSpotlight() {
  const spotlight = document.querySelector(".cursor-spotlight");
  const glow = document.querySelector(".cursor-glow");
  if (!spotlight || !glow) return;

  const body = document.body;
  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;
  let currentX = pointerX;
  let currentY = pointerY;
  let glowX = pointerX;
  let glowY = pointerY;
  let rafId;

  const updatePosition = () => {
    // Smooth spotlight following
    currentX += (pointerX - currentX) * 0.12;
    currentY += (pointerY - currentY) * 0.12;
    spotlight.style.transform = `translate3d(${currentX - 200}px, ${currentY - 200}px, 0)`;
    
    // Even smoother glow following
    glowX += (pointerX - glowX) * 0.08;
    glowY += (pointerY - glowY) * 0.08;
    glow.style.transform = `translate3d(${glowX - 125}px, ${glowY - 125}px, 0)`;
    
    rafId = requestAnimationFrame(updatePosition);
  };

  const handlePointerMove = (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
  };

  const handleEnter = () => {
    body.classList.add("cursor-active");
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(updatePosition);
  };

  const handleLeave = () => {
    body.classList.remove("cursor-active");
    cancelAnimationFrame(rafId);
  };

  window.addEventListener("pointermove", handlePointerMove);
  window.addEventListener("pointerenter", handleEnter);
  window.addEventListener("pointerleave", handleLeave);
}

function initFadeInObserver() {
  const elements = document.querySelectorAll(".fade-in");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );

  elements.forEach((el, index) => {
    el.style.transitionDelay = `${index * 60}ms`;
    observer.observe(el);
  });
}

function initAccordions() {
  const accordions = document.querySelectorAll(".accordion");
  if (!accordions.length) return;

  accordions.forEach((accordion) => {
    const items = accordion.querySelectorAll(".accordion-item");

    items.forEach((item) => {
      const trigger = item.querySelector(".accordion-trigger");
      if (!trigger) return;

      trigger.addEventListener("click", () => {
        const isActive = item.classList.contains("active");
        items.forEach((entry) => entry.classList.remove("active"));
        if (!isActive) {
          item.classList.add("active");
        }
      });
    });
  });
}

function initMouseTracking() {
  const hoverElements = document.querySelectorAll('.logo, nav a, .nav-cta, .btn, .card, .badge, .benefit-card, .footer-links a, .footer-social a, .youtube-link');
  
  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function animateElements() {
    hoverElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = mouseX - centerX;
      const distanceY = mouseY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      if (distance < 120) {
        const factor = 1 - (distance / 120);
        const moveX = distanceX * factor * 0.08;
        const moveY = distanceY * factor * 0.08;
        const scale = 1 + factor * 0.02;
        
        el.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})`;
        el.style.boxShadow = `${moveX * 0.2}px ${moveY * 0.2}px 15px rgba(255, 255, 255, ${0.15 * factor})`;
      } else {
        // Reset to default hover state
        if (!el.matches(':hover')) {
          el.style.transform = '';
          el.style.boxShadow = '';
        }
      }
    });
    
    requestAnimationFrame(animateElements);
  }
  
  animateElements();
}

function initProximityHover() {
  const interactiveElements = document.querySelectorAll('a, button, .btn, .card, .badge');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
    
    element.addEventListener('mouseleave', function() {
      this.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });
}

function initCopyButtons() {
  const buttons = document.querySelectorAll(".copy-btn");
  if (!buttons.length || !navigator.clipboard) return;

  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      const codeBlock = button.closest(".code-block");
      const codeText = codeBlock?.querySelector("code")?.innerText?.trim();
      if (!codeText) return;
      try {
        await navigator.clipboard.writeText(codeText);
        const originalText = button.innerText;
        button.innerText = "Copied";
        button.classList.add("copied");
        setTimeout(() => {
          button.innerText = originalText;
          button.classList.remove("copied");
        }, 1600);
      } catch (error) {
        console.warn("Copy failed", error);
      }
    });
  });
}
