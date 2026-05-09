/* ── Homepage: search filter ── */
var searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', function () {
    var q = this.value.trim().toLowerCase();
    document.querySelectorAll('.gcard').forEach(function (card) {
      card.style.display = (!q || card.textContent.toLowerCase().includes(q)) ? '' : 'none';
    });
  });
}

/* ── Homepage: smooth scroll for anchor nav links ── */
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    var id = this.getAttribute('href').slice(1);
    var target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ══════════════════════════════════════
   GUIDE PAGE FEATURES
══════════════════════════════════════ */
(function () {
  var docBody = document.querySelector('.doc-body');
  var docWrap = document.querySelector('.doc-wrap');
  if (!docBody || !docWrap) return;

  /* ── 1. Scroll progress bar ── */
  var bar = document.createElement('div');
  bar.className = 'doc-progress';
  document.body.insertBefore(bar, document.body.firstChild);
  window.addEventListener('scroll', function () {
    var scrolled = window.scrollY;
    var total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
  });

  /* ── 2. Read time + last updated meta row ── */
  var wordCount = (docBody.innerText || docBody.textContent).trim().split(/\s+/).length;
  var readMins = Math.max(1, Math.ceil(wordCount / 200));
  var updated = docBody.dataset.updated || '';

  var h1 = docBody.querySelector('h1');
  if (h1) {
    var meta = document.createElement('div');
    meta.className = 'doc-meta';
    meta.innerHTML =
      '<span class="doc-meta-item">' +
        '<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>' +
        readMins + ' min read' +
      '</span>' +
      (updated
        ? '<span class="doc-meta-item">' +
            '<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>' +
            'Updated ' + updated +
          '</span>'
        : '');
    h1.insertAdjacentElement('afterend', meta);
  }

  /* ── 3. Blockquote classification ── */
  docBody.querySelectorAll('blockquote').forEach(function (bq) {
    var text = bq.textContent.trim();
    if (/important/i.test(text)) {
      bq.classList.add('bq-warning');
    } else if (/before you start|no technical knowledge/i.test(text)) {
      bq.classList.add('bq-info');
    }
  });

  /* ── 4. Copy buttons on code elements ── */
  var copyIcon = '<svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
  docBody.querySelectorAll('code').forEach(function (code) {
    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.title = 'Copy';
    btn.innerHTML = copyIcon;
    btn.addEventListener('click', function () {
      var text = code.textContent;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function () { showCopied(btn); });
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showCopied(btn);
      }
    });
    code.insertAdjacentElement('afterend', btn);
  });

  function showCopied(btn) {
    btn.textContent = '✓';
    btn.classList.add('copied');
    setTimeout(function () {
      btn.innerHTML = copyIcon;
      btn.classList.remove('copied');
    }, 1500);
  }

  /* ── 5. Image lightbox ── */
  var overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  var lbImg = document.createElement('img');
  var closeBtn = document.createElement('button');
  closeBtn.className = 'lightbox-close';
  closeBtn.innerHTML = '&times;';
  overlay.appendChild(closeBtn);
  overlay.appendChild(lbImg);
  document.body.appendChild(overlay);

  function closeLightbox() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  docBody.querySelectorAll('.doc-img').forEach(function (img) {
    img.addEventListener('click', function () {
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay || e.target === closeBtn) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ── 6. Related guide card ── */
  var isParallels = window.location.pathname.toLowerCase().includes('parallels');
  var related = document.createElement('div');
  related.className = 'related-guides';
  related.innerHTML =
    '<div class="related-guides-label">Related guide</div>' +
    '<a class="related-card" href="' + (isParallels ? 'raise-it-ticket.html' : 'parallels-ras.html') + '">' +
      '<div class="related-card-icon">' + (isParallels ? '🎫' : '🖥️') + '</div>' +
      '<div class="related-card-text">' +
        '<strong>' + (isParallels ? 'How to Raise an IT Support Ticket' : 'How to Access Your Office PC Remotely') + '</strong>' +
        '<span>' + (isParallels ? 'Log a request or report a problem through GLPI.' : 'Connect to your office desktop securely from home.') + '</span>' +
      '</div>' +
      '<svg class="related-card-arrow" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' +
    '</a>';
  docBody.appendChild(related);

  /* Scroll to heading with offset for sticky header */
  function scrollToHeading(el) {
    var offset = 80; /* 62px header + 18px breathing room */
    var top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }

  /* ── 7. TOC — assign IDs to headings ── */
  var headings = Array.from(docBody.querySelectorAll('h4'));
  if (headings.length < 2) return;

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

  /* Desktop sidebar */
  var aside = document.createElement('aside');
  aside.className = 'toc-sidebar';
  var tocLabel = document.createElement('div');
  tocLabel.className = 'toc-label';
  tocLabel.innerHTML = 'In this article <span class="toc-chevron">&#8963;</span>';
  var tocNav = document.createElement('nav');
  tocNav.className = 'toc-nav';

  headings.forEach(function (h) {
    var a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent.trim();
    a.addEventListener('click', function (e) {
      e.preventDefault();
      scrollToHeading(h);
    });
    tocNav.appendChild(a);
  });
  aside.appendChild(tocLabel);
  aside.appendChild(tocNav);
  docWrap.classList.add('has-toc');
  docWrap.insertBefore(aside, docBody);

  /* Mobile TOC toggle */
  var mobileToc = document.createElement('div');
  mobileToc.className = 'toc-mobile';
  var mobileBtn = document.createElement('button');
  mobileBtn.className = 'toc-mobile-btn';
  mobileBtn.innerHTML = 'In this article <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>';
  var mobileList = document.createElement('div');
  mobileList.className = 'toc-mobile-list';

  headings.forEach(function (h) {
    var a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent.trim();
    a.addEventListener('click', function (e) {
      e.preventDefault();
      mobileBtn.classList.remove('open');
      mobileList.classList.remove('open');
      scrollToHeading(h);
    });
    mobileList.appendChild(a);
  });
  mobileBtn.addEventListener('click', function () {
    mobileBtn.classList.toggle('open');
    mobileList.classList.toggle('open');
  });
  mobileToc.appendChild(mobileBtn);
  mobileToc.appendChild(mobileList);

  var metaEl = docBody.querySelector('.doc-meta');
  (metaEl || h1).insertAdjacentElement('afterend', mobileToc);

  /* Active link on scroll */
  var tocLinks = Array.from(tocNav.querySelectorAll('a'));
  function setActive(id) {
    tocLinks.forEach(function (a) {
      a.classList.toggle('toc-active', a.getAttribute('href') === '#' + id);
    });
  }
  if (headings[0]) setActive(headings[0].id);

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-10% 0px -80% 0px' });
  headings.forEach(function (h) { observer.observe(h); });
})();
