import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ErrorInterceptor,
  JwtInterceptor,
} from './_helpers';
import { AlertComponent } from './_components';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarModule} from 'angular-calendar';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { CreateAppoinmentComponent } from './create-appoinment/create-appoinment.component';
import { CustomerAppointmentComponent } from './customer-appointment/customer-appointment.component';
import { BooksComponent } from './books/books.component';
import { UpdateAppointmentComponent } from './update-appointment/update-appointment.component';
import { FooterComponent } from './footer/footer.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    AlertComponent,
    SidebarComponent,
    MainLayoutComponent,
    NavbarComponent,
    AppointmentComponent,
    CreateAppoinmentComponent,
    CustomerAppointmentComponent,
    UpdateAppointmentComponent,
    BooksComponent,
    FooterComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FullCalendarModule,
    CalendarModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    // fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
