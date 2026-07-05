const menuToggle = document.querySelector("[data-menu-toggle]");
const menuClose = document.querySelector("[data-menu-close]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const menuOverlay = document.querySelector("[data-menu-overlay]");
const mobileLinks = document.querySelectorAll(".mobile-nav a");
const desktopLinks = document.querySelectorAll(".desktop-nav a");
const tagPills = document.querySelectorAll(".tag-pill");
const revealItems = document.querySelectorAll(".reveal-item");
const heroProduct = document.querySelector(".hero-product");

/* Mobile menu controls */
function openMenu() {
  menuToggle.classList.add("is-open");
  mobileMenu.classList.add("is-open");
  menuOverlay.classList.add("is-open");
  document.body.classList.add("menu-open");
  menuToggle.setAttribute("aria-label", "Close menu");
}

function closeMenu() {
  menuToggle.classList.remove("is-open");
  mobileMenu.classList.remove("is-open");
  menuOverlay.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-label", "Open menu");
}

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.contains("is-open") ? closeMenu() : openMenu();
});

menuClose.addEventListener("click", closeMenu);
menuOverlay.addEventListener("click", closeMenu);

/* Active navigation state */
[...desktopLinks, ...mobileLinks].forEach((link) => {
  link.addEventListener("click", () => {
    desktopLinks.forEach((item) => item.classList.remove("active"));
    mobileLinks.forEach((item) => item.classList.remove("active"));

    const target = link.getAttribute("href");

    document.querySelectorAll(`a[href="${target}"]`).forEach((item) => {
      item.classList.add("active");
    });

    closeMenu();
  });
});

/* Product tag interaction */
tagPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    tagPills.forEach((item) => item.classList.remove("active"));
    pill.classList.add("active");
  });
});

/* Reveal animation */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.18,
  }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 90}ms`;
  revealObserver.observe(item);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

/* Subtle product movement on desktop */
window.addEventListener("pointermove", (event) => {
  if (!heroProduct || window.innerWidth <= 900) return;

  const rect = heroProduct.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;

  heroProduct.style.setProperty("--move-x", `${x * 12}px`);
  heroProduct.style.setProperty("--move-y", `${y * 10}px`);
});