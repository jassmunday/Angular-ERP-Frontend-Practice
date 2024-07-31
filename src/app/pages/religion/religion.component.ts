import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReligionService } from '../../services/religion.service';

@Component({
  selector: 'app-religion',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './religion.component.html',
  styleUrl: './religion.component.css'
})
export class ReligionComponent {

  religions: string[];

  religionForm = new FormGroup({
    religionValue: new FormControl('', [Validators.required])
  });

  constructor(public religionService: ReligionService) {
    this.religions = this.religionService.getReligions();
  }

  addReligion() {
    const value = this.religionForm.value.religionValue?.trim() || "";
    if (value && !this.religions.includes(value)) {
      this.religionService.addNewReligions(value);
      this.religions = this.religionService.getReligions(); // Refresh the list
      this.religionForm.reset(); // Clear the input field
    }
  }

  deleteReligion(religion: string) {
    if (this.religions.includes(religion)) {
      this.religionService.deleteReligions(religion);
      this.religions = this.religionService.getReligions(); // Refresh the list
    }
  }

}
