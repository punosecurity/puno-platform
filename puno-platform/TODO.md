# PUNO Cleanup & Modernization TODO

## Phase 1 — Debranding & Monochrome UI
- [ ] Remove ALL “Indeed” references (start with `index.html`).
- [ ] Convert `styles.css` to a strict black & white design system (remove gradients, neon/glow, color buttons/chips).

## Phase 2 — Shared UI (Navbar + Footer + Logo)
- [ ] Implement logo image in Navbar + Footer across ALL pages.
- [ ] Implement auth-aware standardized Navbar across ALL pages (guest vs logged-in links).
- [ ] Standardize Footer across ALL pages to include: Logo, Copyright, Email, legal links.

## Phase 3 — Contact + Stats
- [ ] Modify `contact.html` to display ONLY: `Email: punosecurity@gmail.com`.
- [ ] Remove fake statistics blocks (remove if no source; otherwise label demonstrative).

## Phase 4 — LocalStorage Demo Account System
- [ ] Implement full localStorage auth in `app.js` (register/login/logout/remember session).
- [ ] Add UI and persistence for: edit profile, change password, notification/privacy/security preferences.
- [ ] Remove any external auth buttons if present.

## Phase 5 — Legal Pages
- [ ] Create: `terms.html`, `privacy.html`, `cookies.html`, `user-agreement.html`, `employer-agreement.html` in Albanian.
- [ ] Add links in Footer and as needed in navigation.

## Phase 6 — City Coverage
- [ ] Ensure ALL location filters use `locations.js` full Kosovo + Albania city lists (remove hardcoded subset options).
- [ ] Ensure filters apply consistently on job search, employer profiles, and user profiles.

## Phase 7 — Content Rules
- [ ] Replace any non-Albanian UI strings and remove “demo/simulim” where prohibited.
- [ ] Ensure paragraphs are short and no development notes are visible.


