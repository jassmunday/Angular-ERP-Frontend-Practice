import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Religion } from '../../../models/types';

@Injectable({
  providedIn: 'root'
})
export class ReligionService {
  private baseUrl = 'http://localhost:3000/api/religions';
 

  http: HttpClient
  constructor(http: HttpClient ) {
    this.http = http;
  }

  getAllReligion(): Observable<Religion[]> {
    return this.http.get<Religion[]>(`${this.baseUrl}`);
  }
  getReligionById(id: string): Observable<Religion>{
    return this.http.get<Religion>(`${this.baseUrl}/${id}`)
  }
  addNewReligion(newReligion: Religion): Observable<Religion> {
    return this.http.post<Religion>(`${this.baseUrl}`,newReligion);
  }
  deleteReligion(id:string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  updateReligion(updatedReligion: Religion, id:string): Observable<Religion>{
    return this.http.put<Religion>(`${this.baseUrl}/${id}`,updatedReligion);
  }
}
