import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { loginUser } from './app/login/login.component';
import { registerUser } from './app/register/register.component';

@Injectable({
  providedIn: 'root'
})
export class ServerAuthService {

  constructor(private http: HttpClient) {}

    register(data: registerUser): Observable<any> {
      return this.http.post('http://localhost:3000/registerUser', data);
    }
  
     login(data: loginUser): Observable<any> {
      return this.http.post('http://localhost:3000/loginUser', data);
    }
  
     loginGoogle(): Observable<any> {
      return this.http.get('http://localhost:3000/google');
    }
  
     loginGoogleAuth(): Observable<any> {
      return this.http.get('http://localhost:4200/auth');
    }
  
     loggedIn(){
      return !!localStorage.getItem('token');
    }
  
     findUser(): Observable<any> {
      return this.http.get('http://localhost:3000/findUser')
    }
  
    getToken() {
      return localStorage.getItem('token');
    }

   
}
