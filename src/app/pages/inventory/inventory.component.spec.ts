import { TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';
import { InventoryComponent } from './inventory.component';
import { booksReducer } from '../../store/books/books.reducer';
import { rentalReducer } from '../../store/rental/rental.reducer';

describe('InventoryComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryComponent],
      providers: [provideStore({ books: booksReducer, rental: rentalReducer })],
    }).compileComponents();
  });

  it('creates and renders the inventory heading', () => {
    const fixture = TestBed.createComponent(InventoryComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h1')?.textContent).toContain('Book Inventory');
  });

  it('marks the form invalid until required fields are provided', () => {
    const fixture = TestBed.createComponent(InventoryComponent);
    const component = fixture.componentInstance;
    expect(component.form.invalid).toBeTrue();
    component.form.setValue({ title: 'A Book', author: 'An Author', isbn: '978-0132350884', copies: 2 });
    expect(component.form.valid).toBeTrue();
  });
});
