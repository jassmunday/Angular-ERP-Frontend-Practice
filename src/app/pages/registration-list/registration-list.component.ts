import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';
import { Registration } from '../../../../models/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.css']
})

export class RegistrationListComponent  {
  registrations: Registration[];

  constructor(private registrationService: RegistrationService, private router: Router) {
    this.registrations = this.registrationService.getRegistrations();
  }


  deleteRegistration(uniqueId: number) {
    this.registrationService.deleteRegistration(uniqueId);
    this.registrations = this.registrationService.getRegistrations();
  }

  editRegistration(uniqueId: number){
    this.router.navigate(['/registrations', uniqueId]);
  }

  addNewRegistration() {
    this.router.navigate(['/registrations']);
  }
}
