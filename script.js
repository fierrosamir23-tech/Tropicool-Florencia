const BUSINESS = {
  whatsapp: "573102042041"
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
document.getElementById("year").textContent = new Date().getFullYear();
