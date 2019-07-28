import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ServerAuthService } from '../../server-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private serverAuth: ServerAuthService, private router: Router) { }
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  
  get loginControls() { return this.loginForm.controls }

  onSubmit() {
    this.submitted = true;
    if(this.loginForm.invalid) {
      return;
    }
    const data: loginUser = this.loginForm.value;
    this.loginUser(data);
  }

  loginUser(data: loginUser) {
    this.serverAuth.login(data).subscribe(res => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['/home']);
    },
    err => {
      console.log(err);
    })
    
  }
}

export interface loginUser {
  username: string,
  email: string,
  password: string
}
