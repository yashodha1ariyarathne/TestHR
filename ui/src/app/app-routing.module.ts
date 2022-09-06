import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { AuthGuard } from './services/auth.guard';

import { AppComponent } from './app.component';
import { ReqleaveComponent } from './reqleave/reqleave.component';
import { AppleaveComponent } from './appleave/appleave.component';
// import { ManageleaveComponent } from './manageleave/manageleave.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboad.component';
import { MarkattendanceComponent } from './markattendance/markattendance.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent,
    data:{
      username:'username',
      password:'password'
    }
  },

  { path: '', component: DashboardComponent,
    canActivate: [AuthGuard]  
  },

  { path: 'markattendance', component: MarkattendanceComponent,
    canActivate: [AuthGuard],
    data:{
      status:'status',
      comment:'comment'
    } 
  },

  { path: 'reqleave', component: ReqleaveComponent,
    canActivate: [AuthGuard],
    data:{
      reason:'reason',
      dateOfLeaveRequired:'dateOfLeaveRequired',
      numberOfDaysOfLeaveRequired:'numberOfDaysOfLeaveRequired',
      timeForHalfday:'timeForHalfday',
      leaveType:'leaveType'
    }
  },

  { path: 'appleave', component: AppleaveComponent,
    canActivate: [AuthGuard],
    data:{
      empId:'empId',
      date:'date',
      approval:'approval',
      comment:'comment'
    }  
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [AuthGuard]
})

export class AppRoutingModule { }