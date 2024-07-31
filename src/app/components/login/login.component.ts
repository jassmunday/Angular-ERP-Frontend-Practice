import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username = new FormControl("",[
    Validators.required
  ])

  password = new FormControl("",[
    Validators.required,
    Validators.minLength(6)
  ])

  loginform = new FormGroup({
    username : this.username,
    password: this.password
  })

  login(){
    console.log(this.loginform.value.username);
  }
}
