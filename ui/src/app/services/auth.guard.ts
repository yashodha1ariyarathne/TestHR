import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';
import { tokenGetter } from './../app.module';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
    
  ){}

  // isvalied = this.authService.isAuthenticated();

  canActivate(): boolean {
  debugger
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    
    else{
      
      return true;
    }
    
  }


}
