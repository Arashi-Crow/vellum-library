import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Book } from './book.model';
import { BooksActions } from './books.actions';

export const booksAdapter = createEntityAdapter<Book>();

/** Cross-environment id generator (crypto.randomUUID needs a secure context). */
export const uid = (): string =>
  typeof globalThis.crypto?.randomUUID === 'function'
    ? globalThis.crypto.randomUUID()
    : `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

export interface BooksState extends EntityState<Book> {
  loaded: boolean;
}

export const initialBooksState: BooksState = booksAdapter.getInitialState({
  loaded: false,
});

const SEED_BOOKS: Book[] = [
  { id: 'b1', title: 'The Pragmatic Programmer', author: 'Andrew Hunt', isbn: '978-0201616224', copies: 3 },
  { id: 'b2', title: 'Clean Code', author: 'Robert C. Martin', isbn: '978-0132350884', copies: 2 },
  { id: 'b3', title: 'Refactoring', author: 'Martin Fowler', isbn: '978-0134757599', copies: 1 },
  { id: 'b4', title: 'Domain-Driven Design', author: 'Eric Evans', isbn: '978-0321125217', copies: 2 },
  { id: 'b5', title: 'You Don\u2019t Know JS Yet', author: 'Kyle Simpson', isbn: '978-1091210099', copies: 4 },
];

export const booksReducer = createReducer(
  initialBooksState,
  on(BooksActions.loadBooks, (state) => booksAdapter.setAll(SEED_BOOKS, { ...state, loaded: true })),
  on(BooksActions.addBook, (state, { book }) =>
    booksAdapter.addOne(
      { ...book, id: uid() },
      state
    )
  ),
  on(BooksActions.updateBook, (state, { book }) => booksAdapter.updateOne({ id: book.id, changes: book }, state)),
  on(BooksActions.removeBook, (state, { id }) => booksAdapter.removeOne(id, state))
);
