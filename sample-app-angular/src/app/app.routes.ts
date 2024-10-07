import { Routes } from '@angular/router';
import { authGuard} from './guards/auth.guard';

export const routes: Routes = [
    {path: '', loadComponent: () => import('./login/login.component').then(mod => mod.LoginComponent)},
    {path: 'register', loadComponent: () => import('./register/register.component').then(mod => mod.RegisterComponent)},
    {path: 'home', 
    canActivate:[authGuard],
    loadComponent: () => import('./home/home.component').then(mod => mod.HomeComponent)},
    {path: 'profile', 
    canActivate:[authGuard],
    loadComponent: () => import('./profile/profile.component').then(mod => mod.ProfileComponent)},
    {path: 'chat', 
    canActivate:[authGuard],
    loadComponent: () => import('./chat/chat.component').then(mod => mod.ChatComponent)},
];
