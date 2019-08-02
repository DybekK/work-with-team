import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../user-data.service';
import { mongooseUser } from '../interfaces/interfaces';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.scss']
})
export class LeftbarComponent implements OnInit {
  userInfo: any = {
    img: '',
    username: ''
  }
  activatedRoute = this.route
  constructor(private userData: UserDataService, private router: Router, private route: ActivatedRoute) {
    
    this.router.navigate([{ outlets: { leftbarOptions: ['all'] } }], {relativeTo: this.route});
   }

  ngOnInit() {
    this.userData.getData$.subscribe((data: mongooseUser) => {
      this.userInfo = data;
    });
   // this.router.navigate([{ outlets: { leftbarOptions: ['everything'] } }], {relativeTo: this.route})
   
  }

  showAll(){
    this.router.navigate([{ outlets: { leftbarOptions: ['all'] } }], {relativeTo: this.route});
  }
  showTasks(){
    this.router.navigate([{ outlets: { leftbarOptions: ['tasks'] } }], {relativeTo: this.route});
  }

  showGroups(){}

}
