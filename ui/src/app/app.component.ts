import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
// import { AppService } from './app.service';
// import { AuthGuard } from './services/auth.guard';
// import { AuthService} from './services/auth.service';
// export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-hrmsystem';
  // isValid:any;
  constructor(
   
    public appService  : AppService ,
   
  ){}

  ngOnInit() {

    // this.isValid = this.appService.isValied;
    

  }


 
  
    
}
