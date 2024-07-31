import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  years = ['2020-21', '2021-22', '2022-23'];
  companies = ['Jain Colony', 'Tech Solutions', 'Innovate Inc.'];

  year = new FormControl('', [Validators.required]);
  company = new FormControl('', [Validators.required]);

  welcomeForm = new FormGroup({
    year: this.year,
    company: this.company
  });

  submitForm() {
    if (this.welcomeForm.valid) {
      console.log('Selected Year:', this.welcomeForm.value.year);
      console.log('Selected Company:', this.welcomeForm.value.company);
    } else {
      console.log('Form is invalid');
    }
  }
}
