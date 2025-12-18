import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './features/auth/auth.routes';
import { DashboardLayout } from './layout/dashboard/dashboard-layout';
import { DASHBOARD_LAYOUT_ROUTES } from './layout/dashboard/dashboard.layout.routes';
import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/no-auth.guard';


export const routes: Routes = [
    {
        path: 'auth',
        children: AUTH_ROUTES,
        // canActivate: [NoAuthGuard]
    },
    {
        path: 'dashboard',
        component: DashboardLayout,
        children: DASHBOARD_LAYOUT_ROUTES,
        // canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'auth'
    }
];
