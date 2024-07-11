import { Routes } from '@angular/router';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';

export const routes: Routes = [
  { path: 'books', component: BookListComponent },
  { path: 'book/:id', component: BookDetailComponent },
  { path: '', redirectTo: '/books', pathMatch: 'full' }
];