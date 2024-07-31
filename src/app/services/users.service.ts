import { Injectable } from '@angular/core';
import { User } from '../../../models/types';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[] = [{
    full_name: 'Jasmeet Singh',
    user_name: 'admin',
    password: 'randompass12',
    role: 'SuperAdmin',
    email: 'jassnangal15@gmail.com',
    email_password: 'jasmeet67',
    mobile_no: '7696296513',
    photo: '',
    company: 'Tech Solutions'
  }];

  getAllUsers(): User[] {
    return this.users;
  }

  addUsers(user: User): void {
    this.users.push(user);
  }

  deleteUsers(userName: string): void {
    this.users = this.users.filter(user => user.user_name !== userName);
  }

  editUsers(updatedUser: User): void {
    const index = this.users.findIndex(user => user.user_name === updatedUser.user_name);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
  }

  getUsersByUserName(userName: string): User | undefined {
    return this.users.find(user => user.user_name === userName);
  }

  constructor() { }
}
