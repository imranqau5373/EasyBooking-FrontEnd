import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DayTimeRoutingModule } from './day-time-routing.module';
import { SharedModule } from '@shared/shared.module';
import { DaytimeBaseComponent } from './component/daytime-base/daytime-base.component';
import { ListDaytimeComponent } from './pages/list-daytime/list-daytime.component';
import { CreateDaytimeComponent } from './pages/create-daytime/create-daytime.component';
import { DaytimeCalanderComponent } from './component/daytime-calander/daytime-calander.component';
import { WeekdayDialogComponent } from './component/weekday-dialog/weekday-dialog.component';




@NgModule({
  declarations: [DaytimeBaseComponent,ListDaytimeComponent,CreateDaytimeComponent, DaytimeCalanderComponent, WeekdayDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    DayTimeRoutingModule,
    FormsModule
  ],entryComponents : [WeekdayDialogComponent]
})
export class DayTimeModule { }