import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../../models/types';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private baseUrl = 'http://localhost:3000/api/customers';
 

  http: HttpClient
  constructor(http: HttpClient ) {
    this.http = http;
  }

  getAllCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}`);
  }
  getCustomerById(id: string): Observable<Customer>{
    return this.http.get<Customer>(`${this.baseUrl}/${id}`)
  }
  getCustomerByCode(code: number): Observable<Customer>{
    return this.http.get<Customer>(`${this.baseUrl}/customer/${code}`)
  }
  addNewCustomer(newCustomer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.baseUrl}`,newCustomer);
  }
  deleteCustomer(id:string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  updateCustomer(updatedCustomer: Customer, id:string): Observable<Customer>{
    return this.http.put<Customer>(`${this.baseUrl}/${id}`,updatedCustomer);
  }
}
