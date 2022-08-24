import {  Injectable, Injector } from '@angular/core';


export let injector: Injector;

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() {
   
  }


}