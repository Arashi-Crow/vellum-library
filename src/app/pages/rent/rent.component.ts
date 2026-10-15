import { Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { Book } from '../../store/books/book.model';
import { selectAllBooks } from '../../store/books/books.selectors';
import { RentalActions } from '../../store/rental/rental.actions';
import {
  selectCartCount,
  selectCartItems,
  selectLatestReservation,
} from '../../store/rental/rental.selectors';

@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.scss',
})
export class RentComponent {
  private readonly store = inject(Store);
  private readonly fb = inject(FormBuilder);

  readonly books = toSignal(this.store.select(selectAllBooks), { initialValue: [] as Book[] });
  readonly cartItems = toSignal(this.store.select(selectCartItems), { initialValue: [] });
  readonly cartCount = toSignal(this.store.select(selectCartCount), { initialValue: 0 });
  readonly reservation = toSignal(this.store.select(selectLatestReservation), { initialValue: null });

  readonly hasCartItems = computed(() => this.cartItemList().length > 0);
  readonly cartItemList = computed(() => this.cartItems());

  readonly form = this.fb.nonNullable.group({
    customerName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]{7,20}$/)]],
    pickupDate: ['', [Validators.required]],
  });

  addToCart(book: Book): void {
    this.store.dispatch(RentalActions.addToCart({ book }));
  }

  increment(bookId: string): void {
    this.store.dispatch(RentalActions.incrementQuantity({ bookId }));
  }

  decrement(bookId: string): void {
    this.store.dispatch(RentalActions.decrementQuantity({ bookId }));
  }

  remove(bookId: string): void {
    this.store.dispatch(RentalActions.removeFromCart({ bookId }));
  }

  submit(): void {
    if (this.form.invalid || this.cartItemList().length === 0) {
      this.form.markAllAsTouched();
      return;
    }
    this.store.dispatch(RentalActions.submitRentalRequest({ request: this.form.getRawValue() }));
    this.form.reset({ customerName: '', email: '', phone: '', pickupDate: '' });
  }

  dismiss(): void {
    this.store.dispatch(RentalActions.dismissConfirmation());
  }

  hasError(control: 'customerName' | 'email' | 'phone' | 'pickupDate'): boolean {
    const ctrl = this.form.controls[control];
    return ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }
}
