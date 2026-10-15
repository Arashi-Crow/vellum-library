export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  copies: number;
}

export type BookDraft = Omit<Book, 'id'>;
