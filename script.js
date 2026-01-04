// ==============================
// TAB NAVIGATION (APP SECTIONS)
// ==============================

const tabLinks = document.querySelectorAll('.sidebar a[data-section]');
const sections = document.querySelectorAll('.content');

function activateTab(targetId) {
  // Remove active states
  tabLinks.forEach(l => l.classList.remove('active'));
  sections.forEach(sec => sec.classList.remove('active'));

  // Find the matching link and section
  const activeLink = document.querySelector(`.sidebar a[data-section="${targetId}"]`);
  const activeSection = document.getElementById(targetId);

  // Activate them
  if (activeLink) activeLink.classList.add('active');
  if (activeSection) activeSection.classList.add('active');
}

tabLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const target = link.dataset.section;
    if (!target) return;

    e.preventDefault();
    activateTab(target);
    
    // Optional: Update URL hash without scrolling
    history.pushState(null, null, `#${target}`);
  });
});

// ==============================
// HANDLE INITIAL LOAD & HASHES
// ==============================

window.addEventListener('DOMContentLoaded', () => {
  // Check if URL has a hash (e.g., index.html#videos)
  const hash = window.location.hash.substring(1); // remove '#'
  
  if (hash && document.getElementById(hash)) {
    activateTab(hash);
  } else {
    // Default to 'home' if no hash or invalid hash
    activateTab('home');
  }
  
  // Apply saved theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);
});

// ==============================
// THEME TOGGLE (DARK / LIGHT)
// ==============================

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

function applyTheme(theme) {
  if (theme === 'light') {
    body.classList.add('light');
    body.classList.remove('dark');
    if(themeToggle) themeToggle.innerText = '☀️';
  } else {
    body.classList.add('dark');
    body.classList.remove('light');
    if(themeToggle) themeToggle.innerText = '🌙';
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = body.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
}
