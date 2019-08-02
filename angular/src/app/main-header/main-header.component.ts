import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../user-data.service';
import { mongooseUser } from '../interfaces/interfaces';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  constructor(private userData: UserDataService) { }
  userInfo: any = {
    firstname: '',
    lastname: ''
  }
  today: number = Date.now();
  ngOnInit() {
    this.userData.getData$.subscribe((data: mongooseUser) => {
      this.userInfo = data;
    });
  }

}
