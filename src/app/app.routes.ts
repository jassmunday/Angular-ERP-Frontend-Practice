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
import { UserComponent } from './pages/user/user.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { Registration2Component } from './pages/registration2/registration2.component';
import { Reglist2Component } from './pages/reglist2/reglist2.component';
//import { MenusComponent } from './pages/menus/menus.component';

//import { MenuListComponent } from './pages/menu-list/menu-list.component';
import { RolePermissionsComponent } from './pages/role-permissions/role-permissions.component';
import { DetailFormComponent } from './pages/detail-form/detail-form.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { OrdersComponent } from './pages/orders/orders.component';


export const routes: Routes = [
  { path: 'masters/companies', component: CompaniesComponent },
  { path: 'masters/categories', component: CategoriesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'masters/relations', component: RelationsComponent },
  { path: 'masters/religions', component: ReligionComponent},
  { path: '', component: WelcomeComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'not-found', component: NotfoundComponent },
  { path: 'masters/users', component: UserComponent },
  { path: 'company-list', component: CompaniesComponent }, // Duplicated

  { path: 'add-company', component: AddcompanyComponent }, // Route for adding a new company
  { path: 'edit-company/:_id', component: AddcompanyComponent }, // Route for editing a company
  { path: 'registrations', component: RegistrationComponent },

  { path: 'registrations-add', component: Registration2Component},
  { path: 'registrations-add/:id', component: Registration2Component},
  { path: 'registrations-list-new', component: Reglist2Component},

  { path: 'registrations/:_id', component: RegistrationComponent },
  { path: 'registrations-list', component: RegistrationListComponent },
  
  { path: 'masters/flats', component: FlatComponent },
 // { path: 'security/menu-list', component: MenuListComponent },
  //{ path: 'add-menu', component: MenusComponent },
  //{ path: 'edit-menu/:menu_name', component: MenusComponent },
  { path: 'security/roles', component: RolePermissionsComponent},

  { path: 'detail-form', component: DetailFormComponent },
  { path: 'detail-form/:_id', component: DetailFormComponent },
  { path: 'student-list', component: StudentListComponent },


  { path: 'order-form', component: OrdersComponent},
  { path: 'order-form/:_id', component: OrdersComponent },
  { path: 'order-list', component: OrderListComponent },

  { path: '**', redirectTo: '/not-found' }
  
];
