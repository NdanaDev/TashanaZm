# Tashana Zm — Portfolio Website

A professional portfolio website for **Tashana Zm**, a multi-talented creative from Zambia. Built as a static site with a modern, full-viewport scroll-snap layout.

## Services Showcased

- **Event Show Host** — Emcee services for corporate and entertainment events
- **TV Presenter** — On-screen presenting and media work
- **Recording Artist** — Music portfolio and discography
- **Commercial & Editorial Model** — Modelling portfolio and campaign work
- **Academic Leadership** — Academic and leadership profile

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic) |
| Styling | CSS3 (Grid, Flexbox, scroll-snap) |
| Interactivity | Vanilla JavaScript |
| Fonts | Google Fonts — Lato, Montserrat |
| Icons | Font Awesome 6 |
| Galleries | Lightbox2 |
| Carousels | Swiper.js |
| Forms | FormSubmit.co |

No build system or package manager required.

## Project Structure

```
TashanaZm/
├── index.html                        # Main landing page (scroll-snap SPA)
├── styles.css                        # Global styles
├── js/
│   └── hero-animations.js            # Hero section animations
├── event-host-details.html/css       # Event Host detail page
├── tv-presenter-details.html/css     # TV Presenter detail page
├── recording-artist-details.html     # Recording Artist detail page
├── commercial-editorial-details.html/css
├── academic-leadership-details.html/css
├── thank-you.html                    # Form submission confirmation
├── 404.html                          # Custom 404 page
└── Pictures/                         # All images and video assets
```

## Local Development

Run any static file server from the project root:

```bash
npx http-server . -p 8080
```

Or use the **VS Code Live Server** extension (configured on port 5501).

## Deployment

The site is configured for **GitHub Pages** — push to the `main` branch and it deploys automatically. The entry point is `index.html`.

## Responsive Breakpoints

| Breakpoint | Target |
|-----------|--------|
| 480px | Small mobile |
| 768px | Tablet |
| 1200px | Desktop |

## Accessibility

- Skip-to-content link for keyboard users
- ARIA labels on interactive elements
- Semantic HTML landmarks
- Supports `prefers-reduced-motion`
- High-contrast focus states
