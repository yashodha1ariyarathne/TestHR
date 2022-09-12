import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Injectable, Injector, Input } from '@angular/core';
import { LoginComponent} from './login/login.component';
import { lastValueFrom } from 'rxjs';
import { AppService,geturl,getusername,getpassword } from './app.service';
import { AuthService} from './services/auth.service';


export let injector: Injector;

@Injectable({ providedIn: 'root' })

export class ApiService { 
  

  constructor(
    private http:HttpClient,
    private appService: AppService,
    private authService: AuthService,
    
    
  ) { }

  public async  callReaquest(){
    debugger
    const url= geturl();
    const username= getusername();
    const password= getpassword()
    try {

      let requestResult = await lastValueFrom(this.http.post(

          url, 

          JSON.stringify({username:username,password:password}), 

        { "responseType": 'text'}))

      if(requestResult){
        localStorage.setItem("token",requestResult);
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