import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCompanyComponent } from '../company/pages/list-company/list-company.component';
import { CreateCompanyComponent } from '../company/pages/create-company/create-company.component';
import { CompanyDetailsComponent } from './pages/company-details/company-details.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'company-list',
    pathMatch: 'full'
  },
  {
    path: 'company-list',
    component: ListCompanyComponent
  },
  {
    path: 'company-create',
    component: CreateCompanyComponent
  },
  {
    path: 'company-details/:id',
    component: CreateCompanyComponent
  },
  {
    path: 'company-details',
    component: CompanyDetailsComponent
  },
  {
    path: 'company-create/:id',
    component: CreateCompanyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
