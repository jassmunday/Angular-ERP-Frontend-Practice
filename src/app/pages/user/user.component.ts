import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../../../models/types';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  
  users: User[] = [];
  user: User | null = null;
  userForm: FormGroup;
  updatingUserId: string = '';
  companies = ['Jain Colony', 'Tech Solutions', 'Innovate Inc.'];
  isEditMode: boolean = false;

  constructor(
    private userService: UsersService,
    private toastService: ToastService // Inject ToastService
  ) {
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

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
        console.log(this.users);
      },
      (error) => {
        this.toastService.showError('Failed to load users');
      }
    );
  }

  editUser(user: User) {
    this.isEditMode = true;
    const id = user._id || '';
    this.updatingUserId = id;

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

  deleteUser(id: string) {
    this.userService.dlteUser(id).subscribe(
      () => {
        this.loadUsers();
        this.toastService.showSuccess('User deleted successfully');
      },
      (error) => {
        this.toastService.showError('Failed to delete user');
      }
    );
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      console.log(formData);

      if (this.isEditMode) {
        this.userService.updateUser(this.updatingUserId, formData).subscribe(
          () => {
            this.loadUsers();
            this.toastService.showSuccess('User updated successfully');
            this.isEditMode = false;
            this.updatingUserId = '';
          },
          (error: any) => {
            this.toastService.showError('Failed to update user');
          }
        );
      } else {
        this.userService.createUser(formData).subscribe(
          () => {
            this.loadUsers();
            this.toastService.showSuccess('User created successfully');
          },
          (error) => {
            this.toastService.showError('Failed to create user');
          }
        );
      }
      this.loadUsers();
      this.resetForm();
    } else {
      this.toastService.showWarning('Please fill all required fields');
    }
  }

  resetForm() {
    this.userForm.reset();
    this.isEditMode = false;
  }
}
