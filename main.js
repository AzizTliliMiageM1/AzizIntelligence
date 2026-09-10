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

const scanFrame = document.querySelector('.scan-frame');
if (scanFrame) {
  window.addEventListener('mousemove', (event) => {
    const x = Math.round((event.clientX / Math.max(window.innerWidth, 1)) * 16 - 8);
    const y = Math.round((event.clientY / Math.max(window.innerHeight, 1)) * 10 - 5);
    scanFrame.style.transform = `translate3d(${x * 0.25}px, ${y * 0.25}px, 0)`;
  });
}

const languageButton = document.querySelector('.language-toggle');
const languageCurrent = document.querySelector('.language-toggle-current');
const originalDocumentTitle = document.title;
const originalMetaDescription = document.querySelector('meta[name="description"]')?.content;

const languageGroups = [
  ['.brand-role', ['Science des données & IA', 'Data Science & AI']],
  ['.nav-link', [['01 / Profil', '01 / Profile'], ['02 / Parcours', '02 / Experience'], ['03 / Projets', '03 / Projects'], ['04 / Formation', '04 / Education']]],
  ['.header-button span', ['Contact', 'Contact']],
  ['.hero .section-kicker span:last-child', ['Master 2 MIAGE · Université Paris Nanterre', 'Master 2 MIAGE · Paris Nanterre University']],
  ['.hero h1 .headline-line', [['Des données', 'From data'], ['aux systèmes', 'to intelligent'], ['intelligents.', 'systems.']]],
  ['.hero-intro', ['Étudiant en Master 2 MIAGE, orienté Data Science et Intelligence Artificielle, je conçois des solutions mêlant analyse, apprentissage automatique et applications métier.', 'Master 2 MIAGE student focused on Data Science and Artificial Intelligence, I design solutions combining analysis, machine learning and business applications.']],
  ['.hero-actions .primary-button span', ['Explorer les projets', 'Explore projects']],
  ['.hero-actions .ghost-button span', ['Télécharger le CV', 'Download CV']],
  ['.proof-label', [['axes de compétences', 'skill areas'], ['projets & expériences', 'projects & experiences'], ['anglais', 'English']]],
  ['.frame-status span:last-child', ['Disponible en ligne', 'Available online']],
  ['.identity-label', ['Profil opérationnel', 'Professional profile']],
  ['.identity-grid span', [['Scientifique des données / IA', 'Data Scientist / AI'], ['MIAGE', 'MIAGE'], ['Données & Web', 'Data & Web']]],
  ['.signal-label:last-child', [['Collecte', 'Data collection'], ['IA', 'AI'], ['Application', 'Application'], ['Déploiement', 'Deployment']]],
  ['.summary-label', [['Localisation', 'Location'], ['Contact', 'Contact']]],
  ['#profile .section-kicker', ['02 / Profil', '02 / Profile']],
  ['#profile h2', ['Une trajectoire orientée vers les systèmes intelligents.', 'A path focused on intelligent systems.']],
  ['.profile-story p', [['Étudiant en Master 2 MIAGE à l’Université Paris Nanterre, je développe des solutions mêlant analyse de données, apprentissage automatique et applications polyvalentes, de la conception au déploiement.', 'As a Master 2 MIAGE student at Paris Nanterre University, I build solutions combining data analysis, machine learning and versatile applications, from design to deployment.'], ['Mon objectif est de contribuer à des projets IA à impact, en faisant le lien entre la compréhension des données, l’expérience utilisateur et la mise en production d’applications utiles aux métiers.', 'My goal is to contribute to impactful AI projects by connecting data understanding, user experience and the delivery of useful business applications.']]],
  ['.stack-card-title', [['Analyse & IA', 'Analytics & AI'], ['Données & BI', 'Data & BI'], ['Développement', 'Development']]],
  ['.stack-card-text', [['Python, apprentissage automatique, regroupement, prévision, optimisation ACO.', 'Python, machine learning, clustering, forecasting and ACO optimisation.'], ['Dataiku, Snowflake, SQL, Power BI, visualisation.', 'Dataiku, Snowflake, SQL, Power BI and visualisation.'], ['Next.js, React, TypeScript, Java, API REST, Supabase/PostgreSQL.', 'Next.js, React, TypeScript, Java, REST APIs and Supabase/PostgreSQL.']]],
  ['#experience .section-kicker', ['03 / Parcours', '03 / Experience']],
  ['#experience h2', ['Parcours et expériences.', 'Experience and background.']],
  ['.timeline-content h3', [['Développeur full-stack & données', 'Full-stack & data developer'], ['Développeur web côté interface / WordPress', 'Web interface developer / WordPress'], ['Développeur Data et Web', 'Data and web developer']]],
  ['.timeline-content p', [['Conception et mise en production d’une plateforme de gestion hôtelière : site multilingue, authentification sécurisée, réservations, chambres, facturation PDF et e-mails transactionnels.', 'Designed and launched a hotel management platform: multilingual website, secure authentication, bookings, rooms, PDF invoicing and transactional emails.'], ['Développement d’interfaces web côté client et côté serveur.', 'Development of client-side and server-side web interfaces.'], ['Développement d’une application MongoDB/Node.js d’évaluation de la satisfaction client.', 'Development of a MongoDB/Node.js application for measuring customer satisfaction.']]],
  ['#projects .section-kicker', ['04 / Projets', '04 / Projects']],
  ['#projects h2', ['Laboratoire de données et de systèmes.', 'Data and systems laboratory.']],
  ['.project-type', [['Optimisation', 'Optimisation'], ['Données & prévision', 'Data & forecasting'], ['Services bancaires ouverts', 'Open banking'], ['Application en ligne', 'Online application'], ['Mémoire de recherche', 'Research thesis']]],
  ['.project-card h3', [['ACO hybride & apprentissage automatique', 'Hybrid ACO & machine learning'], ['Analyse de données & prévision', 'Data analysis & forecasting'], ['Gestion d’abonnements & services bancaires ouverts', 'Subscriptions & open banking'], ['Plateforme CRM en ligne multi-client', 'Multi-tenant online CRM platform'], ['Anonymisation des données', 'Data anonymisation']]],
  ['.project-card > p', [['Approche combinant l’optimisation par colonies de fourmis et l’apprentissage automatique pour résoudre le problème du sac à dos. Expérimentation reproductible sur 26 instances × 5 exécutions : gain moyen de 0,47 % face à l’ACO classique, avec p < 0,0001.', 'An approach combining Ant Colony Optimisation and machine learning to solve the knapsack problem. Reproducible experiment on 26 instances × 5 runs: average improvement of 0.47% over classic ACO, with p < 0.0001.'], ['Préparation et segmentation de données marketing par clustering, puis prévisions avec Prophet pour appuyer la décision.', 'Preparation and segmentation of marketing data through clustering, followed by Prophet forecasting to support decisions.'], ['Pipeline de détection d’abonnements, scoring multicritère, identification d’anomalies et recommandations automatiques. Tests, conteneurisation et CI/CD.', 'A subscription detection pipeline with multi-criteria scoring, anomaly detection and automated recommendations. Testing, containerisation and CI/CD.'], ['CRM avec pipeline Kanban, indicateurs temps réel, recherche, export CSV et isolation des données par Row Level Security.', 'CRM with Kanban pipeline, real-time indicators, search, CSV export and data isolation through Row Level Security.'], ['Étude comparative des techniques d’anonymisation et évaluation de leur impact sur la qualité, l’utilité et la performance des données.', 'Comparative study of anonymisation techniques and their impact on data quality, usefulness and performance.']]],
  ['.project-note-link', ['Lire le résumé', 'Read the summary']],
  ['.project-download', ['Télécharger le mémoire PDF', 'Download thesis PDF']],
  ['#capabilities .section-kicker', ['04 / Compétences', '04 / Skills']],
  ['#capabilities h2', ['Compétences en mouvement.', 'Skills in motion.']],
  ['.skill-category', [['Science des données & IA', 'Data Science & AI'], ['Données & BI', 'Data & BI'], ['Développement logiciel', 'Software development'], ['Déploiement', 'Deployment'], ['Méthodes', 'Methods']]],
  ['#formation .section-kicker', ['05 / Formation', '05 / Education']],
  ['#formation h2', ['Formation.', 'Education.']],
  ['#certifications .section-kicker', ['06 / Certifications', '06 / Certifications']],
  ['#certifications h2', ['Certifications.', 'Certifications.']],
  ['.letter-section .section-kicker', ['07 / Motivation', '07 / Motivation']],
  ['.letter-section h2', ['Apprendre, construire, progresser.', 'Learn, build, grow.']],
  ['.letter-content p', ['Je suis motivé par les projets qui demandent de comprendre, d’apprendre et de construire. Mon parcours relie Data Science, IA et développement web : je cherche à me diversifier, à progresser au contact d’équipes exigeantes et à transformer chaque expérience en compétence concrète.', 'I am driven by projects that require understanding, learning and building. My background connects Data Science, AI and web development: I keep broadening my skills, learning from demanding teams and turning each experience into practical expertise.']],
  ['.letter-actions span', ['Télécharger la lettre complète', 'Download the full letter']],
  ['.footer-links a', [['Profil', 'Profile'], ['Parcours', 'Experience'], ['Projets', 'Projects']]]
];

