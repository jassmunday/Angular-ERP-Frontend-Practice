import { Injectable } from '@angular/core';
import { Registration } from '../../../models/types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {

  private baseUrl = 'http://localhost:3000/api/registrations';

  http:HttpClient;
  constructor(http: HttpClient){
   this.http = http;
  }
 
  getAllRegistration(): Observable<Registration[]>{
    return this.http.get<Registration[]>(`${this.baseUrl}`);
  }

  addRegistration(registration: Registration): Observable<Registration> {
    return this.http.post<Registration>(`${this.baseUrl}`,registration);
  }
  updateRegistration(updatedRegistration: Registration, id: string): Observable<Registration> {
    return this.http.put<Registration>(`${this.baseUrl}/${id}`,updatedRegistration);
  }
  deleteRegistration(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  getRegistrationById(id: string): Observable<Registration> {
    return this.http.get<Registration>(`${this.baseUrl}/${id}`);
  }
}
