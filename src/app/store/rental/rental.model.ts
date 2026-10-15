export interface CartItem {
  bookId: string;
  title: string;
  author: string;
  quantity: number;
}

export interface RentalRequest {
  customerName: string;
  email: string;
  phone: string;
  pickupDate: string;
}

export interface RentalItem {
  bookId: string;
  title: string;
  quantity: number;
}

export interface Reservation {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  pickupDate: string;
  items: RentalItem[];
  createdAt: string;
}
