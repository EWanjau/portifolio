/**
 * app.js — App bootstrap: theme, toast, hamburger, init
 */

// ── Toast ───────────────────────────────────────────────
const Toast = {
  el: null,
  timer: null,

  init() {
    this.el = document.getElementById('toast');
  },

  show(msg, type = '') {
    if (!this.el) return;
    this.el.textContent = msg;
    this.el.className   = `show ${type}`;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.el.className = '';
    }, 3200);
  },
};

// ── Theme ────────────────────────────────────────────────
const Theme = {
  init() {
    const saved = Storage.getTheme();
    if (saved === 'dark') document.body.classList.add('dark');
    this.updateIcon();

    document.getElementById('theme-toggle').addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      Storage.setTheme(isDark ? 'dark' : 'light');
      this.updateIcon();
    });
  },

  updateIcon() {
    const isDark = document.body.classList.contains('dark');
    document.getElementById('theme-sun').style.opacity  = isDark ? '0.4' : '1';
    document.getElementById('theme-moon').style.opacity = isDark ? '1'   : '0.4';
  },
};

// ── Hamburger ────────────────────────────────────────────
const MobileMenu = {
  init() {
    document.getElementById('hamburger').addEventListener('click', () => {
      document.getElementById('hamburger').classList.toggle('open');
      document.getElementById('mobile-menu').classList.toggle('open');
    });
  },
};

// ── Bootstrap ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  Storage.checkVersion();   // clear stale seed data if version changed
  Toast.init();
  Theme.init();
  MobileMenu.init();
  Home.init();
  Projects.init();
  Testimonials.init();
  Router.init();
});
