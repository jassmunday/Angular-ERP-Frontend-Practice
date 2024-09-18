import { Component, AfterViewInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { ProductsService } from '../../services/products.service';
import { CustomersService } from '../../services/customers.service';
import { Customer, Product, Uom, Orders } from '../../../../models/types';
import { UomService } from '../../services/uom.service';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  orders: Orders[] = [];
  products: Product[] = [];
  customer: Customer[] = [];

  revenueChart: Chart | null = null;
  ordersChart: Chart | null = null;
  constructor(
    private orderService: OrdersService,
    private customerService: CustomersService,
    private productService: ProductsService
  ) {}
  
  ngAfterViewInit(): void {
    // Delay the initialization slightly to ensure the canvas elements are rendered
    setTimeout(() => {
      this.initializeRevenueChart();
      this.initializeOrdersChart();
    }, 100); // Small delay for view to render
  }

  ngOnInit() {
    this.loadAllOrders();
  }

  initializeRevenueChart() {
    const ctx = document.getElementById('revenueChart') as HTMLCanvasElement;
    this.revenueChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Revenue',
            data: [1000, 1900, 2700, 7700, 7700, 6000, 8050],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true
          }
        }
      }
    });
  }

  initializeOrdersChart() {
    const ctx = document.getElementById('ordersChart') as HTMLCanvasElement;
    this.ordersChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Orders',
            data: [5, 12, 8, 18, 10, 14, 20],
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true
          }
        }
      }
    });
  }

  updateCharts() {
    // Update charts if necessary, based on new data
    if (this.revenueChart) {
      this.revenueChart.update();
    }
    if (this.ordersChart) {
      this.ordersChart.update();
    }
  }

  loadAllOrders() {
    this.orderService.getAllOrders().subscribe((data) => {
      this.orders = data;
    });

    this.customerService.getAllCustomer().subscribe((customersData) => {
      this.customer = customersData;
    });

    this.productService.getAllProduct().subscribe((productsData) => {
      this.products = productsData;
    });
  }

  calculateTotalRevenue(): number {
    return this.orders.reduce((total, order) => total + order.order_total, 0);
  }
}
