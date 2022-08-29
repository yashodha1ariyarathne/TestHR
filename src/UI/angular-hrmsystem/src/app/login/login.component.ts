import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from "@angular/router";


import { JwtHelperService } from '@auth0/angular-jwt';
import { body } from 'express-validator';

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

  constructor(
    private http:HttpClient,
    private appService: AppService
  ) { }
 
  login(){
    debugger
    const url=this.appService.url;
    this.http.post<any>(url+'/login/login',JSON.stringify({username:this.username,password:this.password}), { headers: new HttpHeaders( {'Content-Type': 'application/json' })
    }).subscribe(response => {
      localStorage.setItem("token",'Bearer '+ response);
   })
  }

  
  }



