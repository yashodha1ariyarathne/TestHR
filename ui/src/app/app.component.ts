import { Component } from '@angular/core';
import { AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-hrmsystem';

  constructor(
    private authService: AuthService,
    
  ){}
  
  isValid=this.authService.isAuthenticated();
}
