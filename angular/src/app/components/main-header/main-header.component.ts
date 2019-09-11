import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { UserDataService } from '../../providers/user-data.service';
import { mongooseUser, postTask } from '../../interfaces/interfaces';
import { CalendarsService } from '../../providers/calendars.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ServerDatabaseService } from '../../providers/server-database.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  providers: [
    CalendarsService,
  ]
})
export class MainHeaderComponent implements OnInit {
  addTaskDataForm: FormGroup;
  postTaskSubmitted: boolean = false;
  constructor(private serverDatabase: ServerDatabaseService, private userData: UserDataService, public calendar: CalendarsService, private fb: FormBuilder) { }
  userInfo: any = {
    firstname: '',
    lastname: ''
  }
  today: number = Date.now();
  ngOnInit() {
    this.addTaskDataForm = this.fb.group({
      taskname: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      priority: [1],
      repetition: [''],
    });

    this.userData.getData$.subscribe((data: mongooseUser) => {
      this.userInfo = data;
    });
    console.log(this.calendar.daysArray)
  }
 
  get postTaskDataControlls() {
    return this.addTaskDataForm.controls;
  }

  onPostTaskSubmit(){
    this.postTaskSubmitted = true;
    if(this.addTaskDataForm.invalid) {
      return;
    }
    this.postTaskSubmitted = false;
    const data: postTask = Object.assign({}, this.calendar.addTaskForm.value, this.addTaskDataForm.value);
    this.serverDatabase.postTask(data).subscribe((res) => {
      this.serverDatabase.getData(data)
    },
    (err) => {
      console.log(err);
    }
    )
    this.addTaskDataForm.reset();
  }
 


}
