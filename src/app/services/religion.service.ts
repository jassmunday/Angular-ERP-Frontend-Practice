import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReligionService {
  private religions: string[] = ['SIKH','HINDU','MUSLIM','CHRISTAN'];
  // An Observable object can be created to notify all the subscribers 
  // about the changes in the array
  getReligions(){
    return this.religions;
  }
  addNewReligions(relation:string){
    this.religions.push(relation);
  }
  deleteReligions(religion:string){
    this.religions = this.religions.filter(value => value !== religion);
  }
  constructor() { }
}
