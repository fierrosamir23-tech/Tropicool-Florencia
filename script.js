const BUSINESS = {
  whatsapp: "573164929835"
};

const makeWhatsAppUrl = (message) => {
  const text = encodeURIComponent(message || "Hola, quiero hacer un pedido en Tropicool Florencia.");
  return `https://wa.me/${BUSINESS.whatsapp}?text=${text}`;
};

document.querySelectorAll(".wa-link").forEach((link) => {
  link.href = makeWhatsAppUrl(link.dataset.message);
  link.target = "_blank";
  link.rel = "noopener";
});

const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".main-nav");

const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 12);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuButton.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
});

menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menu.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const menuPages = [...document.querySelectorAll(".menu-page")];
const menuLightbox = document.getElementById("menu-lightbox");
const menuLightboxImage = document.getElementById("menu-lightbox-image");
const menuLightboxTitle = document.getElementById("menu-lightbox-title");
const menuLightboxCounter = document.getElementById("menu-lightbox-counter");
const menuLightboxScroll = document.getElementById("menu-lightbox-scroll");
const menuOpenOriginal = document.getElementById("menu-open-original");
let currentMenuPage = 0;

const setMenuPage = (index) => {
  currentMenuPage = (index + menuPages.length) % menuPages.length;
  const page = menuPages[currentMenuPage];
  const preview = page.querySelector("img");
  const source = page.dataset.menuSrc;

  menuLightboxImage.src = source;
  menuLightboxImage.alt = preview.alt;
  menuLightboxTitle.textContent = page.dataset.menuTitle;
  menuLightboxCounter.textContent = `Página ${currentMenuPage + 1} de ${menuPages.length}`;
  menuOpenOriginal.href = source;
  menuLightboxScroll.scrollTo({ top: 0, left: 0 });
};

const openMenuPage = (index) => {
  setMenuPage(index);
  document.body.classList.add("dialog-open");
  menuLightbox.showModal();
};

const closeMenu = () => menuLightbox.close();

menuPages.forEach((page, index) => {
  page.addEventListener("click", () => openMenuPage(index));
});

document.getElementById("menu-lightbox-close").addEventListener("click", closeMenu);
document.querySelector(".menu-lightbox-prev").addEventListener("click", () => setMenuPage(currentMenuPage - 1));
document.querySelector(".menu-lightbox-next").addEventListener("click", () => setMenuPage(currentMenuPage + 1));
menuLightbox.addEventListener("close", () => document.body.classList.remove("dialog-open"));
menuLightbox.addEventListener("click", (event) => {
  if (event.target === menuLightbox) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (!menuLightbox.open) return;
  if (event.key === "ArrowLeft") setMenuPage(currentMenuPage - 1);
  if (event.key === "ArrowRight") setMenuPage(currentMenuPage + 1);
});

document.getElementById("year").textContent = new Date().getFullYear();
