import { Injectable } from '@angular/core';
import { Category } from '../../../models/types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:3000/api/categories';
 

  http: HttpClient
  constructor(http: HttpClient ) {
    this.http = http;
  }

  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}`);
  }
  getCategoryById(id: string): Observable<Category>{
    return this.http.get<Category>(`${this.baseUrl}/${id}`)
  }
  addNewCategory(newCategory: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}`,newCategory);
  }
  deleteCategory(id:string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  updateCategory(updatedCategory: Category, id:string): Observable<Category>{
    return this.http.put<Category>(`${this.baseUrl}/${id}`,updatedCategory);
  }
}
