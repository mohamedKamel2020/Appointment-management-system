import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { AlertService } from '../alert.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  err: string | undefined;

  constructor(
    private _FormBuilder: FormBuilder,
    private _Route: ActivatedRoute,
    private _Router: Router,
    private _AuthService: AuthService,
    private _AlertService: AlertService
  ) {}

  ngOnInit() {
    this.form = this._FormBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this._AlertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this._AuthService
      .login(this.f['username'].value, this.f['password'].value)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = this._Route.snapshot.queryParams['returnUrl'] || '/';
          this._Router.navigateByUrl(returnUrl);
          // this._Router.navigate(['/home']);

        },
        error: (error) => {
          this._AlertService.error(error);
          this.loading = false;
          this.err = 'Username or password is incorrect';
        },
      });
  }
}
