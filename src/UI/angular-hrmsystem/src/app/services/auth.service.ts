import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppService } from '../app.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
  
    public jwtHelper: JwtHelperService,
    
    private appService: AppService
    ) { }

    login(){
      debugger
      
    const empId = "1";
    
    const jwtKey = "my_secret_key"

  // Create a new token with the username in the payload 
  let token = JwtHelperService.arguments.sign({empId}, jwtKey, {
     
  }) 

    return localStorage.setItem('token',token)

}   

  

  public isAuthenticated(): boolean {
    
    let token = localStorage.getItem('token')
    
    // Check whether the token is expired and return
    // true or false
    if (token) {
     
      return true;
    }

    return false;
  }

}

export function tokenGetter() {

  return localStorage.getItem("token")
}

