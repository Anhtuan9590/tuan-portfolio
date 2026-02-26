// ===============================
// DOM READY
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  const header = document.querySelector(".header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinksContainer = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links a");
  const overlay = document.querySelector(".overlay-menu");
  const sections = document.querySelectorAll("section[id]");
  const skillCards = document.querySelectorAll(".skill-card");

  // ===============================
  // MOBILE MENU
  // ===============================
  function closeMenu() {
    menuToggle.classList.remove("active");
    navLinksContainer.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navLinksContainer.classList.toggle("active");
    overlay.classList.toggle("active");

    document.body.style.overflow =
      navLinksContainer.classList.contains("active")
        ? "hidden"
        : "auto";
  });

  overlay.addEventListener("click", closeMenu);
  navLinks.forEach(link => link.addEventListener("click", closeMenu));

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeMenu();
  });

  // ===============================
  // SMOOTH SCROLL
  // ===============================
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      const target = document.querySelector(
        link.getAttribute("href")
      );

      if (!target) return;

      const offset = 80;
      const position = target.offsetTop - offset;

      window.scrollTo({
        top: position,
        behavior: "smooth"
      });
    });
  });

  // ===============================
  // HEADER SCROLL EFFECT
  // ===============================
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  });

  // ===============================
  // ACTIVE NAV (NO FLICKER)
  // ===============================
  let currentActive = null;

  function setActiveSection() {
  const scrollPos = window.scrollY + window.innerHeight / 2;

  let currentSection = null;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();

    if (rect.top <= window.innerHeight / 2 &&
        rect.bottom >= window.innerHeight / 2) {
      currentSection = section.getAttribute("id");
    }
  });

  if (currentSection) {
    navLinks.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + currentSection
      );
    });
  }
}

  window.addEventListener("scroll", () => {
    requestAnimationFrame(setActiveSection);
  });

  // ===============================
  // SCROLL ANIMATION (GLOBAL)
  // ===============================
  const animatedElements = document.querySelectorAll(".section");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("show");

      // SKILL STAGGER
      if (entry.target.id === "skills") {
        skillCards.forEach((card, index) => {
          card.style.transitionDelay = `${index * 0.1}s`;
          card.classList.add("show");
        });
      }

      obs.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  animatedElements.forEach(el => observer.observe(el));

});
