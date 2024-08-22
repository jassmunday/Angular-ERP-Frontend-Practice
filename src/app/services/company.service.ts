import { Injectable } from '@angular/core';
import { Company } from '../../../models/types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private baseUrl = 'http://localhost:3000/api/company';

  http:HttpClient;
  constructor(http: HttpClient){
   this.http = http;
  }
 
  getAllCompanies(): Observable<Company[]>{
    return this.http.get<Company[]>(`${this.baseUrl}`);
  }

  addCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(`${this.baseUrl}`,company);
  }
  updateCompany(updatedCompany: Company, id: string): Observable<Company> {
    return this.http.put<Company>(`${this.baseUrl}/${id}`,updatedCompany);
  }
  deleteCompany(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  getCompanyById(id: string): Observable<Company> {
    return this.http.get<Company>(`${this.baseUrl}/${id}`);
  }
}