const originalLanguageValues = new Map();

function elementsFor(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function normaliseValues(values, elements) {
  if (values.length === elements.length && Array.isArray(values[0])) return values;
  return elements.map(() => values);
}

function translatedValue(values, index, elements, language) {
  if (language !== 'en') return null;
  if (values.length === elements.length && Array.isArray(values[index])) return values[index][1];
  return values[1];
}

function applyLanguage(language) {
  languageGroups.forEach(([selector, values]) => {
    const elements = elementsFor(selector);
    if (!elements.length) return;
    const originalValues = elements.map((element) => element.textContent);
    if (!originalLanguageValues.has(selector)) originalLanguageValues.set(selector, originalValues);
    const englishValues = normaliseValues(values, elements);
    elements.forEach((element, index) => {
      element.textContent = language === 'en'
        ? translatedValue(values, index, elements, language)
        : originalLanguageValues.get(selector)[index];
    });
  });

  document.documentElement.lang = language === 'en' ? 'en' : 'fr';
  document.title = language === 'en' ? 'Aziz Intelligence | Data Science & AI' : originalDocumentTitle;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = language === 'en' ? 'Aziz Intelligence — Data Science & Artificial Intelligence' : originalMetaDescription;
  if (languageButton) {
    languageButton.setAttribute('aria-pressed', String(language === 'en'));
    languageButton.setAttribute('aria-label', language === 'en' ? 'Switch the website to French' : 'Passer le site en anglais');
  }
  if (languageCurrent) languageCurrent.textContent = language === 'en' ? 'EN' : 'FR';
  localStorage.setItem('aziz-language', language);
}

const savedLanguage = localStorage.getItem('aziz-language') || 'fr';
languageButton?.addEventListener('click', () => {
  applyLanguage(document.documentElement.lang === 'fr' ? 'en' : 'fr');
});
applyLanguage(savedLanguage);

