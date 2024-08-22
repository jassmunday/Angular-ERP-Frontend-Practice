import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '../../../../models/types';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  categoryForm: FormGroup;
  categories: Category[] = [];
  
  editingCategory: string | null = null; // Initially set to null

  constructor(private categoryService: CategoryService) {
    this.loadCategories();
    this.categoryForm = new FormGroup({
      category_no: new FormControl('', [Validators.required]),
      category_name: new FormControl('', [Validators.required]),
    });
  }
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadCategories();
   }

  loadCategories() {
    this.categoryService.getAllCategory().subscribe((data) => {
      this.categories = data;
    });
  }
  addCategory() {
    const newCategory = this.categoryForm.value;
    this.categoryService.addNewCategory(newCategory).subscribe(() => {
      this.loadCategories();
    })   
  }

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.loadCategories();
      this.categoryForm.reset();
    })
   
  }
}
