import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  private authSubscription!: Subscription; // Subscription for auth state changes

  isDropdownOpen: { [key: string]: boolean } = {
    masters: false,
    security: false,
  };

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Subscribe to authentication state
    this.authSubscription = this.authService.isAuthenticated$.subscribe((authenticated: boolean) => {
      this.isAuthenticated = authenticated;
    });
  }

  toggleDropdown(dropdownName: string) {
    this.isDropdownOpen[dropdownName] = !this.isDropdownOpen[dropdownName];
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
