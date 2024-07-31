import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Regsitration2Service } from '../../services/regsitration2.service';
import { Registration2 } from '../../../../models/types';
import { CommonModule } from '@angular/common';

Regsitration2Service
@Component({
  selector: 'app-reglist2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reglist2.component.html',
  styleUrl: './reglist2.component.css'
})
export class Reglist2Component {
  registrations: Registration2[] = [];

  constructor(
    private registrationService: Regsitration2Service,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadRegistrations();
  }

  loadRegistrations() {
    this.registrations = this.registrationService.getRegistrations();
  }

  editRegistration(id: number) {
    this.router.navigate(['/registrations-add', id]);
  }

  deleteRegistration(id: number) {
    if (confirm('Are you sure you want to delete this registration?')) {
      this.registrationService.deleteRegistration(id);
      this.loadRegistrations(); // Refresh the list
    }
  }

  addNew() {
    this.router.navigate(['/registrations-add']);
  }
}
