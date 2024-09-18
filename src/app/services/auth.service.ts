import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthUser } from '../../../models/types';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:3000/api/auth';

  // BehaviorSubject to store and emit the authentication state
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());

  // Observable that components can subscribe to
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  // Login method
  login(username: string, password: string): Observable<any> {
    const user = { username, password };
    return this.http.post(`${this.authUrl}/login`, user, {
      withCredentials: true, // Include cookies with the request
    }).pipe(
      tap((response: any) => {
        // Save token and update authentication state
        if (response.token) {
          this.saveToken(response.token);
          this.isAuthenticatedSubject.next(true); // Notify that the user is authenticated
        }
      })
    );
  }

  // Check if the user is authenticated by contacting the backend
  isAuthenticated(): Observable<any> {
    return this.http.get(`${this.authUrl}/isAuthenticated`, {
      withCredentials: true, // Include cookies with the request
    }).pipe(
      tap((response: any) => {
        const isAuth = response.authenticated;
        this.isAuthenticatedSubject.next(isAuth); // Update the authentication state
      })
    );
  }

  // Logout method
  logout(): void {
    this.http.get(`${this.authUrl}/logout`, {
      withCredentials: true, // Include cookies with the request
    }).subscribe(() => {
      this.removeToken(); // Remove the token
      this.isAuthenticatedSubject.next(false); // Notify that the user is logged out
      this.router.navigate(['/login']); // Navigate to the login page
    });
  }

  // Save token to local storage
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Get token from local storage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Remove token from local storage
  removeToken(): void {
    localStorage.removeItem('token');
  }

  // Helper method to check if token exists
  private hasToken(): boolean {
    return !!this.getToken();
  }
}
