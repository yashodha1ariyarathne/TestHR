import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReqleaveComponent } from './reqleave/reqleave.component';
import { AppleaveComponent } from './appleave/appleave.component';
import { ManageleaveComponent } from './manageleave/manageleave.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent,
    data:{username:'username',password:'password'}},

  { path: '', component: HomeComponent,
    canActivate: [AuthGuard]  },

  { path: 'manageleave', component: ManageleaveComponent,
    canActivate: [AuthGuard]  },

  { path: 'reqleave', component: ReqleaveComponent,
    canActivate: [AuthGuard]  },

  { path: 'appleave', component: AppleaveComponent,
    canActivate: [AuthGuard]  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [AuthGuard]
})

export class AppRoutingModule { }
