import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Injectable, Injector } from '@angular/core';


export let injector: Injector;

@Injectable({ providedIn: 'root' })

export class AppService { 
  url = 'http://localhost:8080'; 
  static url: string;
  empId = 0;
  empTypeId = 0;
  
  constructor(private http: HttpClient) { } 
  
}
