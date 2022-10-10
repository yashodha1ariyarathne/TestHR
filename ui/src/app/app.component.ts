import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
export class AppComponent {
  title = 'angular-hrmsystem';
  // isValid:any;
  constructor(
   
    public appService  : AppService,
    public router: Router
   
  ){}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

    
}
