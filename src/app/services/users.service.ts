import { Injectable } from '@angular/core';
import { User } from '../../../models/types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = "http://localhost:3000/api/users"

  http: HttpClient;
  constructor(http: HttpClient){
    this.http = http;
  }

  
 
  // Updated Routes according to API Call
  getUsers() : Observable<User []>{
    return this.http.get<User[]>(`${this.baseUrl}`);
  }
  getUserById(id:string) : Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }
  createUser(newUser: User) : Observable<User >{
    return this.http.post<User>(this.baseUrl,newUser);
  }
  updateUser(id:string,updatedUser: User) : Observable<User >{
    return this.http.put<User>(`${this.baseUrl}/${id}`,updatedUser);
  }
  dlteUser(id: string) : Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
