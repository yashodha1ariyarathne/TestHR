import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Injectable, Injector, Input } from '@angular/core';
import { LoginComponent} from './login/login.component';
import { lastValueFrom } from 'rxjs';
import { AppService} from './app.service';
import { AuthService} from './services/auth.service';


export let injector: Injector;

@Injectable({ providedIn: 'root' })

export class ApiService { 
  

  constructor(
    private http:HttpClient,
    private appService: AppService,
    private authService: AuthService,
    
    
  ) { }

  
  userLogin(username:string,password:string){
    let requestResult = lastValueFrom(this.http.post(this.appService.url + '/login/login', {username,password}, {responseType: 'text'}));
   return requestResult;
    // console.log(requestResult);
    
  }

  
}