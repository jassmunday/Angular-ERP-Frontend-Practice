import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MenuService } from '../../services/menu.service';
import { Menu } from '../../../../models/types';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  displayedColumns: string[] = ['serialNo', 'menuName', 'parentName', 'controllerName', 'actionName', 'linkAddress', 'actions'];
  dataSource = new MatTableDataSource<Menu>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private menuService: MenuService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMenus();
  }

  loadMenus() {
    this.dataSource.data = this.menuService.getMenus();
    this.dataSource.paginator = this.paginator;
  }

  editMenu(menuName: string) {
    this.router.navigate(['/edit-menu', menuName]);
  }

  deleteMenu(menuName: string) {
    this.menuService.deleteMenu(menuName);
    this.loadMenus();
  }

  addNewMenu() {
    this.router.navigate(['/add-menu']);
  }
}
