// =========================================================
// Mobile nav toggle
// =========================================================
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// =========================================================
// Active nav link based on current page
// =========================================================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a[data-page]').forEach(link => {
  if (link.dataset.page === currentPage) link.classList.add('active');
});

// =========================================================
// Scroll reveal
// =========================================================
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// =========================================================
// Animated stat counters
// =========================================================
const statNums = document.querySelectorAll('.stat .num[data-count]');

function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

if ('IntersectionObserver' in window && statNums.length) {
  const statIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  statNums.forEach(el => statIO.observe(el));
} else {
  statNums.forEach(el => { el.textContent = el.dataset.count; });
}

// =========================================================
// Project modal (fiche projet détaillée)
//
// Convention attendue dans le HTML :
//   - Bouton/carte qui ouvre la modale :  data-modal-open="ID"
//   - La modale correspondante :          <div class="project-modal" id="ID">
//   - Bouton de fermeture dans la modale : class="project-modal-close"
// Exemple :
//   <button class="project-btn" data-modal-open="projet-1">Voir le projet</button>
//   <div class="project-modal" id="projet-1"> ... <button class="project-modal-close">&times;</button> ... </div>
// =========================================================
let lastFocusedTrigger = null;

function openProjectModal(modal, trigger) {
  if (!modal) return;
  lastFocusedTrigger = trigger || null;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  const closeBtn = modal.querySelector('.project-modal-close');
  if (closeBtn) closeBtn.focus();
}

function closeProjectModal(modal) {
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
  if (lastFocusedTrigger) lastFocusedTrigger.focus();
}

document.querySelectorAll('[data-modal-open]').forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    const modal = document.getElementById(trigger.dataset.modalOpen);
    openProjectModal(modal, trigger);
  });
});

document.querySelectorAll('.project-modal').forEach(modal => {
  // Bouton de fermeture
  modal.querySelectorAll('.project-modal-close').forEach(btn => {
    btn.addEventListener('click', () => closeProjectModal(modal));
  });
  // Clic en dehors du contenu = fermeture
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeProjectModal(modal);
  });
});

// Touche Échap = fermeture de la modale active
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const openModal = document.querySelector('.project-modal.active');
    if (openModal) closeProjectModal(openModal);
  }
});