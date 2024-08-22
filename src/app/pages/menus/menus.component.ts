// import { Component } from '@angular/core';
// import { MenuService } from '../../services/menu.service';
// import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Menu } from '../../../../models/types';
// import { ActivatedRoute, Router } from '@angular/router';


// @Component({
//   selector: 'app-menus',
//   standalone: true,
//   imports: [ReactiveFormsModule],
//   templateUrl: './menus.component.html',
//   styleUrl: './menus.component.css'
// })

// export class MenusComponent {
//   menuForm: FormGroup;
//   isEditMode: boolean = false;

//   constructor(
//     private menuService: MenuService,
//     private activatedRoute: ActivatedRoute,
//     private router: Router
//   ) {
//     this.menuForm = new FormGroup({
//       parent_name: new FormControl(''),
//       menu_name: new FormControl('', Validators.required),
//       controller_name: new FormControl(''),
//       action_name: new FormControl(''),
//       link_address: new FormControl('')
//     });
//   }

//   ngOnInit(): void {
//     this.activatedRoute.paramMap.subscribe(params => {
//       const menu_name = params.get('menu_name');
//       if (menu_name) {
//         this.isEditMode = true;
//         this.loadMenuData(menu_name);
//       }
//     });
//   }

//   private loadMenuData(menu_name: string) {
//     const menu = this.menuService.getMenuByName(menu_name);
//     if (menu) {
//       this.menuForm.setValue({
//         parent_name: menu.parent_name,
//         menu_name: menu.menu_name,
//         controller_name: menu.controller_name,
//         action_name: menu.action_name,
//         link_address: menu.link_address
//       });
//     }
//   }

//   submit() {
//     if (this.menuForm.valid) {
//       const menuData: Menu = this.menuForm.value;
//       if (this.isEditMode) {
//         this.menuService.editMenu(menuData);
//       } else {
//         this.menuService.addMenu(menuData);
//       }
//       this.router.navigate(['/security/menu-list']);
//     } else {
//       console.log('Form is invalid');
//     }
//   }

//   cancel() {
//     this.router.navigate(['/security/menu-list']);
//   }
// }
