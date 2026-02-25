document.addEventListener("DOMContentLoaded", () => {
  initCursorSpotlight();
  initFadeInObserver();
  initAccordions();
  initCopyButtons();
});

function initCursorSpotlight() {
  const spotlight = document.querySelector(".cursor-spotlight");
  if (!spotlight) return;

  const body = document.body;
  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;
  let currentX = pointerX;
  let currentY = pointerY;
  let rafId;

  const updatePosition = () => {
    currentX += (pointerX - currentX) * 0.12;
    currentY += (pointerY - currentY) * 0.12;
    spotlight.style.transform = `translate3d(${currentX - 300}px, ${currentY - 300}px, 0)`;
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
