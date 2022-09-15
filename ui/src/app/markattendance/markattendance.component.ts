import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppService } from '../app.service';


import { Router } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { ApiService } from '../exapi.service';

@Component({
  selector: 'app-markattendance',
  templateUrl: './markattendance.component.html',
  styleUrls: ['./markattendance.component.css']
})
export class MarkattendanceComponent {

  status: string = '';
  comment: string = '';

  constructor(
    private fb:FormBuilder,
    private http:HttpClient,
    private appService: AppService,
    private  apiService:  ApiService
   
  ) { }
  form = new FormGroup({
    status: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required)    
  });

  get f(){
    return this.form.controls;
  }

  async mark() {

    try {
    let status=JSON.parse(JSON.stringify(this.form.value.status));
    let comment=JSON.parse(JSON.stringify(this.form.value.comment));
  
    
    let markResult = await this.apiService.markAttend({status,comment});
    window.alert(markResult);
    this.form.reset();
    
    
    } 
    
    catch (error) {
      var err:any = error;
      window.alert(err.error);
    
    } 


  }
    
        
}
