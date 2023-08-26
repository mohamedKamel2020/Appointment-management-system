import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from '../_models/appointment';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-update-appointment',
  templateUrl: './update-appointment.component.html',
  styleUrls: ['./update-appointment.component.scss'],
})
export class UpdateAppointmentComponent implements OnInit {
  id: string='';
  oldAppointment: Appointment = {} as Appointment;
  constructor(
    private _AppointmentService: AppointmentService,
    private _Router: Router,
    private _Route: ActivatedRoute,
    private _AlertService:AlertService
  ) {}
  ngOnInit() {
    this.id = this._Route.snapshot.params['pid'];
  }

  updateAppointment() {
    this._AppointmentService
      .updateAppointment(this.id,this.oldAppointment)
      .subscribe({
        next: () => {
          this._AlertService.success('User updated', {
            keepAfterRouteChange: true,
          });
          this._Router.navigateByUrl('/appointments');
        },
        error: (error) => {
          this._AlertService.error(error);
        },
      });
  }
}
