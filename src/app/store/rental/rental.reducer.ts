import { createReducer, on } from '@ngrx/store';
import { uid } from '../books/books.reducer';
import { RentalActions } from './rental.actions';
import { CartItem, Reservation } from './rental.model';

export interface RentalState {
  items: CartItem[];
  reservations: Reservation[];
  latestReservationId: string | null;
}

export const initialRentalState: RentalState = {
  items: [],
  reservations: [],
  latestReservationId: null,
};

export const rentalReducer = createReducer(
  initialRentalState,
  on(RentalActions.addToCart, (state, { book }) => {
    const existing = state.items.find((item) => item.bookId === book.id);
    if (existing) {
      return {
        ...state,
        items: state.items.map((item) =>
          item.bookId === book.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }
    const item: CartItem = {
      bookId: book.id,
      title: book.title,
      author: book.author,
      quantity: 1,
    };
    return { ...state, items: [...state.items, item] };
  }),
  on(RentalActions.incrementQuantity, (state, { bookId }) => ({
    ...state,
    items: state.items.map((item) =>
      item.bookId === bookId ? { ...item, quantity: item.quantity + 1 } : item
    ),
  })),
  on(RentalActions.decrementQuantity, (state, { bookId }) => ({
    ...state,
    items: state.items
      .map((item) =>
        item.bookId === bookId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0),
  })),
  on(RentalActions.removeFromCart, (state, { bookId }) => ({
    ...state,
    items: state.items.filter((item) => item.bookId !== bookId),
  })),
  on(RentalActions.clearCart, (state) => ({ ...state, items: [] })),
  on(RentalActions.submitRentalRequest, (state, { request }) => {
    const reservation: Reservation = {
      id: `RES-${uid().slice(0, 8).toUpperCase()}`,
      customerName: request.customerName,
      email: request.email,
      phone: request.phone,
      pickupDate: request.pickupDate,
      items: state.items.map(({ bookId, title, quantity }) => ({ bookId, title, quantity })),
      createdAt: new Date().toISOString(),
    };
    return {
      ...state,
      items: [],
      reservations: [...state.reservations, reservation],
      latestReservationId: reservation.id,
    };
  }),
  on(RentalActions.dismissConfirmation, (state) => ({
    ...state,
    latestReservationId: null,
  }))
);
