// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  });
}

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    overlay.classList.toggle('active');
  });
}

function closeMenu() {
  if (hamburger) hamburger.classList.remove('active');
  if (mobileMenu) mobileMenu.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
}

if (overlay) overlay.addEventListener('click', closeMenu);

// ===== SCROLL REVEAL =====
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => revealObserver.observe(el));

// ===== SPARKLES =====
const sparkleContainer = document.getElementById('sparkles');
if (sparkleContainer) {
  function createSparkle() {
    const s = document.createElement('div');
    s.classList.add('sparkle');
    s.style.left = Math.random() * 100 + '%';
    s.style.animationDuration = (3 + Math.random() * 4) + 's';
    s.style.width = s.style.height = (3 + Math.random() * 5) + 'px';
    sparkleContainer.appendChild(s);
    setTimeout(() => s.remove(), 7000);
  }
  setInterval(createSparkle, 400);
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
