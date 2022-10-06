import { Component } from '@angular/core';
// import { AppService } from './app.service';
import { AuthGuard } from './services/auth.guard';
// import { AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-hrmsystem';

  constructor(
   
    public authGuard : AuthGuard,
    // public authService : AuthService
  ){}


  
  isValid = this.authGuard.isvalied;
    
}
