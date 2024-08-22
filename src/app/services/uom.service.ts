import { Injectable } from '@angular/core';
import { Uom } from '../../../models/types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UomService {
  private baseUrl = 'http://localhost:3000/api/measurements';
 

  http: HttpClient
  constructor(http: HttpClient ) {
    this.http = http;
  }

  getAllUom(): Observable<Uom[]> {
    return this.http.get<Uom[]>(`${this.baseUrl}`);
  }
  getUomById(id: string): Observable<Uom>{
    return this.http.get<Uom>(`${this.baseUrl}/${id}`)
  }
  addNewUom(newUom: Uom): Observable<Uom> {
    return this.http.post<Uom>(`${this.baseUrl}`,newUom);
  }
  deleteUom(id:string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  updateUom(updatedUom: Uom, id:string): Observable<Uom>{
    return this.http.put<Uom>(`${this.baseUrl}/${id}`,updatedUom);
  }
}
