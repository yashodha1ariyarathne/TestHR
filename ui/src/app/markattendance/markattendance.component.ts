import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppService } from '../app.service';


import { Router } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-markattendance',
  templateUrl: './markattendance.component.html',
  styleUrls: ['./markattendance.component.css']
})
export class MarkattendanceComponent {

  empid: string = '';
  status: string = '';
  comment:  string = '';

  constructor(
    private http:HttpClient,
    private appService: AppService
  ) { }

  mark(){
    debugger
    const url=this.appService.url;

    this.http.post(

      url+'/markAddendance/attendance', 

      JSON.stringify({status:this.status,comment:this.comment}), 

      { "responseType": 'text'})
      
      .subscribe(response => {
        localStorage.getItem('token');
      })
  }
}
