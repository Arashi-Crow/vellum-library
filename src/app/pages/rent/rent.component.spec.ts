import { TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';
import { RentComponent } from './rent.component';
import { booksReducer } from '../../store/books/books.reducer';
import { rentalReducer } from '../../store/rental/rental.reducer';

describe('RentComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentComponent],
      providers: [provideStore({ books: booksReducer, rental: rentalReducer })],
    }).compileComponents();
  });

  it('creates and renders the rent heading', () => {
    const fixture = TestBed.createComponent(RentComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h1')?.textContent).toContain('Rent Books');
  });

  it('rejects an invalid email', () => {
    const fixture = TestBed.createComponent(RentComponent);
    const component = fixture.componentInstance;
    component.form.patchValue({ customerName: 'Ada', email: 'not-an-email', phone: '5550102030', pickupDate: '2026-01-01' });
    expect(component.form.controls.email.invalid).toBeTrue();
    component.form.patchValue({ email: 'ada@example.com' });
    expect(component.form.valid).toBeTrue();
  });
});
