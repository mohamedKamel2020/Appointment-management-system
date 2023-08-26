import { Component, OnInit } from '@angular/core';
import { Appointment } from '../_models/appointment';
import { AppointmentService } from '../appointment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-appoinment',
  templateUrl: './create-appoinment.component.html',
  styleUrls: ['./create-appoinment.component.scss'],
})
export class CreateAppoinmentComponent implements OnInit {
  newAppointment: Appointment = {} as Appointment;
  constructor(
    private _AppointmentService: AppointmentService,
    private _Router: Router
  ) {}
  ngOnInit() {}
  addAppointment(){
    const observer = {
      next: (appoinment: Appointment) => {
        alert('Appointment added Successfully');
        this._Router.navigateByUrl('/appointments');
      },
      error: (err: Error) => {
        alert(err.message);
      },
    };
    this._AppointmentService.addNewAppointment(this.newAppointment).subscribe(observer);
  }
}
