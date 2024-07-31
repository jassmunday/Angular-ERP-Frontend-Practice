import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RelationService {
  private relations: string[] = ['FATHER','MOTHER','SON','DAUGHTER'];
  // An Observable object can be created to notify all the subscribers 
  // about the changes in the array
  getRelations(){
    return this.relations;
  }
  addNewRelation(relation:string){
    this.relations.push(relation);
  }
  deleteRelation(relation:string){
    this.relations = this.relations.filter(value => value !== relation);
  }
}
