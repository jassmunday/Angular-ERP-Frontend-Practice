import { Component, EventEmitter, Output } from '@angular/core';
import { Product } from '../../../../models/types';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'] // Corrected styleUrl to styleUrls
})
export class ProductListComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  @Output() productSelected = new EventEmitter<Product>();

  constructor(
    private productService: ProductsService,
    private router: Router,
    public dialogRef: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProduct().subscribe((data) => {
        console.log(data);
        this.products = data;
        this.filteredProducts = data; // Initialize filteredProducts
      });
  }

  editProduct(_id: string | undefined) {
    if (_id) {
      this.router.navigate(['products-manage', _id]);
    } else {
      console.error('Invalid product ID');
    }
  }

  addProduct() {
    this.router.navigate(['products-manage']);
  }

  deleteProduct(_id: string | undefined) {
    if (_id) {
      this.productService.deleteProduct(_id).subscribe(() => {
        this.loadProducts(); // Reload products after deletion
      });
    } else {
      console.error('Invalid product ID');
    }
  }

  onSearchChange() {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(product => {
      // Convert p_code to a string and then compare
      const productCodeStr = product.p_code.toString();
      return (
        product.p_name.toLowerCase().includes(lowerCaseSearchTerm) ||
        productCodeStr.includes(lowerCaseSearchTerm)
      );
    });
  }  
  selectProduct(product: Product) {
    this.productSelected.emit(product);
    console.log(product);
    this.closeModal();
  }
  closeModal(){
    this.dialogRef.closeAll();
  }
}
