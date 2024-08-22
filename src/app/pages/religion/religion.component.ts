import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReligionService } from '../../services/religion.service';
import { Religion } from '../../../../models/types';

@Component({
  selector: 'app-religion',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './religion.component.html',
  styleUrl: './religion.component.css'
})
export class ReligionComponent {
  religionForm: FormGroup;
  religions: Religion[] = [];
  
  editingReligion: string | null = null; // Initially set to null

  constructor(private religionService: ReligionService) {
    this.loadReligions();
    this.religionForm = new FormGroup({
      religion_id: new FormControl('', [Validators.required]),
      religion_name: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadReligions();
   }

  loadReligions() {
    this.religionService.getAllReligion().subscribe((data) => {
      this.religions = data;
    });
  }
  addReligion() {
    const newReligion = this.religionForm.value;
    this.religionService.addNewReligion(newReligion).subscribe(() => {
      this.loadReligions();
    })   
  }

  deleteReligion(id: string) {
    this.religionService.deleteReligion(id).subscribe(() => {
      this.loadReligions();
      this.religionForm.reset();
    })
   
  }

}
