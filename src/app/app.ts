import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { BooksActions } from './store/books/books.actions';
import { selectCartCount } from './store/rental/rental.selectors';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly store = inject(Store);

  protected readonly title = signal('Lumen Library');
  protected readonly cartCount = toSignal(this.store.select(selectCartCount), { initialValue: 0 });
  protected readonly cartPercent = computed(() => Math.min(this.cartCount() * 20, 100));

  ngOnInit(): void {
    this.store.dispatch(BooksActions.loadBooks());
  }
}
