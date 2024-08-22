import { Component, OnInit } from '@angular/core';
import { Orders } from '../../../../models/types';
import { Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {

  orders: Orders[] = [];

  constructor(
    private ordersService: OrdersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.ordersService.getAllOrders().subscribe((orders) => {
        console.log(orders);
        this.orders = orders;
      });
  }

  editOrder(_id: string | undefined) {
    if (_id) {
      this.router.navigate(['order-form', _id]);
    } else {
      console.error('Invalid order ID');
    }
  }

  addOrder() {
    this.router.navigate(['order-form']);
  }

  deleteOrder(_id: string | undefined) {
    if (_id) {
      this.ordersService.deleteOrders(_id).subscribe(() => {
        this.loadOrders();  // Reload the list after deletion
      });
    } else {
      console.error('Invalid order ID');
    }
  }
}
