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
// Barres de progression des compétences
// =========================================================

function initSkillProgressBars() {

  document.querySelectorAll('.skill-card-modern').forEach(card => {

    const percentElement = card.querySelector('.skill-percent');
    const progressBar = card.querySelector('.skill-progress-bar');

    if (!percentElement || !progressBar) return;

    // Récupération du pourcentage
    const value = parseInt(
      percentElement.textContent.replace('%', '').trim(),
      10
    );

    if (isNaN(value)) return;

    // Préparation
    progressBar.style.width = '0%';

    // Déclenchement après affichage
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        progressBar.style.width = `${value}%`;
      });
    });

  });

}

initSkillProgressBars();

// =========================================================
// Skill progress bars
// =========================================================
document.querySelectorAll('.skill-card-modern').forEach(card => {
  const percent = card.querySelector('.skill-percent');
  const bar = card.querySelector('.skill-progress-bar');

  if (!percent || !bar) return;

  const value = parseInt(percent.textContent.replace('%', ''), 10);

  if (!isNaN(value)) {
    card.style.setProperty('--progress-width', `${value}%`);
  }
});

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
// MODALE DYNAMIQUE DES PROJETS
// =========================================================

function openProject(button) {

  const modal = document.getElementById('projectModal');

  if (!modal) return;

  const title = button.dataset.title || '';
  const category = button.dataset.category || '';
  const images = button.dataset.images || '';

  // Remplir les informations
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalDescription = document.getElementById('modalDescription');
  const modalImages = document.getElementById('modalImages');

  if (modalTitle) {
    modalTitle.textContent = title;
  }

  if (modalCategory) {
    modalCategory.textContent = category;
  }

  if (modalDescription) {
    modalDescription.textContent = '';
  }

  // Nettoyer les anciennes images
  if (modalImages) {

    modalImages.innerHTML = '';

    images
      .split(',')
      .map(image => image.trim())
      .filter(Boolean)
      .forEach(image => {

        const img = document.createElement('img');

        img.src = image;
        img.alt = title;
        img.loading = 'lazy';

        modalImages.appendChild(img);

      });
  }

  // Ouvrir la modal
  modal.classList.add('active');

  // Bloquer le scroll de la page
  document.body.style.overflow = 'hidden';
}


// =========================================================
// FERMER LA MODALE
// =========================================================

function closeProject() {

  const modal = document.getElementById('projectModal');

  if (!modal) return;

  modal.classList.remove('active');

  document.body.style.overflow = '';

}


// =========================================================
// FERMETURE EN CLIQUANT EN DEHORS
// =========================================================

const projectModal = document.getElementById('projectModal');

if (projectModal) {

  projectModal.addEventListener('click', function(e) {

    if (e.target === projectModal) {
      closeProject();
    }

  });

}


// =========================================================
// FERMETURE AVEC ÉCHAP
// =========================================================

document.addEventListener('keydown', function(e) {

  if (e.key === 'Escape') {
    closeProject();
  }

});