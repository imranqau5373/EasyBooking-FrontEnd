import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { FormsModule } from '@angular/forms';
import { CreateUsersComponent } from './pages/create-users/create-users.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';




@NgModule({
  declarations: [ListUsersComponent, CreateUsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule
  ]
})
export class UsersModule { }
