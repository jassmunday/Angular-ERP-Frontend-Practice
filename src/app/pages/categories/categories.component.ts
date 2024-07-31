import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  categories: string[] = ['Shop', 'Resident'];

  editingCategory: string | null = null; // Initially set to null

  category = new FormControl('', [Validators.required]);

  categoryForm = new FormGroup({
    category: this.category,
  });

  addCategory() {
    
    const value: any = this.categoryForm.value.category;
    if (!value) {
      return; // Do nothing if the value is empty or only spaces
    }
    // If we are going to edit the category this will work
    if (this.editingCategory) {
      // find index of category that is passed to be edited
      const index = this.categories.indexOf(this.editingCategory);
      if(index !== -1){
        // after finding the index of value that is passed for editing
        // set its index value to the captured value from form 
        this.categories[index] = value;
        this.editingCategory = null;
      }
    } else {
      // The else statement will work for adding new value
    
      this.categories.push(value);
    }
    this.categoryForm.reset();
  }

  deleteCategory(category: string) {
    // Filtering the categories array to not contain the value passed as
    // argument to delete
    this.categories = this.categories.filter((value) => value !== category);
    if (this.editingCategory === category) {
      this.editingCategory = null;
      this.categoryForm.reset();
    }

  }

  editCategory(category: string) {
    // To Create the Referance to the Particular category that we want to edit
    this.editingCategory = category;
    // by this code the now the category input will contain the current value of 
    // category that we are going to edit
    this.category.setValue(category);
  }

  cancelEdit(){
    this.editingCategory = null;
    this.categoryForm.reset();
  }


}
