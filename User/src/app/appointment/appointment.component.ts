import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { Router } from '@angular/router';
import { Appointment } from '../_models/appointment';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit {
  allAppointments: Appointment[] = [];
  constructor(
    private _AppointmentService: AppointmentService,
    private _Router: Router
  ) {}
  ngOnInit() {
    this._AppointmentService.getAllAppointment().subscribe((appointments) => {
      this.allAppointments = appointments;
    });
  }
}
