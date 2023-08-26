import { Injectable } from '@angular/core';
import { Appointment } from './_models/appointment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { customer } from './_models/customerBook';
const baseUrl=`${environment.apiUrl}/appointments`;
@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  appointments: Appointment[];
  customers: customer[] | undefined;
  httpOption;
  constructor(private _HttpClient: HttpClient) {
    this.httpOption = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    this.appointments = [];
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An Error occurred', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status},body was:`,
        error.error
      );
    }
    return throwError(() => new Error('Error occured, Please try again'));
  }
  getAllAppointment(): Observable<Appointment[]> {
    return this._HttpClient.get<Appointment[]>(
      `${environment.apiUrl}/appointments`
    );
    }
  addNewAppointment(newAppointment: Appointment): Observable<Appointment> {
    return this._HttpClient.post<Appointment>(
      `${environment.apiUrl}/appointments`,
      JSON.stringify(newAppointment),
      this.httpOption
    );
  }
  getAppointmentById(Id:string):Observable<Appointment>{
    return this._HttpClient.get<Appointment>(`${baseUrl}/${Id}`)
    .pipe(retry(2), catchError(this.handleError))

  }
  deleteAppointment(id:number):Observable<Appointment>{
    return this._HttpClient.delete<Appointment>(`${baseUrl}/${id}/`,this.httpOption)
  }
  updateAppointment(Id:string,appointment:Appointment):Observable<Appointment>{
    return this._HttpClient.put<Appointment>(`${baseUrl}/${Id}`,appointment)
  }
  addbook(newbook: customer): Observable<customer> {
    return this._HttpClient
      .post<customer>(
        `${environment.apiUrl}/books`,
        JSON.stringify(newbook),
        this.httpOption
      )
      .pipe(retry(2), catchError(this.handleError));
  }
  getAllBooks():Observable<customer[]>
  {
    return this._HttpClient.get<customer[]>(
      `${environment.apiUrl}/books`
    ).pipe(retry(2), catchError(this.handleError));
  }
  getBooksByAppointment(appointmentID:number):Observable<customer[]>{
    return this._HttpClient.get<customer[]>(`${environment.apiUrl}/books?appointmentID=${appointmentID}`)
    .pipe(retry(2), catchError(this.handleError));
  }
  deleteBook(id:number):Observable<customer>{
    return this._HttpClient.delete<customer>(`${environment.apiUrl}/books/${id}`,this.httpOption)
  }

}
