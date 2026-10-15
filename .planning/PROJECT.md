# Angular Library Management App

## What This Is

A portfolio showcase web app demonstrating Angular (latest, signals-based) plus NgRx state management through a small library-management domain. It lets a visitor browse and manage a book inventory and run a rental (reservation) flow with a checkout cart and confirmation popup, without any user accounts.

## Core Value

Demonstrate a production-quality Angular + NgRx app (signals, store, effects, entity) deployed on Netlify, usable as a live example in the 3D portfolio site.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] INV-01: List books in inventory with search/filter
- [ ] INV-02: Add a new book (title, author, ISBN, copies)
- [ ] INV-03: Edit an existing book
- [ ] INV-04: Delete a book
- [ ] RENT-01: Select books into a rental cart
- [ ] RENT-02: Submit a rental request form with validation (name, email, phone, pickup date)
- [ ] RENT-03: Show a confirmation popup with reservation ID and instructions to go to the front desk
- [ ] UI-01: Responsive, showcase-friendly Angular UI with routing

### Out of Scope

- User accounts / auth — demo only, no users needed
- Payments — not part of showcase
- Real backend / database — use in-memory mock state
- Multi-branch libraries — single branch scope

## Context

Portfolio example to be linked from the 3d-portfolio site. Deployed to Netlify. Latest Angular with signals and NgRx. Small, polished enough to demonstrate patterns rather than a full product.

## Constraints

- **Tech stack**: Angular 22 (latest) + NgRx 22 (signals, store, entity) — required to showcase modern Angular
- **Scope**: Showcase demo, not production system — keep data in-memory/mock
- **Deployment**: Netlify with SPA redirect config

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| In-memory mock data store | Demo scope; no real backend | — Pending |
| Angular signals + NgRx | Showcase requirement | — Pending |

---
*Last updated: 2026-10-15 after initialization*
