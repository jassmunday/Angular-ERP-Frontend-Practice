import { Component, EventEmitter, Output } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {
  @Output() toggle = new EventEmitter<void>(); // Output event to toggle sidebar

  pageTitle: string = 'Home';

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.updatePageTitle(event.urlAfterRedirects);
      }
    });
  }

  updatePageTitle(url: string) {
    const routeName = url.split('/')[1] || 'home';
    this.pageTitle = routeName.charAt(0).toUpperCase() + routeName.slice(1);
  }

  onToggle() {
    this.toggle.emit(); // Emit toggle event
  }
}
