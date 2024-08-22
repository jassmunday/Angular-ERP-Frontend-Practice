// import { Injectable } from '@angular/core';
// import { Menu } from '../../../models/types';
// import { Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root',
// })
// export class MenuService {
//   private baseUrl = 'http://localhost:3000/api/menus';
 

//   http: HttpClient
//   constructor(http: HttpClient ) {
//     this.http = http;
//   }

//   getAllMenu(): Observable<Menu[]> {
//     return this.http.get<Menu[]>(`${this.baseUrl}`);
//   }
//   getMenuById(id: string): Observable<Menu>{
//     return this.http.get<Menu>(`${this.baseUrl}/${id}`)
//   }
//   addNewMenu(newMenu: Menu): Observable<Menu> {
//     return this.http.post<Menu>(`${this.baseUrl}`,newMenu);
//   }
//   deleteMenu(id:string): Observable<void> {
//     return this.http.delete<void>(`${this.baseUrl}/${id}`);
//   }
//   updateMenu(updatedMenu: Menu, id:string): Observable<Menu>{
//     return this.http.put<Menu>(`${this.baseUrl}/${id}`,updatedMenu);
//   }
// }
