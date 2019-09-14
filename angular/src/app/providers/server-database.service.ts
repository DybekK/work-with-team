import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { postTask, mongooseUser } from '../interfaces/interfaces';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServerDatabaseService {

  getData$: Observable<any>;
  getDataUser$: Observable<any>;
  private getDataUserSubject = new Subject<any>();
  private getDataSubject = new Subject<any>();

  constructor(private http: HttpClient) { 
    this.getData$ = this.getDataSubject.asObservable();
    this.getDataUser$ = this.getDataUserSubject.asObservable();
  }

  getData(data: postTask){
    this.getDataSubject.next(data);
  }

  getUserData(data: mongooseUser){
    this.getDataUserSubject.next(data);
  }

  postTask(data: postTask): Observable<any>{
    return this.http.post('http://localhost:3000/postTask', data);
  }

  getTasks(): Observable<any>{
    return this.http.get('http://localhost:3000/getTasks');
  }

  getTags(): Observable<any>{
    return this.http.get('http://localhost:3000/getTags');
  }

  addTag(data): Observable<any>{
    return this.http.post('http://localhost:3000/addTag', data);
  }

}
