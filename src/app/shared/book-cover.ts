import { Book } from '../store/books/book.model';

interface Cover {
  c1: string;
  c2: string;
}

/** Palette lifted from the Lumen Library landing page covers. */
const PALETTE: ReadonlyArray<readonly [string, string]> = [
  ['#2b3a8c', '#e07a5f'],
  ['#0f5257', '#f4a259'],
  ['#6d2e46', '#f2cc8f'],
  ['#1b1b3a', '#7bdff2'],
  ['#7a3e1d', '#f7e1a1'],
  ['#254e70', '#c9e4ca'],
  ['#3c2a6b', '#ff8fab'],
  ['#2f4a3a', '#e9c46a'],
  ['#8c2f39', '#ffd6a5'],
  ['#1d3557', '#a8dadc'],
];

const hash = (value: string): number => {
  let h = 0;
  for (let i = 0; i < value.length; i += 1) {
    h = (h * 31 + value.charCodeAt(i)) >>> 0;
  }
  return h;
};

/** Deterministic, stable cover colours for a book. */
export const bookCover = (book: Pick<Book, 'id' | 'title'>): Cover => {
  const [c1, c2] = PALETTE[hash(book.id || book.title) % PALETTE.length];
  return { c1, c2 };
};
