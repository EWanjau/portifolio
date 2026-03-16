/**
 * router.js — Hash-based SPA router
 */

const Router = {
  sections: ['home', 'projects', 'testimonials', 'contact'],

  init() {
    window.addEventListener('hashchange', () => this.navigate());
    this.navigate();
  },

  navigate() {
    const hash = window.location.hash.replace('#', '') || 'home';
    const target = this.sections.includes(hash) ? hash : 'home';

    // Update sections visibility
    this.sections.forEach(id => {
      const el = document.getElementById(`section-${id}`);
      if (el) el.classList.toggle('active', id === target);
    });

    // Update nav link active states
    document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
      const href = a.getAttribute('href')?.replace('#', '');
      a.classList.toggle('active', href === target);
    });

    // Close mobile menu on navigate
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburger  = document.getElementById('hamburger');
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (hamburger)  hamburger.classList.remove('open');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Trigger section init hooks
    if (target === 'projects')     Projects.render();
    if (target === 'testimonials') Testimonials.render();
    if (target === 'contact')      Contact.init();
  },

  go(hash) {
    window.location.hash = hash;
  },
};
