import { Routes, RouterModule } from '@angular/Router';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { RegisterComponent } from './login/register.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { PromesasComponent } from './pages/promesas/promesas.component';
import { RxjsComponent } from './pages/rxjs/rxjs.component';
import { LoginGuardGuard } from './services/login-guard.guard';

const appRoutes: Routes = [
    {
      path: '', 
      component: PagesComponent, 
      canActivate: [LoginGuardGuard],
      children: [
        {path: 'dashboard', component: DashboardComponent, data: { titulo: 'Tablero de Control'}},
        {path: 'progress', component: ProgressComponent, data: { titulo: 'Progress Bar'}},
        {path: 'graficas', component: Graficas1Component, data: { titulo: 'Graficas'}},
        {path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'}},
        {path: 'rxjs', component: RxjsComponent, data: { titulo: 'Observables'}},
        {path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de Template'}},
        {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      ]
    },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '**', component: PagesComponent}
  ];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true});
