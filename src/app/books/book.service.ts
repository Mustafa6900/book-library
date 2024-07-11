import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: Book[] = [
    { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', description: 'A classic of modern American literature' },
    { id: 2, title: '1984', author: 'George Orwell', description: 'A dystopian social science fiction novel' },
    { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', description: 'A novel of the Jazz Age' }
  ];

  getBooks(): Observable<Book[]> {
    return of(this.books);
  }

  getBook(id: number): Observable<Book | undefined> {
    return of(this.books.find(book => book.id === id));
  }

  addBook(book: Omit<Book, 'id'>): Observable<Book> {
    const newBook = { ...book, id: this.books.length + 1 };
    this.books.push(newBook);
    return of(newBook);
  }

}