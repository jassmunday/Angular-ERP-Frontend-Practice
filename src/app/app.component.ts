import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { TopbarComponent } from "./components/topbar/topbar.component";
import { CategoriesComponent } from './pages/categories/categories.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
            RegistrationComponent, 
            SidebarComponent, 
            TopbarComponent,
            CategoriesComponent, 
            CompaniesComponent,
            ReactiveFormsModule,
            MatTableModule,
            MatPaginatorModule,
            MatButtonModule,
            MatSortModule
          ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project';
  sidebarVisible = true; // State to track sidebar visibility

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
