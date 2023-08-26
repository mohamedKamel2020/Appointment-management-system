// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup,ValidatorFn,Validators } from '@angular/forms';
// import { AuthService } from '../auth.service';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.scss']
// })
// export class RegisterComponent implements OnInit{
//   constructor(private _HttpClient:HttpClient
//     ,private _AuthService:AuthService,
//     private _Router:Router) {

//   }
//   registerForm:FormGroup=new FormGroup({
//     'first_name':new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
//     'last_name':new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
//     'age':new FormControl(null,[Validators.required,Validators.min(16),Validators.max(60)]),
//     'email':new FormControl(null,[Validators.required,Validators.email]),
//     'password':new FormControl(null,[Validators.required])
//   })

//   ngOnInit(): void {
//   }
//   getFormData(formData:any)
//   {
//     if(formData.valid==true){
//         this._AuthService.signUp(formData.value).subscribe(data=>{
//             this._Router.navigate(['/signIn'])
//             // console.log(data);
//       });
//       // console.log(formData.value)
//     }
//   }
//   // hasDuplicateValue(email:FormControl):ValidatorFn
//   // {
//   //   if(this.registerForm.controls()){
//   //   return this._HttpClient.get('').subscribe()
//   // }
// }

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { AlertService } from '../alert.service';
import { User } from '../_models/user';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  err: string | undefined;
  user:User={} as User;

  constructor(
    private _FormBuilder: FormBuilder,
    private _Route: ActivatedRoute,
    private _Router: Router,
    private _AuthService: AuthService,
    private _AlertService: AlertService
  ) {}

  ngOnInit() {
    this.form = this._FormBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
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
    this.user=<User> this.form.value;
    this._AuthService
      .register(this.user)
      .pipe(first())
      .subscribe({
        next: () => {
          this._AlertService.success('Registration successful', {
            keepAfterRouteChange: true,
          });

          this._Router.navigate(['../login'], { relativeTo: this._Route });
        },
        error: (error) => {
          this._AlertService.error(error);
          this.loading = false;
          this.err = 'mail is already registered';
        },
      });
  }
}
