import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./user-flow/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./user-flow/sign-up/sign-up.component').then(
        (m) => m.SignUpComponent
      ),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./user-flow/reset-password/reset-password.component').then(
        (m) => m.ResetPasswordComponent
      ),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./user-flow/forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent
      ),
  },
  {
    path: 'polls',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'create-private-poll',
    loadComponent: () =>
      import(
        './features/create-private-poll/create-private-poll.component'
      ).then((m) => m.CreatePrivatePollComponent),
  },
  {
    path: '**',
    redirectTo: 'polls',
  },
];
