import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';
import { Registration } from '../../../../models/types';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-registration-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.css'],
})
export class RegistrationListComponent {
  registrations: Registration[] = [];

  constructor(
    private registrationService: RegistrationService,
    private router: Router,
    private toastService: ToastService
  ) {}
  
  ngOnInit(): void {
    this.loadRegistrations();
  }

  loadRegistrations() {
    this.registrationService.getAllRegistration().subscribe((registrations) => {
      this.registrations = registrations;
      console.log(this.registrations);
    });
  }

  deleteRegistration(_id: string | undefined ) {
    console.log(_id);
    if (_id) {
      this.registrationService.deleteRegistration(_id).subscribe(() => {
        this.loadRegistrations();
        this.toastService.showWarning("Registration Deleted");
        console.log(this.loadRegistrations());
      });
    } else {
      console.error('Invalid student ID');
    }
  }

  editRegistration(_id: string | undefined) {
    if (_id) {
      this.router.navigate(['/registrations', _id]);
    } else {
      console.log('Invalid Updation');
    }
  }

  addNewRegistration() {
    this.router.navigate(['/registrations']);
  }
}
