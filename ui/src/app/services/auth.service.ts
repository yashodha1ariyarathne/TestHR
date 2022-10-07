import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppService } from '../app.service';
import { HttpClientModule } from "@angular/common/http";

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
    // this.appService.isValied = true;
    console.log(tokenInfo)
  } 

  public isAuthenticated(): boolean {
    
     // Check whether the token is expired and return
    let token = localStorage.getItem('token')as any;
   
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



export function tokenGetter() {
  
  return localStorage.getItem("token")
}


