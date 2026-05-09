/* Search — filter guide cards by title/description */
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', function () {
    const q = this.value.trim().toLowerCase();
    document.querySelectorAll('.gcard').forEach(function (card) {
      const text = card.textContent.toLowerCase();
      card.style.display = (!q || text.includes(q)) ? '' : 'none';
    });
  });
}

/* Smooth scroll for nav anchor links */
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    const id = this.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── "In this article" TOC sidebar for guide pages ── */
(function () {
  const docBody = document.querySelector('.doc-body');
  const docWrap = document.querySelector('.doc-wrap');
  if (!docBody || !docWrap) return;

  const headings = Array.from(docBody.querySelectorAll('h4'));
  if (headings.length < 2) return;

  /* Assign stable IDs to each heading */
  headings.forEach(function (h) {
    if (!h.id) {
      h.id = h.textContent.trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 60);
    }
  });

  /* Build sidebar */
  const aside = document.createElement('aside');
  aside.className = 'toc-sidebar';

  const label = document.createElement('div');
  label.className = 'toc-label';
  label.innerHTML = 'In this article <span class="toc-chevron">&#8963;</span>';

  const nav = document.createElement('nav');
  nav.className = 'toc-nav';

  headings.forEach(function (h) {
    const a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent.trim();
    a.addEventListener('click', function (e) {
      e.preventDefault();
      h.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    nav.appendChild(a);
  });

  aside.appendChild(label);
  aside.appendChild(nav);

  /* Activate grid layout and inject sidebar */
  docWrap.classList.add('has-toc');
  docWrap.insertBefore(aside, docBody);

  /* Highlight active section on scroll */
  const links = Array.from(nav.querySelectorAll('a'));

  function setActive(id) {
    links.forEach(function (a) {
      a.classList.toggle('toc-active', a.getAttribute('href') === '#' + id);
    });
  }

  /* Set first item active by default */
  if (headings[0]) setActive(headings[0].id);

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-10% 0px -80% 0px' });

  headings.forEach(function (h) { observer.observe(h); });
})();
