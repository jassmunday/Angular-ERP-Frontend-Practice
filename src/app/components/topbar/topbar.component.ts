import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import { Subscription } from 'rxjs'; // To handle subscription cleanup

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit {
  @Output() toggle = new EventEmitter<void>(); // Output event to toggle sidebar
  isAuthenticated: boolean = false; // This will be shared and updated based on AuthService
  pageTitle: string = 'Home';
  authSubscription!: Subscription; //  To store the subscription for cleanup

  constructor(private router: Router, private authService: AuthService, private toaster: ToastService) {
    // Subscribe to router events to update the page title dynamically
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.updatePageTitle(event.urlAfterRedirects);
      }
    });
  }

  ngOnInit() {
    // Subscribe to the isAuthenticated$ observable to get the authentication state
    this.authSubscription = this.authService.isAuthenticated$.subscribe((authenticated: boolean) => {
      this.isAuthenticated = authenticated;
    });
  }

  updatePageTitle(url: string) {
    const routeName = url.split('/')[1] || 'home';
    this.pageTitle = routeName.charAt(0).toUpperCase() + routeName.slice(1);
  }

  onToggle() {
    this.toggle.emit(); // Emit toggle event
  }

  logout() {
    this.authService.logout();
    this.toaster.showSuccess("Logged Out Successfully");
    // No need to manually set isAuthenticated to false, as it will be updated via the AuthService
  }

  login() {
    this.router.navigate(['student-list']);
  }

  // Clean up the subscription when the component is destroyed
  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
