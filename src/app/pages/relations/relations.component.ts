import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RelationService } from '../../services/relation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-relations',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './relations.component.html',
  styleUrls: ['./relations.component.css']
})
export class RelationsComponent {
  relations: string[];

  relationForm = new FormGroup({
    relationValue: new FormControl('', [Validators.required])
  });

  constructor(public relationService: RelationService) {
    this.relations = this.relationService.getRelations();
  }

  addRelation() {
    const value = this.relationForm.value.relationValue?.trim() || "";
    if (value && !this.relations.includes(value)) {
      this.relationService.addNewRelation(value);
      this.relations = this.relationService.getRelations(); // Refresh the list
      this.relationForm.reset(); // Clear the input field
    }
  }

  deleteRelation(relation: string) {
    if (this.relations.includes(relation)) {
      this.relationService.deleteRelation(relation);
      this.relations = this.relationService.getRelations(); // Refresh the list
    }
  }
}
