/**
 * home.js — Home section logic (stats counter animation)
 */

const Home = {
  init() {
    this.animateCounters();
  },

  animateCounters() {
    const counters = document.querySelectorAll('.stat-num[data-target]');
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target, 10);
      const suffix = counter.dataset.suffix || '';
      let current  = 0;
      const step   = Math.max(1, Math.floor(target / 60));
      const tick   = () => {
        current = Math.min(current + step, target);
        counter.textContent = current + suffix;
        if (current < target) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  },
};
