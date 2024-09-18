import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService} from '../../services/auth.service';
import {AuthUser} from '../../../../models/types'
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Fix typo, should be `styleUrls` instead of `styleUrl`
})
export class LoginComponent {
  user: AuthUser = {};
  // Create form controls with validation
  username = new FormControl('', [
    Validators.required
  ]);

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  // Create a form group
  loginForm = new FormGroup({
    username: this.username,
    password: this.password
  });
  
  constructor(private authService: AuthService, private router: Router,private toaster: ToastService) {}

  // Function to handle form submission
  login() {
    if (this.loginForm.valid) {

      // If the form is valid, call the login method from AuthService
      this.authService.login(this.loginForm.value.username || '',this.loginForm.value.password || '').subscribe(
        (response) => {
          // Save token and navigate to the dashboard
          this.authService.saveToken(response.token);
      
          // window.location.reload(); 
          this.toaster.showSuccess("Login Successfull");
          this.router.navigate(['/dashboard']);
          // Redirect to a dashboard or desired route
        },
        
        (error) => {
          console.error('Login failed:', error);
          this.toaster.showError("Login Unsuccessfull");
          this.router.navigate(['/login']);
          this.loginForm.reset();
          //window.location.reload();
          // You can display an error message here
        }
      );
    } else {
      // Display form validation errors
      this.loginForm.markAllAsTouched(); // Marks all fields as touched to display validation errors
    }
  }

  // Helper methods to check form validation
  isUsernameInvalid(): boolean {
    return this.username.invalid && (this.username.dirty || this.username.touched);
  }

  isPasswordInvalid(): boolean {
    return this.password.invalid && (this.password.dirty || this.password.touched);
  }
}
