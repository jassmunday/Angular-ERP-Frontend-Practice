import { Component } from '@angular/core';
import { Product } from '../../../../models/types';
import { ProductsService } from '../../services/products.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,ProductListComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: Product [] = [] ;
  productForm: FormGroup;
  isEditMode: boolean = false;
  product: Product | null = null;
  editingProductId: string  = '';

  constructor(public productService: ProductsService,public activatedRoute: ActivatedRoute,public router :Router){
    this.loadProducts();
    this.productForm = new FormGroup({
      p_code: new FormControl(null,Validators.required),
      p_name: new FormControl('',Validators.required),
      uom: new FormControl('',Validators.required)
    })
  }

  loadProducts(){
    this.productService.getAllProduct().subscribe((data) => {
      this.products = data;
      console.log(this.products);
    })
  }

  ngOnInit() {
    this.loadProducts();
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadProductsData(id);
        this.isEditMode = true;
        this.editingProductId = id;
      }
    })

  }

  onSubmit(){
    if (this.productForm.valid) {
      if (!this.isEditMode) {
        this.productService.addNewProduct(this.productForm.value).subscribe(() => {
          this.loadProducts();
          console.log('Product data added', this.productForm.value);
        });
      } else {
        this.productService.updateProduct(this.productForm.value, this.editingProductId)
          .subscribe(() => {
            this.loadProducts();
            console.log('Prodcut Upadted');
            this.isEditMode = false;
            this.editingProductId= '';
            //this.router.navigate(['order-list']);
          });
      }
      this.productForm.reset();
    } else {
      console.log('Invalid Product Data');
    }
  }
  loadProductsData(id:string){
    this.productService.getProductById(id).subscribe((data) => {
      this.product = data;
      if(this.product){
        this.productForm.patchValue({
          p_code: this.product.p_code,
          p_name: this.product.p_name,
          uom: this.product.uom
        })
      }
    })
  }

  editProduct(id: string) {
    this.loadProductsData(id);
    this.isEditMode = true;
    this.editingProductId = id;
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }
}

