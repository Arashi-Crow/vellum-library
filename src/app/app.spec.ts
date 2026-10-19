import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { App } from './app';
import { booksReducer } from './store/books/books.reducer';
import { rentalReducer } from './store/rental/rental.reducer';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([]), provideStore({ books: booksReducer, rental: rentalReducer })],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the brand and navigation links', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.brand')?.textContent).toContain('Lumen');
    const links = Array.from(compiled.querySelectorAll('.nav a')).map((a) => a.textContent?.trim());
    expect(links.some((l) => l?.includes('Inventory'))).toBe(true);
    expect(links.some((l) => l?.includes('Rent'))).toBe(true);
  });
});
