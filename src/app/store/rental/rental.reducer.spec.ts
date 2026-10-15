import { RentalActions } from './rental.actions';
import { initialRentalState, rentalReducer } from './rental.reducer';
import { selectCartCount, selectLatestReservation } from './rental.selectors';
import { Book } from '../books/book.model';

const book: Book = { id: 'b1', title: 'Clean Code', author: 'Robert C. Martin', isbn: '978-0132350884', copies: 2 };

describe('rental reducer', () => {
  it('adds a book to the cart and increments quantity on repeat', () => {
    const once = rentalReducer(initialRentalState, RentalActions.addToCart({ book }));
    const twice = rentalReducer(once, RentalActions.addToCart({ book }));
    expect(selectCartCount.projector(twice.items)).toBe(2);
    expect(twice.items.length).toBe(1);
  });

  it('decrementing to zero removes the item', () => {
    const once = rentalReducer(initialRentalState, RentalActions.addToCart({ book }));
    const state = rentalReducer(once, RentalActions.decrementQuantity({ bookId: book.id }));
    expect(state.items.length).toBe(0);
  });

  it('submitting a request creates a reservation, clears the cart, and exposes the latest id', () => {
    const cart = rentalReducer(initialRentalState, RentalActions.addToCart({ book }));
    const request = { customerName: 'Ada', email: 'a@b.com', phone: '5550102030', pickupDate: '2026-01-01' };
    const state = rentalReducer(cart, RentalActions.submitRentalRequest({ request }));
    expect(state.items.length).toBe(0);
    const reservation = selectLatestReservation.projector(state);
    expect(reservation?.id).toContain('RES-');
    expect(reservation?.items[0].title).toBe('Clean Code');
  });

  it('dismissing clears the latest reservation pointer', () => {
    const request = { customerName: 'Ada', email: 'a@b.com', phone: '5550102030', pickupDate: '2026-01-01' };
    const cart = rentalReducer(initialRentalState, RentalActions.addToCart({ book }));
    const submitted = rentalReducer(cart, RentalActions.submitRentalRequest({ request }));
    const dismissed = rentalReducer(submitted, RentalActions.dismissConfirmation());
    expect(selectLatestReservation.projector(dismissed)).toBeNull();
  });
});
