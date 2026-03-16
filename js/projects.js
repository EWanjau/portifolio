/**
 * projects.js — Projects section (localStorage + hidden admin panel)
 */

const Projects = {
  ADMIN_PASS: 'dev123',
  isUnlocked: false,

  defaultProjects: [
    {
      id: 'seed-1',
      title: 'Shopify E-Commerce Store',
      description: 'Designed, developed, and deployed a conversion-optimised Shopify store for a mid-sized retail business. Delivered responsive, SEO-ready product pages with integrated payment and inventory management.',
      tech: ['Shopify', 'Liquid', 'SEO', 'CSS'],
      liveUrl: '#',
      githubUrl: '#',
      emoji: '🛍️',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'seed-2',
      title: 'WordPress Business Website',
      description: 'Built and maintained a full WordPress website for an SME client — including custom theme development, plugin configuration, performance optimisation, and post-launch support.',
      tech: ['WordPress', 'PHP', 'CSS', 'SEO'],
      liveUrl: '#',
      githubUrl: '#',
      emoji: '💼',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'seed-3',
      title: 'AI Workflow Automation Platform',
      description: 'Led development of AI-powered workflow automations integrated into web platforms at Cyberage Technologies, improving operational efficiency and reducing manual processing for clients.',
      tech: ['Python', 'AI/ML', 'REST APIs', 'WordPress'],
      liveUrl: '#',
      githubUrl: '#',
      emoji: '🤖',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'seed-4',
      title: 'GracePoint Church Website',
      description: 'Developed, deployed, and maintained the GracePoint Church WordPress website, improving online visibility and community engagement. Administered domain email and hosting infrastructure.',
      tech: ['WordPress', 'Web Hosting', 'Domain & Email', 'CSS'],
      liveUrl: '#',
      githubUrl: '#',
      emoji: '⛪',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'seed-5',
      title: 'SEO & Conversion Optimisation',
      description: 'Optimised site performance, accessibility, and usability for 5+ production websites using modern frontend best practices — improving load times, search rankings, and conversion rates.',
      tech: ['SEO', 'HTML', 'CSS', 'JavaScript'],
      liveUrl: '#',
      githubUrl: '#',
      emoji: '📈',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'seed-6',
      title: 'Web Hosting & Infrastructure Setup',
      description: 'Configured and managed web hosting environments, domain systems, SSL certificates, and email infrastructure for multiple client projects — ensuring high availability and security.',
      tech: ['UNIX/Linux', 'Shell Scripting', 'Web Hosting', 'Domain Systems'],
      liveUrl: '#',
      githubUrl: '#',
      emoji: '🖥️',
      createdAt: new Date().toISOString(),
    },
  ],

  init() {
    // Seed default data only on first visit
    if (!localStorage.getItem(KEYS.projects)) {
      Storage.saveAll(KEYS.projects, this.defaultProjects);
    }
    this.bindEvents();
    this.render();
  },

  bindEvents() {
    // Lock toggle button
    document.getElementById('lock-btn').addEventListener('click', () => {
      if (this.isUnlocked) {
        this.lock();
      } else {
        this.promptPassword();
      }
    });

    // Add project form submission
    document.getElementById('add-project-form').addEventListener('submit', e => {
      e.preventDefault();
      this.addProject();
    });

    // Modal close
    document.getElementById('project-modal-close').addEventListener('click', () => {
      this.closeModal();
    });
    document.getElementById('project-modal-overlay').addEventListener('click', e => {
      if (e.target === e.currentTarget) this.closeModal();
    });

    // Add project button
    document.getElementById('add-project-btn').addEventListener('click', () => {
      document.getElementById('project-modal-overlay').classList.add('open');
    });
  },

  promptPassword() {
    const pass = prompt('🔒 Enter admin password to manage projects:');
    if (pass === this.ADMIN_PASS) {
      this.unlock();
      Toast.show('Admin mode enabled', 'success');
    } else if (pass !== null) {
      Toast.show('Incorrect password', 'error');
    }
  },

  unlock() {
    this.isUnlocked = true;
    document.getElementById('lock-btn').textContent = '🔓 Lock';
    document.getElementById('lock-btn').classList.add('unlocked');
    document.getElementById('admin-bar').classList.add('visible');
    document.getElementById('projects-grid').classList.add('admin-unlocked');
  },

  lock() {
    this.isUnlocked = false;
    document.getElementById('lock-btn').textContent = '🔒 Manage';
    document.getElementById('lock-btn').classList.remove('unlocked');
    document.getElementById('admin-bar').classList.remove('visible');
    document.getElementById('projects-grid').classList.remove('admin-unlocked');
  },

  render() {
    const grid     = document.getElementById('projects-grid');
    const projects = Storage.getAll(KEYS.projects);
    grid.innerHTML  = '';

    if (projects.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📁</div>
          <p>No projects yet. Unlock admin to add one.</p>
        </div>`;
      return;
    }

    projects.forEach(p => {
      grid.innerHTML += this.cardHTML(p);
    });

    // Bind delete buttons
    grid.querySelectorAll('.delete-project-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm(`Delete "${btn.dataset.title}"?`)) {
          Storage.deleteItem(KEYS.projects, btn.dataset.id);
          Toast.show('Project deleted');
          this.render();
        }
      });
    });
  },

  cardHTML(p) {
    const tags = (p.tech || []).map(t => `<span class="tag">${t}</span>`).join('');
    return `
      <div class="card project-card">
        <div class="project-img">${p.emoji || '💻'}</div>
        <div class="project-body">
          <h3>${this.escape(p.title)}</h3>
          <p>${this.escape(p.description)}</p>
          <div class="project-tags">${tags}</div>
          <div class="project-footer">
            <div class="project-links">
              ${p.liveUrl && p.liveUrl !== '#' ? `<a href="${p.liveUrl}" target="_blank" rel="noopener" class="icon-link" title="Live site">🌐</a>` : ''}
              ${p.githubUrl && p.githubUrl !== '#' ? `<a href="${p.githubUrl}" target="_blank" rel="noopener" class="icon-link" title="GitHub">🐙</a>` : ''}
            </div>
            <div class="project-admin-actions">
              <button class="btn btn-danger btn-sm delete-project-btn"
                      data-id="${p.id}" data-title="${this.escape(p.title)}">Delete</button>
            </div>
          </div>
        </div>
      </div>`;
  },

  addProject() {
    const title       = document.getElementById('proj-title').value.trim();
    const description = document.getElementById('proj-desc').value.trim();
    const techRaw     = document.getElementById('proj-tech').value.trim();
    const liveUrl     = document.getElementById('proj-live').value.trim() || '#';
    const githubUrl   = document.getElementById('proj-github').value.trim() || '#';
    const emoji       = document.getElementById('proj-emoji').value.trim() || '💻';

    if (!title || !description) {
      Toast.show('Title and description are required', 'error');
      return;
    }

    const tech = techRaw ? techRaw.split(',').map(t => t.trim()).filter(Boolean) : [];
    Storage.addItem(KEYS.projects, { title, description, tech, liveUrl, githubUrl, emoji });

    document.getElementById('add-project-form').reset();
    this.closeModal();
    this.render();
    Toast.show('Project added! 🎉', 'success');
  },

  closeModal() {
    document.getElementById('project-modal-overlay').classList.remove('open');
  },

  escape(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  },
};
