import {  NgModule } from '@angular/core';
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
  fakeBackendProvider,
} from './_helpers';
import { AlertComponent } from './_components';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarModule,MOMENT } from 'angular-calendar';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { CustomerAppointmentComponent } from './customer-appointment/customer-appointment.component';
import { BooksComponent } from './books/books.component';
import { AppointmentByIdPipePipe } from './appointment-by-id-pipe.pipe';
import { FooterComponent } from './footer/footer.component';
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
    CustomerAppointmentComponent,
    BooksComponent,
    AppointmentByIdPipePipe,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FullCalendarModule,
    CalendarModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    //fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
