import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ServerAuthService } from '../providers/server-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private serverAuth: ServerAuthService, private router: Router){}
  canActivate(): boolean{
    if(this.serverAuth.loggedIn()){
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
