// ============================================
// Mobile nav toggle
// ============================================
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');

if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    mobileNav.classList.toggle('open');
    navToggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
  });

  // Close mobile nav after tapping a link
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
      mobileNav.classList.remove('open');
    });
  });
}

// ============================================
// Footer year
// ============================================
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ============================================
// Back to top button
// ============================================
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================
// Contact form (front-end only — no backend wired up)
// ============================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = 'Please fill in every field before sending.';
      formStatus.className = 'form-status error';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      formStatus.textContent = 'That email address doesn\'t look right.';
      formStatus.className = 'form-status error';
      return;
    }

    // No backend is connected yet — this just confirms the form works.
    // Wire this up to your email service or backend endpoint of choice.
    formStatus.textContent = `Thanks, ${name.split(' ')[0]} — message captured. Connect a backend to actually send it.`;
    formStatus.className = 'form-status success';
    contactForm.reset();
  });
}

// ============================================
// Reveal work cards on scroll
// ============================================
const revealTargets = document.querySelectorAll('.work-card');

if ('IntersectionObserver' in window && revealTargets.length) {
  revealTargets.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach((el) => observer.observe(el));
}
