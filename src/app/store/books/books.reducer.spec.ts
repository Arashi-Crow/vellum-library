import { BooksActions } from './books.actions';
import { booksReducer, initialBooksState } from './books.reducer';
import { selectAllBooks } from './books.selectors';

describe('books reducer', () => {
  it('loads seed books', () => {
    const state = booksReducer(initialBooksState, BooksActions.loadBooks());
    expect(selectAllBooks.projector(state).length).toBe(5);
    expect(state.loaded).toBe(true);
  });

  it('adds a book with a generated id', () => {
    const loaded = booksReducer(initialBooksState, BooksActions.loadBooks());
    const state = booksReducer(
      loaded,
      BooksActions.addBook({ book: { title: 'New', author: 'A', isbn: '978-0000000000', copies: 1 } })
    );
    expect(selectAllBooks.projector(state).length).toBe(6);
    expect(selectAllBooks.projector(state).at(-1)?.id).toBeTruthy();
  });

  it('updates a book', () => {
    const loaded = booksReducer(initialBooksState, BooksActions.loadBooks());
    const first = selectAllBooks.projector(loaded)[0];
    const state = booksReducer(loaded, BooksActions.updateBook({ book: { ...first, title: 'Updated' } }));
    expect(selectAllBooks.projector(state).find((b) => b.id === first.id)?.title).toBe('Updated');
  });

  it('removes a book', () => {
    const loaded = booksReducer(initialBooksState, BooksActions.loadBooks());
    const first = selectAllBooks.projector(loaded)[0];
    const state = booksReducer(loaded, BooksActions.removeBook({ id: first.id }));
    expect(selectAllBooks.projector(state).find((b) => b.id === first.id)).toBeUndefined();
  });
});
