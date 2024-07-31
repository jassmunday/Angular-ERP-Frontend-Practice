import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  isDropdownOpen: { [key: string]: boolean } = {
    masters: false,
    security: false,
  };

  toggleDropdown(dropdownName: string) {
    this.isDropdownOpen[dropdownName] = !this.isDropdownOpen[dropdownName];
  }
}
