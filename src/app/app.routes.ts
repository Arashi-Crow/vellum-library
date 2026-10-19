import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'inventory' },
  {
    path: 'inventory',
    title: 'Inventory · Lumen Library',
    loadComponent: () =>
      import('./pages/inventory/inventory.component').then((m) => m.InventoryComponent),
  },
  {
    path: 'rent',
    title: 'Rent Books · Lumen Library',
    loadComponent: () => import('./pages/rent/rent.component').then((m) => m.RentComponent),
  },
  { path: '**', redirectTo: 'inventory' },
];
