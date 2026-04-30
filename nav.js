// ── nav.js — shared across all pages ────────────────────────────

// Scroll Reveal
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.10 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .skill-card, .portfolio-item, .service-item').forEach(el => {
    revealObserver.observe(el);
});

// Skill bar animation
const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target.querySelector('.skill-fill');
            if (fill) fill.style.width = fill.getAttribute('data-pct') + '%';
            barObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.4 });
document.querySelectorAll('.skill-card').forEach(c => barObserver.observe(c));

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile toggler
const toggler = document.getElementById('navbar-toggler');
const menu = document.getElementById('navbar-menu');
toggler?.addEventListener('click', () => {
    menu.classList.toggle('active');
    toggler.classList.toggle('active');
});
menu?.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => {
    menu.classList.remove('active');
    toggler.classList.remove('active');
}));

// Theme toggle — persists across pages
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;
if (localStorage.getItem('theme') === 'light') body.classList.add('light-mode');
themeBtn?.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
    themeBtn.querySelector('i').className = body.classList.contains('light-mode') ? 'fas fa-moon' : 'fas fa-sun';
});
// Set icon on load
if (themeBtn) {
    themeBtn.querySelector('i').className = body.classList.contains('light-mode') ? 'fas fa-moon' : 'fas fa-sun';
}

// Back to top
const btt = document.getElementById('back-to-top');
window.addEventListener('scroll', () => btt?.classList.toggle('show', window.scrollY > 300));
btt?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Hero typewriter (hanya di halaman yang punya .hero-tagline)
const tagline = document.querySelector('.hero-tagline');
if (tagline) {
    const words = ['Web Designer', 'UI/UX Designer', 'Brand Designer', 'Visual Creator'];
    let wi = 0, ci = 0, deleting = false;
    const type = () => {
        const word = words[wi];
        tagline.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
        if (!deleting && ci > word.length) { deleting = true; setTimeout(type, 1500); return; }
        if (deleting && ci < 0) { deleting = false; wi = (wi + 1) % words.length; ci = 0; }
        setTimeout(type, deleting ? 55 : 95);
    };
    setTimeout(type, 800);
}
