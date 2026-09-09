const sections = Array.from(document.querySelectorAll('main section[id]'));
const navLinks = Array.from(document.querySelectorAll('.nav-link'));

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.3 });

sections.forEach((section) => navObserver.observe(section));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll('.section, .hero, .project-card, .timeline-item, .education-card, .skill-map-block').forEach((element) => {
  revealObserver.observe(element);
});

const hero = document.querySelector('.hero');
if (hero) {
  hero.animate([
    { transform: 'translateY(16px)', opacity: 0.76 },
    { transform: 'translateY(0)', opacity: 1 }
  ], { duration: 900, easing: 'ease-out', fill: 'forwards' });
}

const cards = document.querySelectorAll('.project-card, .education-card, .skill-map-block');
cards.forEach((card, index) => {
  card.animate([
    { transform: 'translateY(12px)', opacity: 0 },
    { transform: 'translateY(0)', opacity: 1 }
  ], {
    duration: 700,
    delay: 80 * index,
    easing: 'ease-out',
    fill: 'forwards'
  });
});
