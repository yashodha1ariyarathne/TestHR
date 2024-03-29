import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { AuthGuard } from './services/auth.guard';

import { AppComponent } from './app.component';
import { ReqleaveComponent } from './reqleave/reqleave.component';
import { AppleaveComponent } from './appleave/appleave.component';
import { LoginComponent } from './login/login.component';
import { MarkattendanceComponent } from './markattendance/markattendance.component';
import { DashComponent } from './dash/dash.component';
import { MenubarComponent } from './ui-widgets/menubar/menubar.component';
import { ReportsComponent } from './reports/reports.component';
import { AttendanceReportComponent } from './reports/attendance-report/attendance-report.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent,
  
    data:{
      username:'username',
      password:'password'
    }
  },

    { path:'', component: DashComponent,
    canActivate: [AuthGuard], 
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
  },

  { path: 'reports', component: ReportsComponent,
  canActivate: [AuthGuard]
   
  },
  { path: 'attreports', component: AttendanceReportComponent,
  canActivate: [AuthGuard]
   
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [AuthGuard]
})

export class AppRoutingModule { }
