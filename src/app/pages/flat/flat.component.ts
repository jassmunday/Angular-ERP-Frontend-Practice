import { Component, inject } from '@angular/core';
import { FlatService } from '../../services/flat.service';
import { Flats } from '../../../../models/types';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flat',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './flat.component.html',
  styleUrl: './flat.component.css'
})
export class FlatComponent {
  // Dependency Injection
  flatForm: FormGroup; 
  public flats: Flats [] = [];

  constructor(private flatService: FlatService){
    this.flats = this.flatService.getFlats();

    this.flatForm = new FormGroup({
      flat_no: new FormControl(''),
      flat_fee: new FormControl('')
    });
  }
  
  addFlats() {
    const value = this.flatForm.value;
    const duplicateFlat = this.flats.find(flat => flat.flat_no === value.flat_no);

    if (duplicateFlat) {
      alert('Flat number already exists!');
      return;
    }

    this.flatService.addFlats(value);
    this.flats = this.flatService.getFlats();
    this.flatForm.reset();
  }

  deleteFlats(flat_no: number) {
    this.flatService.deleteFlats(flat_no);
    this.flats = this.flatService.getFlats();
    this.flatForm.reset();
  }
}
