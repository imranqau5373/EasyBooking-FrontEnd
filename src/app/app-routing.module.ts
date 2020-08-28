import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { AuthGuard } from '@core/guard/auth-guard';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { CandidateLayoutComponent } from './layout/candidate-layout/candidate-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin',
    pathMatch: 'full',
  },
  //all the modules we are using after login
  {
    path: 'admin',
    component: ContentLayoutComponent,
    canActivate: [AuthGuard],
    //all the modules under the route admin e.g admin/add-job
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@modules/admin/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('@modules/admin/sports/sports.module').then(m => m.SportsModule)
      },
      {
        path: 'users',
        loadChildren: () =>
          import('@modules/admin/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'facilities',
        loadChildren: () =>
          import('@modules/admin/courts/courts.module').then(m => m.CourtsModule)
      },
      {
        path: 'duration',
        loadChildren: () =>
          import('@modules/admin/court-duration/court-duration.module').then(m => m.CourtDurationModule)
      },
      {
        path: 'my-bookings',
        loadChildren: () =>
          import('@modules/admin/my-bookings/my-bookings.module').then(m => m.MyBookingsModule)
      },
      {
        path: 'company',
        loadChildren: () =>
          import('@modules/admin/company/company.module').then(m => m.CompanyModule)
      },

    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('@modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'booking',
    component: CandidateLayoutComponent,
    loadChildren: () =>
      import('@modules/booking/booking.module').then(m => m.BookingModule)
  },


 

  // Fallback when no prior routes is matched
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes
    , {
      relativeLinkResolution: 'corrected'
    }
    //  , { enableTracing: true }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
