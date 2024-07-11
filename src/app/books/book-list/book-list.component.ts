import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <h2>Book List</h2>
    <ul>
      <li *ngFor="let book of books">
        <a [routerLink]="['/book', book.id]">
          {{ book.title }} by {{ book.author }}
        </a>
      </li>
    </ul>

    <h3>Add New Book</h3>
    <form (ngSubmit)="addBook()">
      <div>
        <label for="title">Title:</label>
        <input id="title" [(ngModel)]="newBook.title" name="title" required>
      </div>
      <div>
        <label for="author">Author:</label>
        <input id="author" [(ngModel)]="newBook.author" name="author" required>
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea id="description" [(ngModel)]="newBook.description" name="description"></textarea>
      </div>
      <button type="submit">Add Book</button>
    </form>
  `,
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  newBook: Omit<Book, 'id'> = { title: '', author: '', description: '' };

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(books => this.books = books);
  }

  addBook(): void {
    if (this.newBook.title && this.newBook.author) {
      this.bookService.addBook(this.newBook)
        .subscribe(book => {
          this.books.push(book);
          this.newBook = { title: '', author: '', description: '' };
        });
    }
  }
}