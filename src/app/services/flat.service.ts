import { Injectable } from '@angular/core';
import { Flats } from '../../../models/types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlatService {
  
  private baseUrl = 'http://localhost:3000/api/flats';
  private flats: Flats[] = [];

  http: HttpClient
  constructor(http: HttpClient ) {
    this.http = http;
  }

  getAllFlats(): Observable<Flats[]> {
    return this.http.get<Flats[]>(`${this.baseUrl}`);
  }
  getFlatById(id: string): Observable<Flats>{
    return this.http.get<Flats>(`${this.baseUrl}/${id}`)
  }
  addNewFlat(newFlat: Flats): Observable<Flats> {
    return this.http.post<Flats>(`${this.baseUrl}`,newFlat);
  }
  deleteFlat(id:string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  updateFlat(updatedFlat: Flats, id:string): Observable<Flats>{
    return this.http.put<Flats>(`${this.baseUrl}/${id}`,updatedFlat);
  }

}
