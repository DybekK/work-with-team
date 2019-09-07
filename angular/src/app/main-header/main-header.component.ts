import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../user-data.service';
import { mongooseUser } from '../interfaces/interfaces';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  constructor(private userData: UserDataService, private fb: FormBuilder) { 
    
  }
  userInfo: any = {
    firstname: '',
    lastname: ''
  }

  today: number = Date.now();
  date = moment();
  daysArray;
  addTaskForm: FormGroup;

  ngOnInit() {
    this.userData.getData$.subscribe((data: mongooseUser) => {
      this.userInfo = data;
    });
    this.daysArray = this.createCalendar(this.date);

    this.addTaskForm = this.fb.group({
      dateFrom: [null, Validators.required],
      dateTo: [null, Validators.required]
    })
  }

  setToday(day){
    if (!day) {
      return false;
    }
    return moment().format('L') === day.format('L')
  }

  createCalendar(month){
    let firstDay = moment(month).startOf('M');
    let days = Array.apply(null, {length: month.daysInMonth()})
    .map(Number.call, Number)
    .map(n => {
      return moment(firstDay).add(n, 'd');
    })
    for(let i = 0; i < firstDay.weekday(); i++){
      days.unshift(null);
    }
    return days;
  }

  nextMonth(){
    this.date.add(1, 'M');
    this.daysArray = this.createCalendar(this.date);
  }

  previousMonth(){
    this.date.subtract(1, 'M');
    this.daysArray = this.createCalendar(this.date);
  }

  selectDate(day){
    let dayFormatted = day.format('DD/MM/YYYY');
    if(this.addTaskForm.valid) {
      this.addTaskForm.setValue({dateFrom: null, dateTo: null})
      return;
    }
    if(!this.addTaskForm.get('dateFrom').value){
      this.addTaskForm.get('dateFrom').patchValue(dayFormatted);
    } else {
      this.addTaskForm.get('dateTo').patchValue(dayFormatted);
    }
  }

  isSelected(day){
    if(!day){
      return false;
    }
    let dateFrom = moment(this.addTaskForm.value.dateFrom, 'DD/MM/YYYY');
    let dateTo = moment(this.addTaskForm.value.dateTo, 'DD/MM/YYYY');
    if(this.addTaskForm.valid){
      return dateFrom.isSameOrBefore(day) && dateTo.isSameOrAfter(day);
    }
    if(this.addTaskForm.get('dateFrom').valid){
      return dateFrom.isSame(day);
    }
  }
}
