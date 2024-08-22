import { Injectable } from '@angular/core';
import { Orders } from '../../../models/types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private baseUrl = 'http://localhost:3000/api/orders';

  http: HttpClient
  constructor(http: HttpClient ) {
    this.http = http;
  }

  getAllOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>(`${this.baseUrl}`);
  }
  getOrdersById(id: string): Observable<Orders>{
    return this.http.get<Orders>(`${this.baseUrl}/${id}`)
  }
  addNewOrders(newOrders: Orders): Observable<Orders> {
    return this.http.post<Orders>(`${this.baseUrl}`,newOrders);
  }
  deleteOrders(id:string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  updateOrders(updatedOrders: Orders, id:string): Observable<Orders>{
    return this.http.put<Orders>(`${this.baseUrl}/${id}`,updatedOrders);
  }
}
