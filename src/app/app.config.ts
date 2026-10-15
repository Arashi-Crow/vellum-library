import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { booksReducer } from './store/books/books.reducer';
import { rentalReducer } from './store/rental/rental.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled' })),
    // NgRx store seam — extend with provideEffects()/entity when features are added.
    provideStore({ books: booksReducer, rental: rentalReducer }),
    provideEffects([]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
