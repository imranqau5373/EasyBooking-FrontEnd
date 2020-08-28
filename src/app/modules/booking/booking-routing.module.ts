import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingPageComponent } from './page/booking-page/booking-page.component';
import { BookingListComponent } from './page/booking-list/booking-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'page',
    pathMatch: 'full'
  },
  {
    path: 'page',
    component: BookingPageComponent
  },
  {
    path: 'list',
    component: BookingListComponent
  },
  {
    path: 'list/:companyid',
    component: BookingListComponent
  },
  {
    path: 'courtlist/:courtid',
    component: BookingListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
