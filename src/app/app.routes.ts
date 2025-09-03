import { Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';

export const routes: Routes = [
    {
        path: '', loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
    },
    {
        path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'dashboard', loadChildren: () => import('./admin/admin.module')
        .then(m => m.AdminModule), canActivate: [AuthGuard]
    },
];
