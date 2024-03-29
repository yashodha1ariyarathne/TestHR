// import { HttpClient, HttpErrorResponse, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
// import { Router } from "@angular/router";
// import { lastValueFrom, Observable, throwError } from 'rxjs';

// import { JwtHelperService } from '@auth0/angular-jwt';
// import { body } from 'express-validator';

import { AppService } from '../app.service';
// import { AuthService } from '../services/auth.service';
import { ApiService } from '../exapi.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  username: string = '';
  password: string = '';
   
  hide = true;

  constructor(
    
    public appService: AppService,
    public  apiService:  ApiService,
    public router: Router
    
    
  ) { }

  form = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)    
  });

  get f(){
    return this.form.controls;
  }
  
  async login() {

    try {

      let username = JSON.parse(JSON.stringify(this.form.value.username));
      let password = JSON.parse(JSON.stringify(this.form.value.password));

      let loginResult = await this.apiService.userLogin({username,password});

      // let result = JSON.parse(JSON.stringify(loginResult));
    
      if(loginResult){
        this.appService.isValied = true;
        localStorage.setItem('token',loginResult);
        this.router.navigate(['']);
        
      }

      
      
    } 
    
    catch (error) {
      
      var err:any = error;
      window.alert(err.error);
      this.form.reset();
    
    } 


  }
    
        
}


      



    







  

 

