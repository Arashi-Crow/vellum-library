import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Book } from '../books/book.model';
import { RentalRequest } from './rental.model';

export const RentalActions = createActionGroup({
  source: 'Rental',
  events: {
    'Add To Cart': props<{ book: Book }>(),
    'Increment Quantity': props<{ bookId: string }>(),
    'Decrement Quantity': props<{ bookId: string }>(),
    'Remove From Cart': props<{ bookId: string }>(),
    'Clear Cart': emptyProps(),
    'Submit Rental Request': props<{ request: RentalRequest }>(),
    'Dismiss Confirmation': emptyProps(),
  },
});
