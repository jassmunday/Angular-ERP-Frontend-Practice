// import { Component } from '@angular/core';
// import { MenuService } from '../../services/menu.service';
// import { Menu } from '../../../../models/types';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-menu-list',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './menu-list.component.html',
//   styleUrl: './menu-list.component.css'
// })
// export class MenuListComponent {
//   menus: Menu[] = [];

//   constructor(
//     private menuService: MenuService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.loadMenus();
//   }

//   loadMenus() {
//     this.menus = this.menuService.getMenus();
//   }

//   editMenu(menu_name: string) {
//     this.router.navigate(['/edit-menu', menu_name]);
//   }

//   deleteMenu(menu_name: string) {
//     this.menuService.deleteMenu(menu_name);
//     this.loadMenus();
//   }

//   addNewMenu() {
//     this.router.navigate(['/add-menu']);
//   }
// }
