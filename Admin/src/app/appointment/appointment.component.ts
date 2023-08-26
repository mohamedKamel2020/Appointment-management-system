import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Appointment } from '../_models/appointment';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit {
  //id:number=0;
  allAppointments: Appointment[] = [];
  constructor(
    private _AppointmentService: AppointmentService,
    private _Route:ActivatedRoute
  ) {}
  ngOnInit() {
    this._AppointmentService.getAllAppointment().subscribe((appointments) => {
      this.allAppointments = appointments;
    });
    //this.id = this._Route.snapshot.params['pid'];
  }
  deleteAppointment(appoinment:Appointment):void{
    this.allAppointments=this.allAppointments.filter(h=>h!==appoinment);
    this._AppointmentService.deleteAppointment(appoinment.id).subscribe();
  }
}
