import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Relation } from '../../../models/types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RelationService {
  private baseUrl = 'http://localhost:3000/api/relations';
 

  http: HttpClient
  constructor(http: HttpClient ) {
    this.http = http;
  }

  getAllRelation(): Observable<Relation[]> {
    return this.http.get<Relation[]>(`${this.baseUrl}`);
  }
  getRelationById(id: string): Observable<Relation>{
    return this.http.get<Relation>(`${this.baseUrl}/${id}`)
  }
  addNewRelation(newRelation: Relation): Observable<Relation> {
    return this.http.post<Relation>(`${this.baseUrl}`,newRelation);
  }
  deleteRelation(id:string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  updateRelation(updatedRelation: Relation, id:string): Observable<Relation>{
    return this.http.put<Relation>(`${this.baseUrl}/${id}`,updatedRelation);
  }
}
