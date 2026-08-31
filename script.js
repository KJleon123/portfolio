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
// ANIMATION DES BARRES DE PROGRESSION
// =========================================================

function animateSkillBars() {

  const skillCards = document.querySelectorAll('.skill-card-modern.reveal');

  skillCards.forEach(card => {

    if (card.classList.contains('in')) {

      const bar = card.querySelector('.skill-progress-bar');

      if (bar && !bar.dataset.animated) {

        const width = bar.dataset.width || 0;

        bar.style.width = width + '%';

        bar.dataset.animated = 'true';
      }
    }
  });
}


// Observer pour détecter quand les cartes deviennent visibles

const observer = new MutationObserver(() => {

  animateSkillBars();

});


// Écouter les changements de classe sur les éléments .reveal

document.querySelectorAll('.reveal').forEach(el => {

  observer.observe(el, {
    attributes: true,
    attributeFilter: ['class']
  });

});


// Appel initial après le chargement

document.addEventListener('DOMContentLoaded', () => {

  setTimeout(animateSkillBars, 500);

});


// Écouter l'événement de scroll

window.addEventListener('scroll', () => {

  animateSkillBars();

});


// =========================================================
// MODALE DYNAMIQUE DES RÉALISATIONS
// =========================================================

function openProject(button) {

  const modal = document.getElementById("projectModal");

  // Récupérer automatiquement les informations du projet
  const title = button.dataset.title;
  const category = button.dataset.category;
  const description = button.dataset.description;
  const images = button.dataset.images.split(",");


  // Afficher les informations
  document.getElementById("modalTitle").textContent = title;

  document.getElementById("modalCategory").textContent = category;

  document.getElementById("modalDescription").textContent = description;


  // Récupérer la zone des images
  const imageContainer = document.getElementById("modalImages");

  // Supprimer les anciennes images
  imageContainer.innerHTML = "";


  // Ajouter automatiquement les images du projet
  images.forEach(function(image) {

    const img = document.createElement("img");

    img.src = image.trim();

    img.alt = title;

    imageContainer.appendChild(img);

  });


  // Afficher la modale
  modal.classList.add("active");

  // Bloquer le scroll derrière la modale
  document.body.style.overflow = "hidden";
}


// =========================================================
// FERMER LA MODALE
// =========================================================

function closeProject() {

  const modal = document.getElementById("projectModal");

  modal.classList.remove("active");

  document.body.style.overflow = "";

}


// Fermer en cliquant sur l'arrière-plan

document.addEventListener("click", function(event) {

  const modal = document.getElementById("projectModal");

  if (event.target === modal) {

    closeProject();

  }

});


// Fermer avec la touche Échap

document.addEventListener("keydown", function(event) {

  if (event.key === "Escape") {

    closeProject();

  }

});