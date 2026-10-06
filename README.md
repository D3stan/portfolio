# 0xpuddu.com

Personal website of Alessandro Porcheddu, live at [0xpuddu.com](https://0xpuddu.com).
React 19, Vite 7 and Tailwind, deployed to GitHub Pages.

## Features

- **Two versions of the site.** The standard site lives at `/`. A hidden
  "signal wave" version (Win95 windows, phosphor glow, CRT scanlines) lives at
  `/signal`. Both show the same content.
- **Resume as the single source.** Education, experience, projects, name,
  email and GitHub link come from the LaTeX resume in `resume/`, and the same
  files compile to the downloadable PDF.
- **Light and dark themes** in both versions, following the system setting
  until toggled.
- **Contact form** through Formspree.
- **Short links** that redirect: `/resume`, `/cv`, `/github`, `/linkedin`,
  `/email`.
- **Static meta tags** (SEO, Open Graph, Twitter) injected into `index.html`
  at build time, so crawlers see them without running JavaScript.

## Entry points

| Path | What it is |
|---|---|
| `src/main.jsx` | App bootstrap; applies the saved theme before render |
| `src/App.jsx` | Routes: `/`, `/signal` and the short links |
| `src/components/` | Standard site sections |
| `src/signal/SignalApp.jsx` | Signal wave version, lazy-loaded at `/signal` |
| `src/hooks/useSecretClick.js` | Double-clicking the navbar BatCat and name switches between the two versions; a single click still scrolls to top |
| `resume/resume.tex` | Resume header and list of sections |
| `scripts/resume-to-site.js` | Parses the resume into `src/config/resume.generated.json` |
| `.github/workflows/deploy.yml` | Builds the PDF and the site, deploys on push to `main` |

## Customisation

- **Education, experience, projects, name, email, GitHub:** edit
  `resume/sections/*.tex` and the header in `resume/resume.tex`.
  [resume/README.md](resume/README.md) covers the website-only markup
  (`\web`, `\webonly`, `\pdfonly`).
- **Everything else the site shows** (title, about text, roles, LinkedIn,
  meta tags, nav links, footer, Formspree endpoint, section labels):
  `src/config/index.js`.
- **Colours:** `src/config/theme.js` for the standard site,
  `src/signal/theme.js` for signal wave. Signal wave styles are scoped to
  `.signal-root` in `src/signal/signal.css`.
- **Images and logos:** `public/images/` and `public/logos/`. The signal wave
  backdrop is `public/images/signal/background.png`.

## Running it

Requires Node 20.

```bash
npm install
npm run dev        # dev server; rebuilds site data when a .tex file changes
npm run build      # production build into dist/
npm run preview    # serve the build
npm test           # resume parser tests
npm run lint
```

The resume PDF is not committed. `npm run resume:pdf` compiles it into
`public/documents/Resume.pdf` and needs XeLaTeX and latexmk (TeX Live or
MacTeX); without it the site runs fine but `/resume` has nothing to serve.

Deployment is automatic: every push to `main` builds the PDF and the site and
publishes to GitHub Pages. Pull requests only build, and attach the compiled
PDF as the `resume-pdf` artifact.

## License

[MIT](LICENSE)
