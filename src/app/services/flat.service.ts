import { Injectable } from '@angular/core';
import { Flats } from '../../../models/types';

@Injectable({
  providedIn: 'root'
})
export class FlatService {
  private flats: Flats[] = [
    {
      flat_no: 1,
      flat_fee: 10000
    },
    {
      flat_no: 2,
      flat_fee: 12000
    }
  ];

  constructor() {}

  // Retrieve the list of flats
  getFlats(): Flats[] {
    return this.flats;
  }

  // Add a new flat to the list
  addFlats(newFlat: Flats): void {
    this.flats.push(newFlat);
  }

  // Remove a flat by its number
  deleteFlats(flatNo: number): void {
    this.flats = this.flats.filter(flat => flat.flat_no !== flatNo);
  }

  // Update an existing flat's information
  editFlats(updatedFlat: Flats): void {
    const index = this.flats.findIndex(flat => flat.flat_no === updatedFlat.flat_no);
    if (index !== -1) {
      this.flats[index] = updatedFlat;
    }
  }
}
