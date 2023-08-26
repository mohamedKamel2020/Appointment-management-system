import { Component, OnInit } from '@angular/core';
import { Appointment } from '../_models/appointment';
import { customer } from '../_models/customerBook';
import { AppointmentService } from '../appointment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-appointment',
  templateUrl: './customer-appointment.component.html',
  styleUrls: ['./customer-appointment.component.scss']
})
export class CustomerAppointmentComponent implements OnInit{
  appointmentList:Appointment[] | undefined;
  newBook:customer={} as customer;
  constructor(private _AppointmentService:AppointmentService,private _Router:Router){
    this._AppointmentService.getAllAppointment().subscribe((appointments) => {
      this.appointmentList = appointments;
    });
  }
  ngOnInit(){}
  addBook(){
    const observer = {
      next: (book: customer) => {
        alert('your book added Successfully');
        this._Router.navigateByUrl('/appointments');
      },
      error: (err: Error) => {
        alert(err.message);
      },
    };
    this._AppointmentService.addbook(this.newBook).subscribe(observer);
  }
}
