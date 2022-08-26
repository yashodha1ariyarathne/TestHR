import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppService } from '../app.service';
import { HttpClientModule } from "@angular/common/http";
import { AuthInterceptorService } from ".././auth-interceptor.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
  
    public jwtHelper: JwtHelperService,
    private appService: AppService,
    public authinterceptorservice:AuthInterceptorService
    ) { }

  

    public isAuthenticated(): boolean {
    
      let token = localStorage.getItem('token');
      
      if (token) {
        
        return true;
      }
  
      return false;
    }

  }


export function tokenGetter() {

  return localStorage.getItem("token")
}

