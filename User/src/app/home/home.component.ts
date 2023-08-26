import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Appointment } from '../_models/appointment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  Events: any[] = [];
  appointment:Appointment[]=[];
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    dateClick:function(appointment){

      return alert('Clicked on:' + appointment.dateStr);
    },
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true
  };

  constructor(private _HttpClient: HttpClient) {}
  // onDateClick(appointment:Appointment) {
  //   alert('Clicked on date : ' + appointment.name);
  // }
  ngOnInit(){
    setTimeout(() => {
      return this._HttpClient
        .get('http://localhost:3000/appointments')
        .subscribe((res) => {
          this.Events.push(res);
          console.log(this.Events);
        });
    }, 2200);
    setTimeout(() => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        events: this.Events,
        // dateClick:this.onDateClick.bind(this),
      };
    }, 2500);
  }
  }
