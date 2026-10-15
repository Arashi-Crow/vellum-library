# Angular Library Management App — Example Project

## What to build
A library management web app used as a portfolio example to show Angular (latest, with signals) +
NgRx patterns. It is a showcase/demo, NOT a full-fledged app.

## Core value
Demonstrate inventory management for a library: list/add/edit/remove books, and a rental
(reservation) flow with a checkout cart and a confirmation popup telling the user to go to the
front desk and show their reservation ID to get the books. No users/auth needed.

## Key features (v1)
- Book inventory management (CRUD: add, edit, delete, list/search books with title, author, ISBN, copies).
- Rent books flow: select books (cart), submit a rental request form with validation
  (name, email, phone, pickup date, etc.), confirmation popup with reservation ID,
  instruction to go to front desk.
- NgRx store for inventory + rentals (signals-based Angular).
- Routing: Inventory page, Rent page, checkout/cart.
- UI: responsive, clean, showcase-friendly.

## Explicitly out of scope (v1)
- User accounts / auth.
- Payments.
- Real backend / database — use mock/in-memory state (json-server or NgRx mock service).
- Multi-branch libraries.

## Tech stack
- Angular latest (standalone components, signals, new control flow).
- NgRx (store, effects, entity).
- TypeScript, SCSS or Tailwind.
- Deployed to Netlify.
- Will be linked as an example in the 3d-portfolio site.

## Deployment
- Netlify build (Angular) with SPA redirect config.
- README with link for portfolio card.

## Notes
- Showcased in portfolio 3D site (3d-portfolio) as a demo link.
