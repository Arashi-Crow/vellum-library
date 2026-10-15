# Roadmap: Angular Library Management App

## Overview

A four-phase delivery that takes the showcase app from a Netlify-ready Angular shell to a working in-memory book inventory and a complete rental reservation flow, built on signals and NgRx.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work

- [ ] **Phase 1: Foundation & UI Shell** - Angular + NgRx scaffolding, routing, responsive shell
- [ ] **Phase 2: Book Inventory** - List, add, edit, delete books
- [ ] **Phase 3: Rental Flow** - Rental cart, validated request form, confirmation popup

## Phase Details

### Phase 1: Foundation & UI Shell
**Goal**: A responsive, showcase-friendly Angular app shell with routing between Inventory and Rent pages, ready for Netlify deployment
**Depends on**: Nothing (first phase)
**Requirements**: UI-01
**Success Criteria** (what must be TRUE):
  1. App loads and navigates between Inventory and Rent routes without full page reload
  2. Layout is usable on mobile, tablet, and desktop widths
  3. Deep links to routes resolve on Netlify without 404 via SPA redirect config
**Plans**: 2 plans
**UI hint**: yes

### Phase 2: Book Inventory
**Goal**: Users can browse, add, edit, and remove books in the in-memory inventory
**Depends on**: Phase 1
**Requirements**: INV-01, INV-02, INV-03, INV-04
**Success Criteria** (what must be TRUE):
  1. User sees a list of books showing title, author, ISBN, and available copies
  2. User can add a new book with title, author, ISBN, and copy count and see it in the list
  3. User can edit an existing book's details and see the change persist in the list
  4. User can delete a book and it no longer appears
**Plans**: 3 plans
**UI hint**: yes

### Phase 3: Rental Flow
**Goal**: Users can select books into a cart and submit a validated rental request, receiving a confirmation with a reservation ID
**Depends on**: Phase 2
**Requirements**: RENT-01, RENT-02, RENT-03
**Success Criteria** (what must be TRUE):
  1. User can add selected books into a rental cart and adjust quantities
  2. User can submit the rental request form only when name, email, phone, and pickup date are valid
  3. Submitting an invalid form shows field-level validation errors
  4. User receives a confirmation popup with a reservation ID and instructions to go to the front desk, and the cart resets
**Plans**: 2 plans
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & UI Shell | 0/2 | Not started | - |
| 2. Book Inventory | 0/3 | Not started | - |
| 3. Rental Flow | 0/2 | Not started | - |