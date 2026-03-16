/**
 * storage.js — localStorage CRUD helpers
 */

const KEYS = {
  projects:     'portfolio_projects',
  testimonials: 'portfolio_testimonials',
  messages:     'portfolio_contact_messages',
  theme:        'portfolio_theme',
  version:      'portfolio_data_version',
};

// Data version — bump this to force-reset seed data
const DATA_VERSION = 'v2-erasto';

const Storage = {
  getAll(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch { return []; }
  },

  saveAll(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },

  addItem(key, item) {
    const items = this.getAll(key);
    item.id = `${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
    item.createdAt = new Date().toISOString();
    items.push(item);
    this.saveAll(key, items);
    return item;
  },

  deleteItem(key, id) {
    const items = this.getAll(key).filter(i => i.id !== id);
    this.saveAll(key, items);
  },

  getTheme() {
    return localStorage.getItem(KEYS.theme) || 'light';
  },

  setTheme(theme) {
    localStorage.setItem(KEYS.theme, theme);
  },

  // Called once on boot — clears seeded data if version changed
  checkVersion() {
    const saved = localStorage.getItem(KEYS.version);
    if (saved !== DATA_VERSION) {
      localStorage.removeItem(KEYS.projects);
      localStorage.removeItem(KEYS.testimonials);
      localStorage.setItem(KEYS.version, DATA_VERSION);
    }
  },
};
