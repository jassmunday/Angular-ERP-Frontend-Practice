import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrdersService } from '../../services/orders.service';
import { ProductsService } from '../../services/products.service';
import { CustomersService } from '../../services/customers.service';
import { UomService } from '../../services/uom.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { Customer } from '../../../../models/types';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductListComponent } from '../product-list/product-list.component';
import { ModalComponent } from '../modal/modal.component';

import {
  Orders,
  Product,
  Uom,
  Customer,
  OrderItem,
} from '../../../../models/types';

type OrderItemsFormGroup = FormGroup<{
  code: FormControl<number>;
  name: FormControl<string>;
  uom: FormControl<string>;
  quantity: FormControl<number>;
  rate: FormControl<number>;
  amount: FormControl<number>;
}>;

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  orders: Orders[] = [];
  order: Orders | null = null;
  orderForm: FormGroup;

  isEditForm: boolean = false;
  editingOrderId = '';

  selectedProduct: Product | null = null;

  products: Product[] = [];
  product: Product | null = null;
  productName = '';

  customer: Customer[] = [];
  cstmr: Customer | null = null;

  measurments: Uom[] = [];

  constructor(
    public orderService: OrdersService,
    public customerService: CustomersService,
    public measurementService: UomService,
    public productService: ProductsService,
    public routes: ActivatedRoute,
    public dialogRef: MatDialog,
    public router: Router
  ) {
    this.orderForm = new FormGroup({
      order_id: new FormControl(0, Validators.required),
      customer_code: new FormControl(0, Validators.required),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      order_date: new FormControl('', Validators.required),
      payment_mode: new FormControl('', Validators.required),
      order_total: new FormControl('', Validators.required),
      order_items: new FormArray<OrderItemsFormGroup>([]),
    });
  }

  get order_items() {
    return this.orderForm.get('order_items') as FormArray<OrderItemsFormGroup>;
  }

  addOrderItems() {
    this.order_items.push(
      new FormGroup({
        code: new FormControl(0, Validators.required),
        name: new FormControl('', Validators.required),
        uom: new FormControl('', Validators.required),
        quantity: new FormControl(0, Validators.required),
        rate: new FormControl(0, Validators.required),
        amount: new FormControl(0, Validators.required),
      }) as OrderItemsFormGroup
    );

    this.orderForm.get('order_total')?.setValue(0);
    this.calculateOrderTotal();
  }

  loadAllOrders() {
    // Load all orders
    this.orderService.getAllOrders().subscribe((data) => {
      this.orders = data;
      console.log(this.orders);
      //  this .orders is an array of type following objects {
      //   order_id: '1',
      //   customer_code: 1001,
      //   phone: '7696296513',
      //   address: 'some random',
      //   order_date: '2024-08-17',
      //   payment_mode: 'cash',
      //   order_total: 56,
      //   order_items: [
      //     {
      //       code: 101,
      //       name: 'product_name',
      //       uom: 'Liters',
      //       quantity: 1,
      //       rate: 56,
      //       amount: 57,
      //     }
      //   ],
      // }
    });

    // Load all customers
    this.customerService.getAllCustomer().subscribe((customersData) => {
      this.customer = customersData;
      console.log(this.customer);
      // this.customer is an array of the below objects
      // {
      //   c_code: 1001,
      //   c_name: 'John Doe',
      //   c_phone: '5551234567',
      //   c_address: '123 Main Street, Springfield, IL 62701',
      // }
    });

    // Load all products
    this.productService.getAllProduct().subscribe((productsData) => {
      this.products = productsData;
      console.log(this.products);
      //  this.products is a array of the following objects {
      //   p_code: 101,
      //   p_name: 'Widget A',
      //   uom: 'pcs',
      // },
    });

    // Load all units of measurement (UOM)
    this.measurementService.getAllUom().subscribe((uomData) => {
      this.measurments = uomData;
      console.log(this.measurments);
      // this.measurements is an array of the following objects {
      //   measurement_code: 'LTR',
      //   measurement_name: 'Liters',
      // },
    });
  }
  removeOrderItems(index: number) {
    // Remove the item from the order_items FormArray
    this.order_items.removeAt(index);

    // Recalculate the total after the item is removed
    this.calculateOrderTotal();
  }

  ngOnInit(): void {
    this.loadAllOrders();
    this.routes.paramMap.subscribe((params) => {
      const id = params.get('_id');
      if (id) {
        this.editingOrderId = id || '';
        this.isEditForm = true;
        this.loadOrdersData(this.editingOrderId);
      }
    });
  }

  onSubmit() {
    if (this.orderForm.valid) {
      if (!this.isEditForm) {
        this.orderService.addNewOrders(this.orderForm.value).subscribe(() => {
          this.loadAllOrders();
          console.log('Order data added', this.orderForm.value);
          this.router.navigate(['order-list']);
        });
      } else {
        this.orderService
          .updateOrders(this.orderForm.value, this.editingOrderId)
          .subscribe(() => {
            this.loadAllOrders();
            console.log('Order Edited');
            this.isEditForm = false;
            this.editingOrderId = '';
            this.router.navigate(['order-list']);
          });
      }
      this.orderForm.reset();
      this.order_items.clear(); // Clear order items after form reset
    } else {
      console.log('Invalid Order Data');
    }
  }
  
  openProductModal(index: number) {
    const dialogRef = this.dialogRef.open(ProductListComponent);
    
    dialogRef.componentInstance.productSelected.subscribe(
      (product: Product) => {
        this.selectedProduct = product; // Capture the selected product
        console.log(this.selectedProduct);
        if (this.selectedProduct) {
          const orderItem = this.order_items.at(index);
          orderItem.patchValue({
            code: this.selectedProduct.p_code,
            name: this.selectedProduct.p_name,
            uom: this.selectedProduct.uom,
          });
          this.calculateAmount(index); // Recalculate amount based on selected product
        }

        //this.fillProductDetails(product); // Fill details into the form array
      }
    );
  }

  calculateOrderTotal(): void {
    this.orderForm.get('order_total')?.setValue(0);

    let total = 0;
    this.order_items.controls.forEach((item) => {
      total += item.get('amount')?.value || 0;
    });
    this.orderForm.get('order_total')?.setValue(total);
  }

  onCustomerChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const code = parseInt(selectElement.value);
    this.customerService.getCustomerByCode(code).subscribe((value) => {
      this.cstmr = value;
      console.log(this.cstmr);
      this.orderForm.get('phone')?.setValue(this.cstmr?.c_phone || '');
      this.orderForm.get('address')?.setValue(this.cstmr?.c_address || '');
    });
    let date = new Date();
    console.log(date);

    this.orderForm.get('order_date')?.setValue(date);
  }

  onProductChange(index: number): void {
    var productCode = this.order_items.at(index).get('code')?.value || 0;
    //console.log(productCode);
    this.productService.getProductByCode(productCode).subscribe((data) => {
      //console.log(data);
      this.product = data;
      if (this.product) {
        this.order_items.at(index).patchValue({
          name: this.product.p_name,
          uom: this.product.uom,
        });
      }
    });
  }

  calculateAmount(index: number): void {
    const quantity = this.order_items.at(index).get('quantity')?.value || 0;
    const rate = this.order_items.at(index).get('rate')?.value || 0;
    const amount = quantity * rate;

    this.order_items.at(index).patchValue({
      amount: amount,
    });

    this.calculateOrderTotal();
  }

  cancel() {
    this.orderForm.reset();
    this.order_items.clear(); // Clear order items after form reset
    this.isEditForm = false;
    this.editingOrderId = '';
  }

  loadOrdersData(id: string) {
    return this.orderService.getOrdersById(id).subscribe((ordersData) => {
      this.order = ordersData;

      if (this.order) {
        const order_items = this.orderForm.get('order_items') as FormArray;

        // Clear the existing form array before loading new data
        order_items.clear();

        if (this.order.order_items && Array.isArray(this.order.order_items)) {
          this.order.order_items.forEach((value) => {
            const orderItemGroup = new FormGroup({
              code: new FormControl(value.code, Validators.required),
              name: new FormControl(value.name, Validators.required),
              uom: new FormControl(value.uom, Validators.required),
              quantity: new FormControl(value.quantity, Validators.required),
              rate: new FormControl(value.rate, Validators.required),
              amount: new FormControl(value.amount, Validators.required),
            }) as OrderItemsFormGroup;

            order_items.push(orderItemGroup);
          });
        }

        // Patch other form values
        this.orderForm.patchValue({
          order_id: this.order.order_id,
          customer_code: this.order.customer_code,
          phone: this.order.phone,
          address: this.order.address,
          order_date: this.order.order_date,
          payment_mode: this.order.payment_mode,
          order_total: this.order.order_total,
        });
      }
    });
  }

  editOrder(id: string) {
    this.loadOrdersData(id);
    this.isEditForm = true;
    this.editingOrderId = id;
  }

  deleteOrder(id: string) {
    this.orderService.deleteOrders(id).subscribe(() => {
      this.loadAllOrders();
    });
  }
}
