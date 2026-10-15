import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Book, BookDraft } from './book.model';

export const BooksActions = createActionGroup({
  source: 'Books',
  events: {
    'Load Books': emptyProps(),
    'Add Book': props<{ book: BookDraft }>(),
    'Update Book': props<{ book: Book }>(),
    'Remove Book': props<{ id: string }>(),
  },
});
