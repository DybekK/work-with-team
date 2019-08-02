import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-google',
  templateUrl: './auth-google.component.html',
  styleUrls: ['./auth-google.component.scss']
})
export class AuthGoogleComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }
  id: string;
  ngOnInit() {
    // this.id = this.activatedRoute.snapshot.queryParamMap.get('jwt');
    // this.getToken();
  }

  // getToken() {
  //   localStorage.setItem('token', this.id);
  //   this.router.navigate(['/home']);
  // }

}
