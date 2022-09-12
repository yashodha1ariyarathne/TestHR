import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Injectable, Injector } from '@angular/core';


export let injector: Injector;

@Injectable({ providedIn: 'root' })

export class AppService { 
  url = 'http://localhost:8080'; 
  static url: string;
  constructor(private http: HttpClient) { } 
  
}
export function geturl(){
  const url='http://localhost:8080/login/login';
  return url;
}
export function getusername(){
  const username ='yasho';
  return username;
}
export function getpassword(){
  const password='123';
  return  password;
}
