# Erasto Wanjau — Modern Minimal Portfolio

A clean, modern, and minimal single-page portfolio website for a Web Developer & E-Commerce specialist. Built with pure vanilla technologies — no frameworks, no bloat.

## 🚀 Features

- **Single Page Application (SPA)**: Smooth hash-based routing between sections without page reloads.
- **Light & Dark Mode**: Modern theme toggle with persistent preference saving.
- **Hidden Admin Panel**: Discreet project management (Add/Delete) hidden behind a password.
- **Local Persistence**: All project data, testimonials, and contact messages are stored in `localStorage`.
- **Responsive Design**: Mobile-first approach that looks great on desktops, tablets, and phones.
- **Modern UI**: Clean typography (Inter font), subtle animations, and plenty of whitespace.

## 🛠️ Tech Stack

- **HTML5**: Semantic markup for better SEO and accessibility.
- **CSS3**: Modern layouts using Flexbox and Grid, custom properties for theming.
- **Vanilla JavaScript**: Pure logic for routing, state management, and DOM manipulation.
- **LocalStorage**: Used as a lightweight no-backend database for immediate interactivity.

## 📂 Project Structure

```text
portfolio/
├── index.html          # Main SPA shell and content
├── README.md           # Documentation
├── css/
│   └── styles.css      # Design system and component styles
├── js/
│   ├── app.js          # App bootstrap and common logic
│   ├── storage.js      # LocalStorage CRUD helpers
│   ├── router.js       # Hash-based routing logic
│   ├── home.js         # Home section scripts
│   ├── projects.js     # Project management logic
│   ├── testimonials.js # Testimonials handling
│   └── contact.js      # Contact form validation and saving
└── assets/             # Images and design assets
```

## 🔒 Admin Access

The project management tools are hidden by default. To access them:
1. Go to the **Projects** section.
2. Click the small **🔒 Manage** button in the header.
3. Enter the admin password: `dev123`

Once unlocked, you can add new projects via a modal form or delete existing ones directly from the grid.

## 💻 How to Run

Since this is a vanilla web project, you can run it in two ways:

1. **Directly**: Open `index.html` in any modern web browser.
2. **Local Server (Recommended)**: Use a lightweight server for better handling of assets and routing.
   - Using Python: `python3 -m http.server 3030`
   - Using Node: `npx serve .`

Access the site at `http://localhost:3030`.

---
*Built for Erasto Wamuti Wanjau*
