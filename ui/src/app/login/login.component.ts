import { HttpClient, HttpErrorResponse, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { lastValueFrom, Observable, throwError } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';
// import { body } from 'express-validator';

import { AppService } from '../app.service';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  username: string = '';
  password: string = '';
  public error: any; 
  

  constructor(
    private http:HttpClient,
    private appService: AppService,
    
  ) { }
 
  async login(){
    debugger

    const url=this.appService.url;
        
    try {

      let loginResult = await lastValueFrom(this.http.post(

          url+'/login/login', 

          JSON.stringify({username:this.username, password:this.password}), 

        { "responseType": 'text'}))

      if(loginResult){
        localStorage.setItem("token",loginResult);
        // console.log(loginResult)
      }
    
    } 

    catch (error) {
      var err:any = error;
      // console.log(err.error)
      window.alert(err.error);  

    }
    
    
  }


      



    }







  

 

