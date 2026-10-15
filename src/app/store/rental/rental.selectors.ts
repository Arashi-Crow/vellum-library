import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RentalState } from './rental.reducer';

export const selectRentalState = createFeatureSelector<RentalState>('rental');

export const selectCartItems = createSelector(selectRentalState, (state) => state.items);

export const selectCartCount = createSelector(selectCartItems, (items) =>
  items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotalBooks = createSelector(selectCartItems, (items) => items.length);

export const selectReservations = createSelector(selectRentalState, (state) => state.reservations);

export const selectLatestReservation = createSelector(selectRentalState, (state) =>
  state.reservations.find((reservation) => reservation.id === state.latestReservationId) ?? null
);
