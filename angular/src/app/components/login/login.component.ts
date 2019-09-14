import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerAuthService } from '../../providers/server-auth.service';
import { Router } from '@angular/router';
import { remote } from 'electron';
import { HttpErrorResponse } from '@angular/common/http';
import { loginUser } from '../../interfaces/interfaces';
require('events').EventEmitter.defaultMaxListeners = 100;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  loginForm: FormGroup;
  loginError = {
    auth: null,
    message: null
  };

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
    this.serverAuth.login(data).subscribe((res) => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['/home']);
    },
    (err:HttpErrorResponse) => {
     this.loginError.message = err.error.message;
     this.loginError.auth = err.error.auth;
    })
    
  }

  loginGoogle(){
    const browserWindow = remote.BrowserWindow;
      let authWindow = new browserWindow({
        width: 384,
        height:619,
        show: true,
        webPreferences: {
          nodeIntegration: true,
          webSecurity: false
        }
      });
      authWindow.setResizable(false);
      authWindow.loadURL('http://localhost:3000/auth/google');
      try {
        
          authWindow.webContents.on('dom-ready', () => {
            if(true){
              authWindow.webContents.executeJavaScript(`require('electron').ipcRenderer.send('sendToken', document.querySelector("pre").innerHTML)`)
             
            }
          })

          const gettingToken = setInterval(() => {
            let url: any = authWindow.webContents.getURL();
              url = url.split('?');
              if(url[0] == 'http://localhost:3000/auth/google/callback'){
                const res = remote.getGlobal('res');
                if(res.auth == false){
                  authWindow.webContents.executeJavaScript(`document.write('Something went wrong, this is a server's problem)`)
                  clearInterval(gettingToken); 
                } else if (res.auth == true) {
                authWindow.hide();
                localStorage.setItem('token', res.token)
                authWindow.destroy();
                this.router.navigate(['/home']);
                clearInterval(gettingToken); 
                }
              }
          },1000);

      }
      catch (e){
        
      }
      authWindow.on('closed', () => {
        authWindow = null;
      })
      
  
  }

}


