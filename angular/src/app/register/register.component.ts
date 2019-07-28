import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServerAuthService } from '../../server-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  submitted: boolean = false;
  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private serverAuth: ServerAuthService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
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
    console.warn(this.registerForm.value);
    const data: registerUser = this.registerForm.value;
    this.registerUser(data);
  }

  registerUser(data: registerUser) {
    this.serverAuth.register(data).subscribe(res => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['/home']);
    },
    err => {
      console.log(err);
    })
    
  }

}

export interface registerUser {
  username: string,
  email: string,
  password: string
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

