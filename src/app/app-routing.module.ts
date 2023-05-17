import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLoginGuard } from './shared/guards/check-login.guard';
import { LoggedGuard } from './shared/guards/logged.guard';
import { TokenExpiredGuard } from './shared/guards/token-expired.guard';
import { CheckAdminGuard } from './shared/guards/check-admin.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule), canActivate : [] }, 
  { path: 'notFound', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) },
  { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule), canActivate:[CheckAdminGuard,LoggedGuard] },
  { path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule), canActivate:[CheckLoginGuard]},
  { path: 'register', loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterModule) },
  { path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
