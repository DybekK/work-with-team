import { Component, OnInit } from '@angular/core';
import { ServerDatabaseService } from '../../providers/server-database.service';
import { postTask } from '../../interfaces/interfaces';
import { CalendarsService } from '../../providers/calendars.service';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers: [CalendarsService]
})
export class TasksComponent implements OnInit {

  constructor(public serverDatabase: ServerDatabaseService, public calendar: CalendarsService ) { 
  }
  tasksData: Array<postTask>;
  moreInfoTaskData: postTask;
  ngOnInit() {
    this.getTasks();
  }

  getTasks(){
    this.serverDatabase.getTasks().subscribe((res) => {
      this.tasksData = res;
      this.serverDatabase.getData$.subscribe((data) => {
        console.log(data)
        if(data){
          this.tasksData.push(data) 
        }
      })
    }, (err) => {
      console.log(err);
    })
  }

  moreInfoTask(task: postTask){
    this.moreInfoTaskData = task;
  }
}
