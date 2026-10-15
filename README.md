# Angular Library Management App

A portfolio **showcase** app demonstrating **Angular 22 (standalone + signals, zoneless)** with
**NgRx 22** (store, entity adapter, selectors) through a small **library management** domain.

There are no user accounts — a visitor can manage a book inventory and submit a rental
reservation, then collect the books at the front desk using their reservation ID.

## Features

- **Book inventory** — list, add, edit, and delete books (title, author, ISBN, copies).
- **Rental flow** — pick books into a cart, adjust quantities, submit a validated request form
  (name, email, phone, pickup date) and receive a confirmation popup with a **reservation ID**
  plus front-desk pickup instructions. The cart resets after confirmation.
- **NgRx** — `books` entity slice and `rental` cart/reservation slice, consumed via
  `store.select` + `toSignal` signals.
- Responsive layout (mobile / tablet / desktop).

## Tech

- Angular 22, standalone components, new control flow (`@if`, `@for`), signals (zoneless)
- NgRx 22 (`@ngrx/store`, `@ngrx/entity`, `@ngrx/effects`, `@ngrx/store-devtools`)
- Reactive forms with validation
- SCSS
- Vitest (via `@angular/build:unit-test`)
- In-memory store only (no backend)

## Development

```bash
npm install
npm start        # http://localhost:4200
npm run build    # production bundle → dist/angular-library-app/browser
npm test         # unit tests (Vitest)
```

## Deploy to Netlify

The repo includes `netlify.toml` and `public/_redirects` so SPA deep links resolve without 404s.

- Build command: `npm run build`
- Publish directory: `dist/angular-library-app/browser`
- Node: `24.20.0`

Or from the CLI: `npx netlify deploy --prod`.

## Roadmap

Planning artifacts live in `.planning/`:
1. Foundation & UI Shell
2. Book Inventory
3. Rental Flow
