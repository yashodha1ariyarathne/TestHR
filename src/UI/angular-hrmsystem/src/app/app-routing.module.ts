import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { HttpClientModule } from '@angular/common/http';

import { ReqleaveComponent } from './reqleave/reqleave.component';
import { AppleaveComponent } from './appleave/appleave.component';
import { ManageleaveComponent } from './manageleave/manageleave.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent},

  { path: '', component: ManageleaveComponent ,
    canActivate: [AuthGuard]  },

  // { path: 'manageleave', component: ManageleaveComponent,
  //   canActivate: [AuthGuard]  },

  // { path: 'reqleave', component: ReqleaveComponent,
  //   canActivate: [AuthGuard]  },

  // { path: 'appleave', component: AppleaveComponent,
  //   canActivate: [AuthGuard]  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [AuthGuard]
})

export class AppRoutingModule { }
