import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { Book } from '../../store/books/book.model';
import { BooksActions } from '../../store/books/books.actions';
import { selectAllBooks } from '../../store/books/books.selectors';
import { bookCover } from '../../shared/book-cover';

@Component({
  selector: 'app-inventory',
  imports: [ReactiveFormsModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss',
})
export class InventoryComponent {
  private readonly store = inject(Store);
  private readonly fb = inject(FormBuilder);

  readonly books = toSignal(this.store.select(selectAllBooks), { initialValue: [] as Book[] });

  readonly search = signal('');
  readonly filteredBooks = computed(() => {
    const term = this.search().trim().toLowerCase();
    if (!term) {
      return this.books();
    }
    return this.books().filter(
      (book) => book.title.toLowerCase().includes(term) || book.author.toLowerCase().includes(term)
    );
  });

  readonly showForm = signal(false);
  readonly editingId = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    author: ['', [Validators.required, Validators.minLength(2)]],
    isbn: ['', [Validators.required, Validators.pattern(/^[0-9-]{10,17}$/)]],
    copies: [1, [Validators.required, Validators.min(1), Validators.max(99)]],
  });

  cover(book: Book) {
    return bookCover(book);
  }

  startAdd(): void {
    this.editingId.set(null);
    this.form.reset({ title: '', author: '', isbn: '', copies: 1 });
    this.showForm.set(true);
  }

  startEdit(book: Book): void {
    this.editingId.set(book.id);
    this.form.reset({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      copies: book.copies,
    });
    this.showForm.set(true);
  }

  cancel(): void {
    this.showForm.set(false);
    this.editingId.set(null);
    this.form.reset({ title: '', author: '', isbn: '', copies: 1 });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    const editingId = this.editingId();
    if (editingId) {
      this.store.dispatch(BooksActions.updateBook({ book: { id: editingId, ...value } }));
    } else {
      this.store.dispatch(BooksActions.addBook({ book: value }));
    }
    this.cancel();
  }

  remove(book: Book): void {
    if (confirm(`Remove "${book.title}" from the inventory?`)) {
      this.store.dispatch(BooksActions.removeBook({ id: book.id }));
    }
  }

  hasError(control: 'title' | 'author' | 'isbn' | 'copies'): boolean {
    const ctrl = this.form.controls[control];
    return ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }
}
