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
  flats: Flats [] = [];

  constructor(private flatService: FlatService){
   this.loadFlats();

    this.flatForm = new FormGroup({
      flat_no: new FormControl(''),
      flat_name: new FormControl(''),
      flat_price: new FormControl('')
    });
  }
  
  ngOnInit(): void {
   this.loadFlats(); 
  }
  loadFlats(){
    this.flatService.getAllFlats().subscribe((data) => {
      this.flats = data;
      console.log(this.flats);
    })
  }
  addFlats() {
    const newFlat = this.flatForm.value;
    this.flatService.addNewFlat(newFlat).subscribe(() => {
      this.loadFlats();
    })   
  }

  deleteFlats(id: string) {
    this.flatService.deleteFlat(id).subscribe(() => {
      this.loadFlats();
      this.flatForm.reset();
    })
   
  }
}
