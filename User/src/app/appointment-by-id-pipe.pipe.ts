import { Pipe, PipeTransform } from '@angular/core';
import { Appointment } from './_models/appointment';

@Pipe({
  name: 'appointmentByIdPipe'
})
export class AppointmentByIdPipePipe implements PipeTransform {

  transform( appoinmentId: number,appointments:Appointment[]):Promise<string>
  {
    const appoinment:any= appointments.find(appointment=>appoinment.id===appoinmentId);
    return appoinment ? appoinment.name:"";
  }

}
