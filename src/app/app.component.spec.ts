import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { AppComponent } from './app.component';
import { booksReducer } from './store/books/books.reducer';
import { rentalReducer } from './store/rental/rental.reducer';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        provideStore({ books: booksReducer, rental: rentalReducer }),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the brand and navigation links', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.brand__name')?.textContent).toContain('Angular Library');
    const links = Array.from(compiled.querySelectorAll('.app-nav a')).map((a) => a.textContent?.trim());
    expect(links.some((l) => l?.includes('Inventory'))).toBeTrue();
    expect(links.some((l) => l?.includes('Rent'))).toBeTrue();
  });
});
