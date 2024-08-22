import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RelationService } from '../../services/relation.service';
import { CommonModule } from '@angular/common';
import { Relation } from '../../../../models/types';

@Component({
  selector: 'app-relations',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './relations.component.html',
  styleUrls: ['./relations.component.css']
})
export class RelationsComponent {
  relationForm: FormGroup;
  relations: Relation[] = [];
  
  editingRelation: string | null = null; // Initially set to null

  constructor(private relationService: RelationService) {
    this.loadRelations();
    this.relationForm = new FormGroup({
      relation_id: new FormControl('', [Validators.required]),
      relation_name: new FormControl('', [Validators.required]),
    });
  }
 ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.loadRelations();
 }
  loadRelations() {
    this.relationService.getAllRelation().subscribe((data) => {
      this.relations = data;
    });
  }
  addRelation() {
    const newRelation = this.relationForm.value;
    this.relationService.addNewRelation(newRelation).subscribe(() => {
      this.loadRelations();
    })   
  }

  deleteRelation(id: string) {
    this.relationService.deleteRelation(id).subscribe(() => {
      this.loadRelations();
      this.relationForm.reset();
    })
   
  }
}
