import { Component, OnInit, Input } from '@angular/core';
import { ServerAuthService } from '../../providers/server-auth.service';
import { Router, ActivatedRoute} from '@angular/router';
import { mongooseUser }from '../../interfaces/interfaces'
import { ServerDatabaseService } from '../../providers/server-database.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private serverAuth: ServerAuthService, private router: Router, private userData: ServerDatabaseService, private route: ActivatedRoute) {
    this.router.navigate([{ outlets: { leftbar: ['leftbar'] } }], {relativeTo: this.route});
   }

  ngOnInit() {
    this.serverAuth.findUser().subscribe(res => {
      if(res.auth == true){
        const userInfo: mongooseUser = {
          username: res.username,
          firstname: res.firstname,
          lastname: res.lastname,
          password: res.password,
          tags: res.tags,
          email: res.email,
          img: res.img
        }
        this.userData.getUserData(userInfo);
      } else {
        this.router.navigate(['/']);
      }
    })
  }

}
