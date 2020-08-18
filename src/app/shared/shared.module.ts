import { NgModule, ComponentRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlMessageComponent } from './user_control/components/control-message/control-message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DefaultDateFormatPipe, DefaultDateTimeFormatPipe } from './pipes/date-format.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterBadgeComponent } from './filters/filter-badge.component';
import { TimeColumnFilterComponent } from './filters/time-column-filter.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { OptionsColumnFilterComponent } from './filters/options-column-filter.component';
import { TextColumnFilterComponent } from './filters/text-column-filter.component';
import { DateColumnFilterComponent } from './filters/date-column-filter.component';
import { HasPermissionDirective } from './directives/has-permission.directive';
@NgModule({
  declarations: [ControlMessageComponent,DefaultDateFormatPipe,DefaultDateTimeFormatPipe,FilterBadgeComponent,
    DateColumnFilterComponent,
    OptionsColumnFilterComponent,
    TextColumnFilterComponent,
    HasPermissionDirective,
    TimeColumnFilterComponent,],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPaginationModule,

    NgMultiSelectDropDownModule
    
  ],
  exports: [
    CommonModule,
    HasPermissionDirective,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ControlMessageComponent,
    DefaultDateFormatPipe,
    DefaultDateTimeFormatPipe,
    FilterBadgeComponent,
    DateColumnFilterComponent,
    OptionsColumnFilterComponent,
    TextColumnFilterComponent,
    TimeColumnFilterComponent,
    NgMultiSelectDropDownModule
  ],
  entryComponents: [],
  
})
export class SharedModule { }
