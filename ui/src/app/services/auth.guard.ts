import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';



import { AuthService, tokenGetter } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
    
  ){}

  // isvalied = this.authService.isAuthenticated();

  canActivate(): boolean {
  
    if (!this.authService.isAuthenticated()) {
      
      this.router.navigate(['login']);
      return false;
    }
    else{
      
      return true;
    }
    
  }


}
