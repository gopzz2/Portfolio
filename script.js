// 1. Typing effect for the role line
const roles = ["Full Stack Web Developer", "React & Node.js Developer", "AI-Powered App Builder"];
const typed = document.getElementById("typed");
let r = 0, c = 0, deleting = false;
function type() {
  const word = roles[r];
  typed.textContent = word.slice(0, c);
  if (!deleting && c < word.length) c++;
  else if (!deleting) { deleting = true; return setTimeout(type, 1400); }
  else if (c > 0) c--;
  else { deleting = false; r = (r + 1) % roles.length; }
  setTimeout(type, deleting ? 40 : 90);
}
type();

// 2. Dark / light theme (remembered in localStorage)
const themeBtn = document.getElementById("themeBtn");
function setTheme(dark) {
  document.body.classList.toggle("dark", dark);
  themeBtn.textContent = dark ? "☀️" : "🌙";
  try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch (e) {}
}
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
setTheme(saved === "dark");
themeBtn.addEventListener("click", () => setTheme(!document.body.classList.contains("dark")));

// 3. Mobile menu
const menu = document.getElementById("menu");
document.getElementById("menuBtn").addEventListener("click", () => menu.classList.toggle("open"));
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => menu.classList.remove("open")));

// 4. Scroll reveal + animated counters
function countUp(el) {
  const target = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0);
  let n = 0;
  const step = target / 40;
  const t = setInterval(() => {
    n += step;
    if (n >= target) { n = target; clearInterval(t); }
    el.textContent = n.toFixed(dec);
  }, 30);
}
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("show");
      e.target.querySelectorAll("[data-count]").forEach(countUp);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(s => io.observe(s));

// 5. Project filter
document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".project").forEach(p => {
      p.classList.toggle("hide", btn.dataset.f !== "all" && !p.dataset.cat.includes(btn.dataset.f));
    });
  });
});

// 6. Highlight active nav link + back-to-top button
const sections = document.querySelectorAll("main section[id]");
const topBtn = document.getElementById("topBtn");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(s => { if (scrollY >= s.offsetTop - 120) current = s.id; });
  menu.querySelectorAll("a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
  topBtn.style.display = scrollY > 400 ? "block" : "none";
});
topBtn.addEventListener("click", () => scrollTo({ top: 0 }));

// 7. Contact form: opens the visitor's email app with the message filled in
document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const msg = document.getElementById("msg").value;
  const body = encodeURIComponent(msg + "\n\nFrom: " + name + " (" + email + ")");
  location.href = "mailto:gopikasankar05@gmail.com?subject=Portfolio%20Message&body=" + body;
  document.getElementById("status").textContent = "Opening your email app...";
});

// 8. Footer year
document.getElementById("year").textContent = new Date().getFullYear();
