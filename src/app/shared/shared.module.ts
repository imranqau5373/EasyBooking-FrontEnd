import { NgModule, ComponentRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlMessageComponent } from './user_control/components/control-message/control-message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DefaultDateFormatPipe } from './pipes/date-format.pipe';

@NgModule({
  declarations: [ControlMessageComponent,DefaultDateFormatPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ControlMessageComponent,
    DefaultDateFormatPipe
    
  ],
  entryComponents: [],
  
})
export class SharedModule { }
