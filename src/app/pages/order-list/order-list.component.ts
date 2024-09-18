import { Component, OnInit } from '@angular/core';
import { Orders } from '../../../../models/types';
import { Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  orders: Orders[] = [];

  constructor(private ordersService: OrdersService, private router: Router) {}

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
        this.loadOrders(); // Reload the list after deletion
      });
    } else {
      console.error('Invalid order ID');
    }
  }

  generatePdf() {
    const doc = new jsPDF();
  
    // Add heading "ORDERS" at the top of the PDF
    doc.setFontSize(18);
    doc.text('ORDERS', 14, 20);  // Position: x=14, y=20 (y is slightly lower for visibility)
  
    const tableData = this.orders.map(order => [
      order.order_id ?? '',  // Use empty string if undefined
      order.customer_code ?? '',
      
      order.order_date ? new Date(order.order_date).toLocaleDateString() : '',  // Format date or empty string
      order.order_total ?? ''
    ]);
  
    // Add table after the heading with more vertical space (startY: 40 for more gap)
    autoTable(doc, {
      startY: 40,  // Start the table after the heading to avoid overlap
      head: [['Order ID', 'Customer Code', 'Order Date', 'Order Total']],
      body: tableData
    });
  
    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10) ;
    // const formattedDate = today.toISOString().slice(0, 10) + "-" + today.getHours() + "-" + today.getMinutes() ;  // YYYY-MM-DD format
  
    // Save the PDF with the filename "orders_YYYY-MM-DD.pdf"
    doc.save(`orders_${formattedDate}.pdf`);
  }
  
}
