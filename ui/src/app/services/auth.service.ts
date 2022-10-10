import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppService } from '../app.service';
import { HttpClientModule } from "@angular/common/http";

import { tokenGetter } from './../app.module';

import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(
    public jwtHelper: JwtHelperService,
    public appService: AppService,
   
    ) { }
  
  
  private getDecodedToken(token: any){
      try {
        return jwt_decode(token);
      } 
      catch(Error) {
        return null;
      }
    }
    
    
  private setUser(token: any) {

    let tokenInfo= this.getDecodedToken(token) as any;
    this.appService.empId = tokenInfo.payload.empId;
    this.appService.empTypeId = tokenInfo.payload.empTypeId;
  } 

  public isAuthenticated(): boolean {
    
     // Check whether the token is expired and return
    // let token = localStorage.getItem('token')as any;
    let token = tokenGetter();
   
    if (!this.jwtHelper.isTokenExpired(token)) {
      this.setUser(token);
      return true;
    }
    else{
      localStorage.removeItem("token")
      return false;
    }
    
  }

}



