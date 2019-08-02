import { Injectable } from '@angular/core';
import { mongooseUser } from './app/interfaces/interfaces';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  // {
  //   username: res.username,
  //   firstname: res.firstname,
  //   lastname: res.lastname,
  //   password: res.password,
  //   email: res.email,
  //   img: res.img
  // }

  getData$: Observable<any>;
  private getDataSubject = new Subject<any>();

  constructor() { 
    this.getData$ = this.getDataSubject.asObservable();
  }

  getData(data: mongooseUser){
    this.getDataSubject.next(data);
  }
}
