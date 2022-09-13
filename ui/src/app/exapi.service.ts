import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Injectable, Injector, Input } from '@angular/core';
import { LoginComponent} from './login/login.component';
import { lastValueFrom } from 'rxjs';
import { AppService} from './app.service';
import { AuthService, tokenGetter} from './services/auth.service';



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
    let loginResult = lastValueFrom(this.http.post(this.appService.url + '/login/login', JSON.stringify({username,password}),{headers:headers}));
    // console.log(requestResult);
    return loginResult;
  }

  

  markAttend(status:string,comment:string){
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    let marktResult = lastValueFrom(this.http.post(this.appService.url + '/markAddendance/attendance', JSON.stringify({status,comment}),{headers:headers}));
    // console.log(requestResult);
    return marktResult;
  }


  requestLeave(reason:string,dateOfLeaveRequired:string,numberOfDaysOfLeaveRequired:string,timeForHalfday:string,leaveType:string){
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    let requestResult = lastValueFrom(this.http.post(this.appService.url + '/requestLeave/leave', JSON.stringify({reason,dateOfLeaveRequired,numberOfDaysOfLeaveRequired,timeForHalfday,leaveType}),{headers:headers}));
    // console.log(requestResult);
    return requestResult;
  }

  
  approveLeave(empId:string,date:string,approval:string,comment:string){
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    let requestResult = lastValueFrom(this.http.post(this.appService.url + '/approveLeaveRequest/approvereq', JSON.stringify({empId,date,approval,comment}),{headers:headers}));
    // console.log(requestResult);
    return requestResult;
  }


  
}