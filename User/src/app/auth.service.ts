import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from './_models/user';
import { Router } from '@angular/router';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
 // httpOption;
  private userSubject?: BehaviorSubject<User | null>;
  public user: Observable<User | null> | undefined;
  constructor(private _Router: Router, private _HttpClient: HttpClient) {
    // this.httpOption = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    // };
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject?.value;
  }

  login(username: string, password: string) {
    return this._HttpClient
      .post<User>(`http://localhost:4000/users/authenticate`, { username, password })
      .pipe(
        map((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject?.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject?.next(null);
    this._Router.navigate(['/login']);
  }

  register(user: User):Observable<User>
  {
    return this._HttpClient.post<User>('http://localhost:4000/users/register', user);
  }
}
