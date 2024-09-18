import { Routes } from '@angular/router';
import { CompaniesComponent } from './pages/companies/companies.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AddcompanyComponent } from './pages/addcompany/addcompany.component';
import { RelationsComponent } from './pages/relations/relations.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { FlatComponent } from './pages/flat/flat.component';
import { RegistrationListComponent } from './pages/registration-list/registration-list.component';
import { ReligionComponent } from './pages/religion/religion.component';
//import { UserComponent } from './pages/user/user.component';

import { NotfoundComponent } from './pages/notfound/notfound.component';
import { Registration2Component } from './pages/registration2/registration2.component';
import { Reglist2Component } from './pages/reglist2/reglist2.component';
import { RolePermissionsComponent } from './pages/role-permissions/role-permissions.component';
import { DetailFormComponent } from './pages/detail-form/detail-form.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { authGuard } from './services/auth.guard'; // Import your Auth Guard
import { UserComponent } from './pages/user/user.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // No guard on login
  
  // Protected Routes
  { path: 'welcome', component: WelcomeComponent, canActivate: [authGuard] },
  { path: 'masters/companies', component: CompaniesComponent, canActivate: [authGuard] },
  { path: 'masters/categories', component: CategoriesComponent, canActivate: [authGuard] },
  { path: 'masters/relations', component: RelationsComponent, canActivate: [authGuard] },
  { path: 'masters/religions', component: ReligionComponent, canActivate: [authGuard] },
  { path: 'company-list', component: CompaniesComponent, canActivate: [authGuard] },
  { path: 'add-company', component: AddcompanyComponent, canActivate: [authGuard] },
  { path: 'edit-company/:_id', component: AddcompanyComponent, canActivate: [authGuard] },
  { path: 'registrations', component: RegistrationComponent, canActivate: [authGuard] },
  { path: 'registrations-add', component: Registration2Component, canActivate: [authGuard] },
  { path: 'registrations-add/:id', component: Registration2Component, canActivate: [authGuard] },
  { path: 'registrations-list-new', component: Reglist2Component, canActivate: [authGuard] },
  { path: 'registrations-list', component: RegistrationListComponent, canActivate: [authGuard] },
  { path: 'masters/flats', component: FlatComponent, canActivate: [authGuard] },
  { path: 'security/roles', component: RolePermissionsComponent, canActivate: [authGuard] },
  { path: 'detail-form', component: DetailFormComponent, canActivate: [authGuard] },
  { path: 'detail-form/:_id', component: DetailFormComponent, canActivate: [authGuard] },
  { path: 'student-list', component: StudentListComponent, canActivate: [authGuard] },
  { path: 'order-form', component: OrdersComponent, canActivate: [authGuard] },
  { path: 'order-form/:_id', component: OrdersComponent, canActivate: [authGuard] },
  { path: 'order-list', component: OrderListComponent, canActivate: [authGuard] },
  { path: 'products-manage', component: ProductsComponent, canActivate: [authGuard] },
  { path: 'products-manage/:id', component: ProductsComponent, canActivate: [authGuard] },
  { path: 'products', component: ProductListComponent, canActivate: [authGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  
  // Catch-all route, redirect to 404 if route doesn't exist
  { path: 'not-found', component: NotfoundComponent },
  
  // Redirect to login if no route matches
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },

  // Fallback route for undefined routes
  { path: '**', redirectTo: '/not-found' }
];
