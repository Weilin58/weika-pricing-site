# Repository Guidelines

## Project Structure & Module Organization
This is a static single-page site. `index.html` holds the markup skeleton, section anchors, and accessibility attributes. `script.js` manages route toggling, feature cards, language menus, and toast logic; append new helpers near related functions so load order stays deterministic. `i18n.js` centralizes locale metadata and copy blocks, often with embedded HTML snippets. `styles.css` defines design tokens and component rules. Store assets in `images/` and reference them with cache-busting query strings when necessary.

## Build, Test, and Development Commands
- `npx serve@latest . --listen 4173` — start a temp static server with helpful logging and cache control.
- `python3 -m http.server 4173` — lightweight fallback for quick previews; open `http://localhost:4173`.
- Disable browser extensions that inject scripts while testing to keep DOM mutations predictable.

## Coding Style & Naming Conventions
Follow ES2015+ patterns with two-space indentation, trailing semicolons, and camelCase identifiers (e.g., `renderLanguageMenu`). Prefer `const`; reserve `let` for deliberate mutation. Keep configuration objects sorted by route or locale and collocate DOM queries at the top of the file. CSS also uses two-space indenting and custom properties; extend existing class patterns (`hero-card`, `page-section`) instead of inventing new ones. Maintain semantic HTML, ARIA labels, and focus management already in `index.html`.

## Testing Guidelines
Run the site locally, navigate through every route, and confirm the toast, back-to-home links, and gallery cards respond. Switch each language option to verify currency formats, embedded HTML, and menu focus states. Watch the console for missing assets from `HOME_CARD_IMAGES` and promises that fail silently. Resize the viewport to test the navbar toggle, reveal animations, and `prefers-reduced-motion` handling.

## Commit & Pull Request Guidelines
Write imperative, 50-character-or-fewer commit subjects (e.g., `Add korean pricing copy`) and include concise context bullets when needed. Pull requests should summarize the change, list manual checks performed, attach screenshots for UI tweaks, and link any tracked issue. Flag strings that still need translation or imagery that is pending export so reviewers can follow up.

## Localization & Content Updates
When adding locales, update both `LANG_OPTIONS` and the matching `I18N` entries, keeping markup fragments minimal and sanitized. For new offerings, extend `routes`, provide imagery config in `HOME_CARD_IMAGES`, and add pricing details in `I18N.pricing`. Keep filenames lowercase with hyphens to match existing assets.
