import { createFeatureSelector, createSelector } from '@ngrx/store';
import { booksAdapter, BooksState } from './books.reducer';

export const selectBooksState = createFeatureSelector<BooksState>('books');

const { selectAll, selectEntities } = booksAdapter.getSelectors();

export const selectAllBooks = createSelector(selectBooksState, selectAll);

export const selectBookEntities = createSelector(selectBooksState, selectEntities);

export const selectBooksLoaded = createSelector(selectBooksState, (state) => state.loaded);

export const selectBookById = (id: string) =>
  createSelector(selectBookEntities, (entities) => entities[id]);
