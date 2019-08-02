import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServerAuthService } from '../../server-auth.service';
import { Router } from '@angular/router';
import { mongooseUser } from '../interfaces/interfaces';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  submitted: boolean = false;
  registerForm: FormGroup;
  registerError = {
    auth: null,
    message: null
  };
  constructor(private fb: FormBuilder, private serverAuth: ServerAuthService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      firstname: [''],
      lastname: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required]
    },{
      validator: CheckPasswords('password', 'repeatPassword')
    })
  }

  get registerControls () { return this.registerForm.controls }

  onSubmit() {
    this.submitted = true;
    if(this.registerForm.invalid){
      return;
    }
    const data: mongooseUser = this.registerForm.value;
    this.registerUser(data);
  }

  registerUser(data: mongooseUser) {
    this.serverAuth.register(data).subscribe((res) => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['/home']);
    },
    (err: HttpErrorResponse) => {
     this.registerError.message = err.error.message;
     this.registerError.auth = err.error.auth;
    })
    
  }

}

export function CheckPasswords(controlName: string, matchingName: string){
return (formGroup: FormGroup) => {
  const control = formGroup.controls[controlName];
  const matching = formGroup.controls[matchingName];

  if(control.value !== matching.value) {
    matching.setErrors({mustMatch: true})
  } else {
    matching.setErrors(null);
  }
}
}

