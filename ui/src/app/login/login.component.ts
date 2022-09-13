import { HttpClient, HttpErrorResponse, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { lastValueFrom, Observable, throwError } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';
// import { body } from 'express-validator';

import { AppService } from '../app.service';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../exapi.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  username: string = '';
  password: string = '';
  public error: any; 
  result: string='';
   

  constructor(
    private http:HttpClient,
    private appService: AppService,
    private  apiService:  ApiService
    
  ) { }
 
  async login() {

    try {

    let loginResult = await this.apiService.userLogin(this.username,this.password);
    let Result=JSON.stringify(loginResult);

    if(Result.length > 1)
      localStorage.setItem("token",Result);
    
    } 
    
    catch (error) {
      var err:any = error;
      window.alert(err.error);
    
    } 


  }
    
        
}


      



    







  

 

