import { Routes } from '@angular/router';

export const DASHBOARD_LAYOUT_ROUTES: Routes = [
    {
        path: 'users',
        loadComponent: async ()=>  await import('../../features/users/pages/user-list-page')
    }
]