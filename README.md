# House of Blue Beans – IT Help Centre

Internal IT guides website for employees. Built with plain HTML/CSS and served via Nginx in Docker.

## Project structure

```
it-help-centre/
├── index.html               # Homepage with guide cards
├── assets/
│   └── style.css            # Shared stylesheet
├── guides/
│   └── raise-it-ticket.html # Guide: How to raise a support ticket
├── Dockerfile
└── docker-compose.yml
```

## Adding a new guide

1. Create `guides/your-guide-name.html` (copy an existing guide as a template).
2. Add a card for it in `index.html` inside the `.card-grid` div.
3. Remove the `coming-soon` class from the card and add `href="guides/your-guide-name.html"` to the link.

## Running with Docker

```bash
# Clone and start
git clone <repo-url>
cd it-help-centre
docker compose up -d --build

# View at http://YOUR-SERVER-IP:8080

# Stop
docker compose down
```

## Adding real screenshots

Place images in `assets/images/` and replace the `screenshot-placeholder` divs in each guide with:
```html
<img src="../assets/images/your-screenshot.png" alt="Description" style="width:100%;border-radius:8px;border:1px solid #e2e8f0;" />
```
