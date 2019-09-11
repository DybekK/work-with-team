import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import * as moment from 'moment';
import { postTask } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CalendarsService {

  date = moment();
  daysArray;
  addTaskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.daysArray = this.createCalendar(this.date);

    this.addTaskForm = this.fb.group({
      date_from: [null, Validators.required],
      date_to: [null, Validators.required]
    })
   }

   get postTaskControlls() {
    return this.addTaskForm.controls;
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
    console.log(this.addTaskForm.controls.date_to.valid)
    if(this.addTaskForm.valid) {
      this.addTaskForm.setValue({date_from: null, date_to: null})
      return;
    }
    if(!this.addTaskForm.get('date_from').value){
      this.addTaskForm.get('date_from').patchValue(dayFormatted);
    } else {
      this.addTaskForm.get('date_to').patchValue(dayFormatted);
    }
  }

  isSelected(day){
    if(!day){
      return false;
    }
    let date_from = moment(this.addTaskForm.value.date_from, 'DD/MM/YYYY');
    let date_to = moment(this.addTaskForm.value.date_to, 'DD/MM/YYYY');
    if(this.addTaskForm.valid){
      return date_from.isSameOrBefore(day) && date_to.isSameOrAfter(day);
    }
    if(this.addTaskForm.get('date_from').valid){
      return date_from.isSame(day);
    }
  }
}
