import { Routes } from '@angular/router';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthorizationGuard } from './guards/authorization.guard';
import { CustomersComponent } from './customers/customers.component';
import { AccountsComponent } from './accounts/accounts.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { CustomerAccountsComponent } from './customer-accounts/customer-accounts.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },

  // Empty path = layout wrapper with navbar, no URL prefix added
  {
    path: '',
    loadComponent: () =>
      import('./admin-template/admin-template.component').then(m => m.AdminTemplateComponent),
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'customers',             component: CustomersComponent },
      { path: 'accounts',              component: AccountsComponent },
      { path: 'customer-accounts/:id', component: CustomerAccountsComponent },
      {
        path: 'new-customer',
        component: NewCustomerComponent,
        canActivate: [AuthorizationGuard],
        data: { role: 'ADMIN' }
      },
      {
        path: 'not-authorized',
        loadComponent: () =>
          import('./not-authorized/not-authorized.component').then(m => m.NotAuthorizedComponent)
      },
      { path: '', redirectTo: 'customers', pathMatch: 'full' }
    ]
  }
];