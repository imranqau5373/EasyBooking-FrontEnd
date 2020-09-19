import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DaytimeBaseComponent } from './component/daytime-base/daytime-base.component';
import { CreateDaytimeComponent } from './pages/create-daytime/create-daytime.component';
import { ListDaytimeComponent } from './pages/list-daytime/list-daytime.component';

export const routes: Routes = [

{
  path: '',
  component : DaytimeBaseComponent,
  children: [
  {
    path: '',
    redirectTo: 'daytime-list',
    pathMatch: 'full'
  },
  {
    path: 'daytime-list',
    component: ListDaytimeComponent
  },
  {
    path: 'daytime-create',
    component: CreateDaytimeComponent
  },
  {
    path: 'daytime-update/:id',
    component: CreateDaytimeComponent
  },
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DayTimeRoutingModule { }
