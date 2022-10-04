import { Component, OnInit } from '@angular/core';

import { AppService } from '../../app.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent{
  

  constructor(
    public appService: AppService
  ) { }

  
  empTypeId=this.appService.empTypeId;

  logout() {
    localStorage.removeItem('token');
  }

}
