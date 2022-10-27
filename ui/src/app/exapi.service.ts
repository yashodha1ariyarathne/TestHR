import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Injectable, Injector, Input } from '@angular/core';
// import { LoginComponent} from './login/login.component';
import { lastValueFrom } from 'rxjs';
import { AppService} from './app.service';
// import { AuthService} from './services/auth.service';
// import { tokenGetter } from './app.module';


export let injector: Injector;

@Injectable({ providedIn: 'root' })

export class ApiService { 
   
  constructor(
    public http:HttpClient,
    public appService: AppService,
    
    
  ) { }

  userLogin(requestFields:object): Promise<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return  lastValueFrom(this.http.post(this.appService.url + '/login/login', JSON.stringify(requestFields),{headers:headers}));
  }


  markAttend(requestFields:object): Promise<any>{
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+auth_token
    });

    return lastValueFrom(this.http.post(this.appService.url + '/markAddendance/attendance', JSON.stringify(requestFields),{headers:headers}));
  }


  requestLeave(requestFields:object): Promise<any>{
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    return lastValueFrom(this.http.post(this.appService.url + '/requestLeave/leave', JSON.stringify(requestFields),{headers:headers})); 
  }

  
  approveLeave(requestFields:object): Promise<any>{
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    return lastValueFrom(this.http.post(this.appService.url + '/approveLeaveRequest/approvereq', JSON.stringify(requestFields),{headers:headers}));
  }
  markHolidays(requestFields:object): Promise<any>{
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    return lastValueFrom(this.http.post(this.appService.url + '/markHolidays/holidays', JSON.stringify(requestFields),{headers:headers}));
  }
  viewWorkingdays(requestFields:object): Promise<any>{
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    return lastValueFrom(this.http.post(this.appService.url + '/viewAttendanceReport/attendanceReport', JSON.stringify(requestFields),{headers:headers}));
  }


  
}