import { Component, OnInit } from '@angular/core';
import { mongooseUser } from '../../interfaces/interfaces';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerDatabaseService } from '../../providers/server-database.service';

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
  constructor(private userData: ServerDatabaseService, private router: Router, private route: ActivatedRoute) {
    
    this.router.navigate([{ outlets: { leftbarOptions: ['all'] } }], {relativeTo: this.route});
   }

  ngOnInit() {
    this.userData.getDataUser$.subscribe((data: mongooseUser) => {
      this.userInfo = data;
    });
  
   
  }

  showAll(){
    this.router.navigate([{ outlets: { leftbarOptions: ['all'] } }], {relativeTo: this.route});
  }
  showTasks(){
    this.router.navigate([{ outlets: { leftbarOptions: ['tasks'] } }], {relativeTo: this.route});
  }

}
