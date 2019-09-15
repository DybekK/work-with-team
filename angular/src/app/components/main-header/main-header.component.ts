import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../providers/user-data.service';
import { mongooseUser, postTask, tag } from '../../interfaces/interfaces';
import { CalendarsService } from '../../providers/calendars.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ServerDatabaseService } from '../../providers/server-database.service';
const moment = require('moment');
import * as Fuse from 'fuse.js';

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
  postTagForm: FormGroup;
  postTaskSubmitted: boolean = false;
  constructor(private serverDatabase: ServerDatabaseService, private userData: UserDataService, public calendar: CalendarsService, private fb: FormBuilder) { }
  userInfo: any = {
    firstname: '',
    lastname: ''
  }

  tagsArray: Array<tag>;
  result: Array<tag>;
  tagsAdded: Array<tag> = [];
  tagname: tag;
  globalSearchValue: string = '';
  today: number = Date.now();
  ngOnInit() {
    this.addTaskDataForm = this.fb.group({
      taskname: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      priority: [1],
      repetition: [''],
      tags: ['']
    });

    this.postTagForm = this.fb.group({
      tagname: ['']
    })
    this.getTags();
    this.userData.getData$.subscribe((data: mongooseUser) => {
      this.userInfo = data;
    });
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
    moment.defaultFormat = 'DD.MM.YYYY';


    const date_to = moment(this.calendar.addTaskForm.value.date_from, moment.defaultFormat).toDate() ;
    const date_from = moment(this.calendar.addTaskForm.value.date_from, moment.defaultFormat).toDate();

    this.calendar.addTaskForm.value.date_from = date_from;
    this.calendar.addTaskForm.value.date_to = date_to;
    const data: postTask = Object.assign({}, this.calendar.addTaskForm.value, this.addTaskDataForm.value);
    this.addTaskDataForm.value.tags = this.tagsArray;
    this.serverDatabase.postTask(data).subscribe((res) => {
      console.log(data);
      this.serverDatabase.getData(res);
    },
    (err) => {
      console.log(err);
    }
    )
    this.addTaskDataForm.reset();
    this.calendar.addTaskForm.reset();
  }

  cancelAdd(){
    this.addTaskDataForm.reset();
    this.calendar.addTaskForm.reset();
    this.tagsAdded.length = 0;
  }


  inputSearchTags(value){
      this.globalSearchValue = value.target.value;
    
    const options: Fuse.FuseOptions<any>  = {
      shouldSort: true,
      threshold: 0,
      location: 0,
      distance: 0,
      keys: [
        "tagname"
      ]
    };
    const fuse = new Fuse(this.tagsArray, options);
    if(this.globalSearchValue.length == 0){
      this.result = this.tagsArray;
    } else {
      this.result = fuse.search(value.target.value);
    }
  
    console.log(this.result);
  }


  searchTags(){
    const options: Fuse.FuseOptions<any>  = {
      shouldSort: true,
      threshold: 0,
      location: 0,
      distance: 0,
      keys: [
        "tagname"
      ]
    };
    const fuse = new Fuse(this.tagsArray, options);
    if(this.globalSearchValue.length == 0){
      this.result = this.tagsArray;
    } else {
      this.result = fuse.search(this.globalSearchValue);
    }
  
  }


  addTag(tag, id){
    this.tagsAdded.push(tag);
    if(this.globalSearchValue.length == 0) {
      console.log(this.tagsArray);
      this.tagsArray.splice(id, 1)
    } else {
      let arr = this.tagsAdded.concat(this.tagsArray);
      arr.sort((a, b) => (a.tagname > b.tagname) ? 1 : -1) 
  
      
       
      for (var i = 0; i < arr.length - 1; i++) {
          if (arr[i] == arr[i+1]) {
              this.tagsArray.splice(i,1);
          }
      }
      console.log(this.tagsArray)


      this.result.splice(id, 1);
    }
   
  }

  removeTag(id){
  
      let tag: Array<tag> = this.tagsAdded.slice(id)
      this.tagsAdded.splice(id, 1);
      this.tagsArray = this.tagsArray.concat(tag);
      this.tagsArray.sort((a, b) => (a.tagname > b.tagname) ? 1 : -1)
    

    if(this.globalSearchValue === undefined || this.globalSearchValue.length == 0) {
      console.warn(this.tagsArray);
      this.result = this.tagsArray;
 
    } else {
      
      this.searchTags();
    }

  }

  getTags(){
    this.serverDatabase.getTags().subscribe((res) => {
      console.log(res)
      this.tagsArray = res.sort((a, b) => (a.tagname > b.tagname) ? 1 : -1)
      this.result = this.tagsArray;
    },
    (err) => {
      console.log(err);
    })
  }

inputChangeDate(){
moment.defaultFormat = 'DD.MM.YYYY';
this.calendar.dateFrom = moment(this.calendar.addTaskForm.value.date_from, moment.defaultFormat).toDate();

this.calendar.dateTo = moment(this.calendar.addTaskForm.value.date_to, moment.defaultFormat).toDate();
console.log(this.calendar.dateFrom)
}

postTag(){
  let tag = this.postTagForm.value;
  this.serverDatabase.addTag(tag).subscribe((res) => {
    this.tagsArray.push(res);
    this.result = this.tagsArray;
    // MUSZE POZNIEJ NAPRAWIC W SERWERZE
  })
}

}
