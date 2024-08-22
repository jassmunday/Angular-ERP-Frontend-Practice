import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../../models/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = 'http://localhost:3000/api/products';
 

  http: HttpClient
  constructor(http: HttpClient ) {
    this.http = http;
  }

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}`);
  }
  getProductById(id: string): Observable<Product>{
    return this.http.get<Product>(`${this.baseUrl}/${id}`)
  }
  getProductByCode(code: number): Observable<Product>{
    return this.http.get<Product>(`${this.baseUrl}/code/${code}`)
  }
  addNewProduct(newProduct: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}`,newProduct);
  }
  deleteProduct(id:string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  updateProduct(updatedProduct: Product, id:string): Observable<Product>{
    return this.http.put<Product>(`${this.baseUrl}/${id}`,updatedProduct);
  }
}
