import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="book">
      <h2>{{ book.title }} Details</h2>
      <div><span>ID: </span>{{book.id}}</div>
      <div>
        <label for="book-title">Book title: </label>
        <input id="book-title" [(ngModel)]="book.title" placeholder="Book title"/>
      </div>
      <div>
        <label for="book-author">Author: </label>
        <input id="book-author" [(ngModel)]="book.author" placeholder="Author"/>
      </div>
      <div>
        <label for="book-description">Description: </label>
        <textarea id="book-description" [(ngModel)]="book.description" placeholder="Description"></textarea>
      </div>
    </div>
  `,
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book | undefined;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.getBook();
  }

  getBook(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBook(id)
      .subscribe(book => this.book = book);
  }
}