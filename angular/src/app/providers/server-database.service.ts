import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { postTask } from '../interfaces/interfaces';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServerDatabaseService {

  getData$: Observable<any>;
  private getDataSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { 
    this.getData$ = this.getDataSubject.asObservable();
  }

  getData(data: any){
    this.getDataSubject.next(data);
  }

  postTask(data: postTask): Observable<any>{
    return this.http.post('http://localhost:3000/postTask', data);
  }

  getTasks(): Observable<any>{
    return this.http.get('http://localhost:3000/getTasks');
  }

}
