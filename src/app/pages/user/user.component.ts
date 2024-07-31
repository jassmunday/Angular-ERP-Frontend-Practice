import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../../../models/types';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports:[ReactiveFormsModule,CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: User[];
  userForm: FormGroup;
  companies = ['Jain Colony', 'Tech Solutions', 'Innovate Inc.'];
  isEditMode: boolean = false;

  constructor(private userService: UsersService) {
    this.users = this.userService.getAllUsers();

    this.userForm = new FormGroup({
      full_name: new FormControl('', Validators.required),
      user_name: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      role: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      email_password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      mobile_no: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$'),
      ]),
      photo: new FormControl(''),
      company: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  editUser(user: User) {
    this.isEditMode = true;
    this.userForm.setValue({
      full_name: user.full_name,
      user_name: user.user_name,
      password: user.password,
      role: user.role,
      email: user.email,
      email_password: user.email_password,
      mobile_no: user.mobile_no,
      photo: user.photo,
      company: user.company,
    });
  }

  deleteUser(userName: string) {
    this.userService.deleteUsers(userName);
    this.users = this.userService.getAllUsers();
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      console.log(formData);

      if (this.isEditMode) {
        this.userService.editUsers(formData);
      } else {
        this.userService.addUsers(formData);
      }

      this.users = this.userService.getAllUsers();
      this.resetForm();
    }
  }

  resetForm() {
    this.userForm.reset();
    this.isEditMode = false;
  }
}
