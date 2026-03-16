/**
 * testimonials.js — Testimonials section (localStorage)
 */

const Testimonials = {
  defaultTestimonials: [
    {
      id: 'tseed-1',
      name: 'James Kariuki',
      role: 'Business Owner',
      company: 'Retail SME, Nairobi',
      message: 'Erasto built our Shopify store from scratch and it has been a game-changer. Our online sales increased significantly within the first month. Very professional and reliable.',
      stars: 5,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'tseed-2',
      name: 'Mary Otieno',
      role: 'Operations Manager',
      company: 'Cyberage Technologies',
      message: 'Working with Erasto on the AI automation integrations was exceptional. He delivered on time, communicated clearly throughout the project, and the solution reduced our manual workload drastically.',
      stars: 5,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'tseed-3',
      name: 'Pastor David Mwangi',
      role: 'Lead Pastor',
      company: 'GracePoint Church',
      message: 'Erasto has been an incredible volunteer for our church. He built our website, set up our email systems, and continues to maintain everything with great professionalism and a servant heart.',
      stars: 5,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'tseed-4',
      name: 'Angela Njoroge',
      role: 'Marketing Director',
      company: 'StartUp Kenya',
      message: 'Our WordPress site was completely revamped by Erasto. The performance improvements and SEO optimization led to a noticeable increase in organic traffic. Highly recommend!',
      stars: 5,
      createdAt: new Date().toISOString(),
    },
  ],

  init() {
    if (!localStorage.getItem(KEYS.testimonials)) {
      Storage.saveAll(KEYS.testimonials, this.defaultTestimonials);
    }
    this.bindEvents();
    this.render();
  },

  bindEvents() {
    document.getElementById('testimonial-form').addEventListener('submit', e => {
      e.preventDefault();
      this.addTestimonial();
    });
  },

  render() {
    const grid  = document.getElementById('testimonials-grid');
    const items = Storage.getAll(KEYS.testimonials);
    grid.innerHTML = '';

    if (items.length === 0) {
      grid.innerHTML = `<div class="empty-state"><div class="empty-state-icon">💬</div><p>No testimonials yet. Be the first!</p></div>`;
      return;
    }

    [...items].reverse().forEach(t => {
      grid.innerHTML += this.cardHTML(t);
    });
  },

  cardHTML(t) {
    const initials = t.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const stars    = '★'.repeat(t.stars) + '☆'.repeat(5 - t.stars);
    return `
      <div class="card testimonial-card">
        <div class="testimonial-quote">"</div>
        <p class="testimonial-text">${this.escape(t.message)}</p>
        <div class="testimonial-meta">
          <div class="avatar">${initials}</div>
          <div class="avatar-info">
            <strong>${this.escape(t.name)}</strong>
            <span>${this.escape(t.role)}${t.company ? ' · ' + this.escape(t.company) : ''}</span>
          </div>
          <div class="stars-display" title="${t.stars} stars">${stars}</div>
        </div>
      </div>`;
  },

  addTestimonial() {
    const name    = document.getElementById('t-name').value.trim();
    const role    = document.getElementById('t-role').value.trim();
    const company = document.getElementById('t-company').value.trim();
    const message = document.getElementById('t-message').value.trim();
    const starsEl = document.querySelector('input[name="t-stars"]:checked');
    const stars   = starsEl ? parseInt(starsEl.value, 10) : 5;

    if (!name || !message) {
      Toast.show('Name and message are required', 'error');
      return;
    }

    Storage.addItem(KEYS.testimonials, { name, role, company, message, stars });
    document.getElementById('testimonial-form').reset();
    this.render();
    Toast.show('Thank you for your testimonial! 🙏', 'success');
  },

  escape(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  },
};
