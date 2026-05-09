/* ── House of Blue Beans IT Help Centre — main.js ── */

(function () {
  'use strict';

  // ── Dark / Light mode ──────────────────────────────────────
  const html         = document.documentElement;
  const themeToggle  = document.getElementById('themeToggle');
  const THEME_KEY    = 'hobb-theme';

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  const saved = localStorage.getItem(THEME_KEY)
    || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(saved);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  // ── Announcement dismiss ───────────────────────────────────
  const closeBtn       = document.getElementById('closeAnnouncement');
  const announcementBar = document.getElementById('announcementBar');
  const ANNOUN_KEY     = 'hobb-announcement-dismissed';

  if (localStorage.getItem(ANNOUN_KEY)) {
    announcementBar && announcementBar.remove();
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      announcementBar && announcementBar.remove();
      localStorage.setItem(ANNOUN_KEY, '1');
    });
  }

  // ── Search ─────────────────────────────────────────────────
  const searchInput = document.getElementById('searchInput');
  const guidesGrid  = document.getElementById('guidesGrid');
  const noResults   = document.getElementById('noResults');
  const guidesSection = document.getElementById('guides');

  function runSearch(query) {
    if (!guidesGrid) return;
    const q = query.toLowerCase().trim();
    const cards = guidesGrid.querySelectorAll('.guide-card');
    let visible = 0;

    cards.forEach(card => {
      const match = !q || card.textContent.toLowerCase().includes(q);
      card.style.display = match ? '' : 'none';
      if (match) visible++;
    });

    if (noResults) noResults.hidden = visible > 0;

    if (q && guidesSection) {
      setTimeout(() => {
        guidesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => runSearch(searchInput.value));
  }

  // Search suggestion tags
  document.querySelectorAll('.search-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      const q = tag.dataset.query || tag.textContent;
      if (searchInput) {
        searchInput.value = q;
        runSearch(q);
      }
    });
  });

  // ⌘K / Ctrl+K focuses search
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      searchInput && searchInput.focus();
    }
    if (e.key === 'Escape' && document.activeElement === searchInput) {
      searchInput.value = '';
      runSearch('');
      searchInput.blur();
    }
  });

  // ── Smooth scroll for anchor nav links ────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Header shrink on scroll ───────────────────────────────
  const header = document.querySelector('.site-header');
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (header) {
      header.style.boxShadow = y > 10
        ? '0 2px 12px rgba(0,0,0,.1)'
        : '';
    }
    lastY = y;
  }, { passive: true });

  // ── Notification bell (visual demo) ───────────────────────
  const notifBtn = document.getElementById('notifBtn');
  if (notifBtn) {
    notifBtn.addEventListener('click', () => {
      const dot = notifBtn.querySelector('.notif-dot');
      if (dot) dot.style.display = 'none';
    });
  }

})();
