import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { customer } from '../_models/customerBook';
import { Appointment } from '../_models/appointment';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  allBooks: customer[] = [];
  appointment:Appointment[]=[];
  constructor(private _AppointmentService: AppointmentService) {}
  ngOnInit() {
    this._AppointmentService.getAllBooks().subscribe((books) => {
      this.allBooks = books;
    });
    this._AppointmentService.getAllAppointment().subscribe((appointments) => {
      this.appointment = appointments;
    });
  }
  deleteBook(book:customer):void{
    this.allBooks=this.allBooks.filter(h=>h!==book);
    this._AppointmentService.deleteBook(book.id).subscribe();
  }
}
