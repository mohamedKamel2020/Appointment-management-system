import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { CreateAppoinmentComponent } from './create-appoinment/create-appoinment.component';

import { CustomerAppointmentComponent } from './customer-appointment/customer-appointment.component';
import { BooksComponent } from './books/books.component';
import { UpdateAppointmentComponent } from './update-appointment/update-appointment.component';
import { AuthGuard } from './_helpers/auth.guard';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path:'',component:MainLayoutComponent,children:[
    {path:'',redirectTo:'/home',pathMatch:'full'},
    {path:'home',component:HomeComponent,canActivate: [AuthGuard]},
    {path:'appointments',component:AppointmentComponent,canActivate: [AuthGuard]},
    {path:'appointments/add',component:CreateAppoinmentComponent,canActivate: [AuthGuard]},
    {path:'appointment/:pid',component:UpdateAppointmentComponent,canActivate: [AuthGuard]},
    {path:'addBook',component:CustomerAppointmentComponent,canActivate: [AuthGuard]},
    {path:'user',component:UsersComponent,canActivate: [AuthGuard]},
    {path:'books',component:BooksComponent,canActivate: [AuthGuard]},
    {path:'users',component:UsersComponent,canActivate:[AuthGuard]}
  ]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
