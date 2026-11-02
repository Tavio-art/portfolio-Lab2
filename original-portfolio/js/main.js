'use strict';

/* 1. Dark / light mode (choice saved in localStorage) */
const root = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');

function syncThemeLabel() {
  const dark = root.classList.contains('dark');
  themeBtn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
}
themeBtn.addEventListener('click', () => {
  const dark = root.classList.toggle('dark');
  try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) { /* storage blocked */ }
  syncThemeLabel();
});
syncThemeLabel();

/* 2. Mobile menu toggle */
const menuBtn = document.getElementById('menu-toggle');
const menu = document.getElementById('mobile-menu');

function setMenu(open) {
  menu.classList.toggle('hidden', !open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuBtn.focus();
  }
});

/* 3. Highlight the nav link of the section in view */
const navLinks = document.querySelectorAll('[data-nav]');
const sections = document.querySelectorAll('main section[id]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      const match = link.getAttribute('href') === '#' + entry.target.id;
      if (match) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach((s) => observer.observe(s));

/* 4. Filters (used for both skills and projects) */
function setupFilter(buttonsId, listId, getValues) {
  const group = document.getElementById(buttonsId);
  const items = document.querySelectorAll('#' + listId + ' > *');
  group.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-filter]');
    if (!btn) return;
    const filter = btn.dataset.filter;
    group.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    items.forEach((item) => {
      const show = filter === 'all' || getValues(item).includes(filter);
      item.classList.toggle('hidden', !show);
    });
  });
}
setupFilter('skill-filters', 'skill-list', (el) => el.dataset.level.split(' '));
setupFilter('project-filters', 'project-list', (el) => el.dataset.category.split(' '));

/* 5. Project details dialog (text set with textContent, never innerHTML) */
const projects = {
  sari: {
    title: 'Sari-Sari Store App',
    text: 'An app concept for managing a small neighborhood store. It includes a home screen, an inventory list, a profile page, and a sign-up flow.',
    tools: ['Figma', '[Add your other tools]'],
    learned: '[Write one or two sentences about what you learned building this.]'
  },
  ucu: {
    title: 'UCU CITE Tracker (Figma design)',
    text: 'A Figma design for a graduate tracer system. It has a sidebar with Dashboard, Reports, Graduates, and Settings, forms for general, educational, and employment information, and light and dark modes.',
    tools: ['Figma'],
    learned: '[Write what you learned about designing dashboards and forms.]',
    link: 'https://www.figma.com/design/ecnOQLWsm3lKOdC4hFjg6a/UCU-CITE-Tracker?node-id=0-1'
  },
  blender: {
    title: 'Blender 3D Project',
    text: '[Describe what you modeled in Blender.]',
    tools: ['Blender'],
    learned: '[Write what you learned about 3D modeling.]'
  },
  animation: {
    title: 'Baby Red Dragon',
    text: 'A Blender animation of a baby red dragon. [Add what happens in it and how you made it.]',
    tools: ['Blender'],
    learned: '[Write what you learned about animation.]'
  },
  portfolio: {
    title: 'This Portfolio Website',
    text: 'A single-page portfolio with six sections, a dark mode, filters, a project dialog, and a contact form that validates input in the browser.',
    tools: ['HTML', 'Tailwind CSS', 'JavaScript'],
    learned: '[Write what you learned about responsive layouts and accessibility.]'
  }
};

const dialog = document.getElementById('project-dialog');
const dTitle = document.getElementById('dialog-title');
const dText = document.getElementById('dialog-text');
const dTools = document.getElementById('dialog-tools');
const dLearned = document.getElementById('dialog-learned');
const dLink = document.getElementById('dialog-link');

document.getElementById('project-list').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-project]');
  if (!btn) return;
  const p = projects[btn.dataset.project];
  if (!p) return;
  dTitle.textContent = p.title;
  dText.textContent = p.text;
  dLearned.textContent = p.learned;
  if (p.link) {
    dLink.href = p.link;
    dLink.classList.remove('hidden');
  } else {
    dLink.removeAttribute('href');
    dLink.classList.add('hidden');
  }
  dTools.replaceChildren();
  p.tools.forEach((tool) => {
    const li = document.createElement('li');
    li.className = 'pill';
    li.textContent = tool;
    dTools.appendChild(li);
  });
  dialog.showModal();
  document.body.classList.add('overflow-hidden');
});
document.getElementById('dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); }); /* click on backdrop */
dialog.addEventListener('close', () => document.body.classList.remove('overflow-hidden'));

/* 6. Contact form validation (front-end only, nothing is sent) */
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const rules = {
  name: (v) => (v.trim().length < 2 ? 'Enter your name (at least 2 characters).' : ''),
  email: (v) => (emailPattern.test(v.trim()) ? '' : 'Enter a valid email, like name@example.com.'),
  message: (v) => (v.trim().length < 10 ? 'Write a message of at least 10 characters.' : '')
};

function validateField(field) {
  const error = rules[field.name](field.value);
  document.getElementById(field.id + '-error').textContent = error;
  field.setAttribute('aria-invalid', String(error !== ''));
  return error === '';
}

Object.keys(rules).forEach((name) => {
  const field = form.elements[name];
  field.addEventListener('blur', () => validateField(field));
  field.addEventListener('input', () => {
    if (field.getAttribute('aria-invalid') === 'true') validateField(field);
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  formStatus.textContent = '';
  const fields = Object.keys(rules).map((name) => form.elements[name]);
  const results = fields.map(validateField);
  const firstBad = fields[results.indexOf(false)];
  if (firstBad) {
    firstBad.focus();
    return;
  }
  formStatus.textContent = 'Thanks, ' + form.elements.name.value.trim() + '. Your message is ready to send, but this demo form does not send anything.';
  form.reset();
  fields.forEach((f) => f.removeAttribute('aria-invalid'));
});
