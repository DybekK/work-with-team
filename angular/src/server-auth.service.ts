import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { loginUser, mongooseUser } from './app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ServerAuthService {

  constructor(private http: HttpClient) {}

    register(data: mongooseUser): Observable<any> {
      return this.http.post('http://localhost:3000/registerUser', data);
    }
  
     login(data: loginUser): Observable<any> {
      return this.http.post('http://localhost:3000/loginUser', data)
      
    }


  
     loginGoogle(): Observable<any> {
      return this.http.get('http://localhost:3000/auth/google/callback');
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
