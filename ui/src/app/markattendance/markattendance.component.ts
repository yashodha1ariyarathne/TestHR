import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppService } from '../app.service';


import { Router } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-markattendance',
  templateUrl: './markattendance.component.html',
  styleUrls: ['./markattendance.component.css']
})
export class MarkattendanceComponent {
  constructor(
    private fb:FormBuilder,
    private http:HttpClient,
    private appService: AppService
   
  ) { }
  form = new FormGroup({
    status: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required)    
  });

  get f(){
    return this.form.controls;
  }

  mark(){
    debugger
    const url=this.appService.url;

    this.http.post(

      url+'/markAddendance/attendance', 

      JSON.stringify({status:this.form.value.status,comment:this.form.value.comment}), 

      { "responseType": 'text'})
      
      .subscribe(response => {
        localStorage.getItem('token');
        window.alert(response);
      })

      this.form.reset();
      
  }
}
