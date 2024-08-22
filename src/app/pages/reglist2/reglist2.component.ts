import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Registration2Service } from '../../services/registration2.service';

import { Registration2 } from '../../../../models/types';
import { CommonModule } from '@angular/common';
import { Regsitration2Service } from '../../services/regsitration2.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reglist2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reglist2.component.html',
  styleUrls: ['./reglist2.component.css']
})
export class Reglist2Component implements OnInit {
  registrations: Registration2[] = [];

  constructor(
    private registrationService: Regsitration2Service,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadRegistrations();
  }

  loadRegistrations() {
    this.registrationService.getRegistrations().subscribe(registrations => {
      this.registrations = registrations;
    });
  }

  editRegistration(id: number) {
    this.router.navigate(['/registrations-add', id]);
  }

  deleteRegistration(id: number) {
    if (confirm('Are you sure you want to delete this registration?')) {
      this.registrationService.deleteRegistration(id).subscribe(() => {
        this.loadRegistrations(); // Refresh the list after deletion
      });
    }
  }

  addNew() {
    this.router.navigate(['/registrations-add']);
  }
}
