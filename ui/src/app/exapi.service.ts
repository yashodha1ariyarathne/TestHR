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

    const headers = new HttpHeaders().set('Content-Type','application/json');
    let requestResult = lastValueFrom(this.http.post(this.appService.url + '/login/login', JSON.stringify({username,password}),{headers:headers}));
    // console.log(requestResult);
    return requestResult;
  }

  

  
}