import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../../../models/types';

@Injectable({
  providedIn: 'root',
})
export class DetailFormService {

  private baseUrl = 'http://localhost:3000/api/students';

  http: HttpClient
  constructor(http: HttpClient) {
    this.http = http;
  }

  students: Student[] = [];

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}`);
  }
  getStudentById(id: string): Observable<Student>{
    return this.http.get<Student>(`${this.baseUrl}/${id}`);
  }
  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.baseUrl, student);
  }
  updateStudent(id: string, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.baseUrl}/${id}`, student);
  }
  deleteStudent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
