import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { BooksActions } from './store/books/books.actions';
import { selectCartCount } from './store/rental/rental.selectors';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly store = inject(Store);

  readonly cartCount = toSignal(this.store.select(selectCartCount), { initialValue: 0 });

  ngOnInit(): void {
    this.store.dispatch(BooksActions.loadBooks());
  }
}
