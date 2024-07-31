import { Injectable } from '@angular/core';
import { Menu } from '../../../models/types';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  // Example menus data for Menu
  private menus: Menu[] = [
    {
      parent_name: '',
      menu_name: 'Masters',
      controller_name: '',
      action_name: '',
      link_address: '',
    },
    {
      parent_name: 'Masters',
      menu_name: 'Companies',
      controller_name: 'Companies',
      action_name: 'Companies List',
      link_address: 'masters/companies',
    },
    {
      parent_name: 'Masters',
      menu_name: 'Registration',
      controller_name: 'Registration',
      action_name: 'Registration List',
      link_address: 'masters/registration',
    },
    {
      parent_name: 'Masters',
      menu_name: 'Users',
      controller_name: 'Users',
      action_name: 'Users List',
      link_address: 'masters/users',
    },
    {
      parent_name: 'Masters',
      menu_name: 'Relations',
      controller_name: 'Relations',
      action_name: 'Relations List',
      link_address: 'masters/relations',
    },
    {
      parent_name: 'Masters',
      menu_name: 'Registers',
      controller_name: 'Registers',
      action_name: 'Registers List',
      link_address: 'masters/registers',
    },
    {
      parent_name: 'Masters',
      menu_name: 'Categories',
      controller_name: 'Categories',
      action_name: 'Categories List',
      link_address: 'masters/categories',
    },
  ];
  

  constructor() {}

  // Method to get all menus
  getMenus(): Menu[] {
    return this.menus;
  }

  // Method to add a new menu
  addMenu(menu: Menu): void {
    try {
      this.menus.push(menu);
      console.log('Menu Added Successfully');
    } catch (error) {
      console.log('Error while adding menu: ' + error);
    }
  }

  // Method to update an existing menu
  editMenu(updatedMenu: Menu): void {
    const index = this.menus.findIndex(
      m => m.menu_name === updatedMenu.menu_name
    );
    if (index !== -1) {
      this.menus[index] = updatedMenu;
    }
  }

  // Method to delete a menu
  deleteMenu(menu_name: string): void {
    this.menus = this.menus.filter(
      m => m.menu_name !== menu_name
    );
  }

  // Method to get a menu by name
  getMenuByName(menu_name: string): Menu | undefined {
    return this.menus.find(
      m => m.menu_name === menu_name
    );
  }
}
