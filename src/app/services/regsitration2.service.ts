import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registration2 } from '../../../models/types';
@Injectable({
  providedIn: 'root'
})
export class Regsitration2Service {

  private apiUrl = 'http://localhost:3000/api/registrations';
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getRegistrations(): Observable<Registration2[]> {
    return this.http.get<Registration2[]>(this.apiUrl);
  }

  addRegistration(registration: Registration2): Observable<Registration2> {
    return this.http.post<Registration2>(this.apiUrl, registration);
  }

  editRegistration(registration: Registration2): Observable<Registration2> {
    return this.http.put<Registration2>(`${this.apiUrl}/${registration.id}`, registration);
  }

  deleteRegistration(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getRegistrationById(id: number): Observable<Registration2> {
    return this.http.get<Registration2>(`${this.apiUrl}/${id}`);
  }
}
