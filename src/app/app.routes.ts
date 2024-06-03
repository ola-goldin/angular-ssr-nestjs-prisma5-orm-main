import { Routes } from '@angular/router';
import { TreeComponent } from './components/tree/tree.component';

export const routes: Routes = [
    { path: 'Home', component: TreeComponent }, 
    { path: '', redirectTo: '/Home', pathMatch: 'full' },
    { path: '**', component: TreeComponent } 
];
