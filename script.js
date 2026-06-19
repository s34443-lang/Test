// ============================================
// Click-to-copy email address
// ============================================
const emailLink = document.getElementById('emailLink');
const copyHint = document.getElementById('copyHint');

if (emailLink && copyHint) {
  emailLink.addEventListener('click', (event) => {
    event.preventDefault();

    const email = emailLink.href.replace('mailto:', '');

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(() => {
        showCopied();
      }).catch(() => {
        window.location.href = emailLink.href;
      });
    } else {
      window.location.href = emailLink.href;
    }
  });
}

function showCopied() {
  const originalText = copyHint.textContent;
  copyHint.textContent = 'ก็อปแล้ว!';
  setTimeout(() => {
    copyHint.textContent = originalText;
  }, 1800);
}

// ============================================
// Reveal project cards on scroll
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
