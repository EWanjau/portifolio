/**
 * contact.js — Contact form with localStorage persistence
 */

const Contact = {
  initialized: false,

  init() {
    if (this.initialized) return;
    this.initialized = true;
    this.bindEvents();
  },

  bindEvents() {
    document.getElementById('contact-form').addEventListener('submit', e => {
      e.preventDefault();
      this.sendMessage();
    });
  },

  sendMessage() {
    const name    = document.getElementById('c-name').value.trim();
    const email   = document.getElementById('c-email').value.trim();
    const subject = document.getElementById('c-subject').value.trim();
    const message = document.getElementById('c-message').value.trim();

    if (!name || !email || !message) {
      Toast.show('Name, email, and message are required', 'error');
      return;
    }

    if (!this.validEmail(email)) {
      Toast.show('Please enter a valid email address', 'error');
      return;
    }

    Storage.addItem(KEYS.messages, { name, email, subject, message });
    document.getElementById('contact-form').reset();
    Toast.show('Message sent! I\'ll get back to you soon ✉️', 'success');
  },

  validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },
};
