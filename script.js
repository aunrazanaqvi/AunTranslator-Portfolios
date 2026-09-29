// Sticky nav shadow
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
window.addEventListener("scroll", onScroll);
onScroll();

// Mobile menu
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", open);
});
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", false);
  })
);

// Rotating multilingual greeting
const greetings = [
  { word: "Hello", lang: "English" },
  { word: "آداب", lang: "Urdu", urdu: true },
  { word: "Bonjour", lang: "French" },
  { word: "Hola", lang: "Spanish" },
];
const greeting = document.querySelector(".greeting");
const greetWord = document.getElementById("greetWord");
const greetLang = document.getElementById("greetLang");
let g = 0;
setInterval(() => {
  greeting.classList.add("fade");
  setTimeout(() => {
    g = (g + 1) % greetings.length;
    greetWord.textContent = greetings[g].word;
    greetWord.classList.toggle("urdu", !!greetings[g].urdu);
    greetLang.textContent = greetings[g].lang;
    greeting.classList.remove("fade");
  }, 350);
}, 2600);

// Scroll reveal + language bars
document
  .querySelectorAll(".section-title, .about-text, .lang-card, .service-card, .tl-item, .chips, .edu-card, .contact-form, .contact-list")
  .forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      entry.target.querySelectorAll(".bar span").forEach((bar) => {
        bar.style.width = bar.dataset.width + "%";
      });
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a:not(.btn)");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach((a) =>
        a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
      );
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => sectionObserver.observe(s));

// Contact form -> opens email client with pre-filled message
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target;
  const subject = `Translation request: ${f.from.value} → ${f.to.value}`;
  const body = `Name: ${f.name.value}\nEmail: ${f.email.value}\nLanguage pair: ${f.from.value} → ${f.to.value}\n\n${f.message.value}`;
  window.location.href =
    "mailto:aunnaqvi747@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
});

document.getElementById("year").textContent = new Date().getFullYear();
