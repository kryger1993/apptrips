import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TripsDetailComponent } from './components/trips-detail/trips-detail.component';

export const routes: Routes = [
  {
    path: 'trips',
    component: HomeComponent
  }, {
    path: 'trips/:id',
    loadComponent: () => import('./components/trips-detail/trips-detail.component').then(c => c.TripsDetailComponent)
  }, {
    path: '',
    redirectTo: '/trips',
    pathMatch: 'full'
  }/*
  TODO implement not found page
  , {
    path: '**',
    component: PageNotFoundComponent
  } */
];
