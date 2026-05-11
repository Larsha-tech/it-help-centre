# House of Blue Beans — IT Help Centre

Internal IT guides website for House of Blue Beans employees. Built with plain HTML/CSS/JS and served via Nginx in Docker. No frameworks, no build step.

**Live features:**
- Dark / light mode with `localStorage` persistence
- Full-text search on the homepage and All Guides library
- Category filter pills (Ticketing, Remote Access)
- Responsive layout — mobile nav, hamburger menu
- Guide pages: sticky TOC sidebar, scroll progress bar, read-time estimate, copy buttons, image lightbox, related-guide card, back-to-top button

---

## Project structure

```
it-help-centre/
├── index.html                   # Homepage — hero, guide cards, contact section
├── guides/
│   ├── all-guides.html          # Full guide library with search & category filters
│   ├── raise-it-ticket.html     # Guide: How to raise an IT support ticket
│   └── parallels-ras.html       # Guide: Access your office PC remotely
├── assets/
│   ├── style.css                # Main stylesheet (dark + light mode, all components)
│   ├── doc.css                  # Guide-page-specific styles (TOC, progress bar, lightbox)
│   ├── guides-lib.css           # All Guides library page styles
│   ├── main.js                  # All interactive behaviour (theme, nav, TOC, search, etc.)
│   └── images/
│       └── logo.png             # Site logo / favicon
├── deploy.sh                    # Pull latest & rebuild Docker container
├── Dockerfile
└── docker-compose.yml
```

---

## Running with Docker

```bash
# Clone and start
git clone https://github.com/Larsha-tech/it-help-centre.git
cd it-help-centre
docker compose up -d --build

# Available at http://YOUR-SERVER-IP:8080

# Stop
docker compose down
```

### Deploy updates (on the server)

```bash
bash deploy.sh
```

`deploy.sh` pulls the latest code from `master` and rebuilds the container automatically.

---

## Adding a new guide

1. Copy an existing guide as a template:
   ```bash
   cp guides/raise-it-ticket.html guides/your-guide-name.html
   ```
2. Edit the new file — update the `<title>`, breadcrumb, and all content inside `.doc-body`.
3. Add a card to **`index.html`** inside `.card-grid`:
   ```html
   <a class="gcard" href="guides/your-guide-name.html" data-category="your-category">
     <div class="gc-top">
       <div class="gc-icon ic-blue">🔧</div>
       <span class="gc-badge bd-blue">Category</span>
     </div>
     <h2 class="gc-title">Guide Title</h2>
     <p class="gc-desc">Short description of the guide.</p>
     <div class="gc-footer">
       <span class="gc-cta">Read guide
         <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
       </span>
     </div>
   </a>
   ```
4. Add a matching card to **`guides/all-guides.html`** inside the correct `.lib-section` (or create a new section for a new category).
5. Add a filter pill button in both `index.html` and `all-guides.html` if introducing a new category.

### Adding screenshots to a guide

Place images in `assets/images/` and use the `.doc-img` class so the lightbox activates on click:

```html
<img class="doc-img" src="../assets/images/your-screenshot.png" alt="Description of screenshot" />
```

---

## Branches

| Branch | Purpose |
|---|---|
| `master` | Active development — always deployable |
| `backup/clean-state` | Mirror of `master`, kept in sync after every push |

---

## Contact

IT Helpdesk: [ithelpdesk@houseofbluebeans.com](mailto:ithelpdesk@houseofbluebeans.com)  
GLPI Portal: [ticket.hobb-dashboard.com](https://ticket.hobb-dashboard.com)
