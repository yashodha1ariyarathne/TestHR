import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; 
// import { AuthInterceptorService } from './auth-interceptor.service'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 


import { AppRoutingModule } from './app-routing.module';
import { ReqleaveComponent } from './reqleave/reqleave.component';
import { AppleaveComponent } from './appleave/appleave.component';
// import { ManageleaveComponent } from './manageleave/manageleave.component';
import { LoginComponent } from './login/login.component';




import { AuthGuard } from './services/auth.guard';
import { JwtModule } from '@auth0/angular-jwt';
import { AppService } from './app.service';
import { MarkattendanceComponent } from './markattendance/markattendance.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { DashComponent } from './dash/dash.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MenubarComponent } from './ui-widgets/menubar/menubar.component';
import { ReportsComponent } from './reports/reports.component';

export function tokenGetter():any {
  
  return localStorage.getItem("token")
}



@NgModule({

  declarations: [
   
    AppComponent,
    ReqleaveComponent,
    AppleaveComponent,
    LoginComponent,
    DashComponent,
    MarkattendanceComponent,
    DashComponent,
    MenubarComponent,
    ReportsComponent
  ],
  imports: [
    
    BrowserAnimationsModule, 
    MaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config : {
       
        tokenGetter: tokenGetter
      }
    }),
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    AuthGuard,
    AppService,
  ],
  bootstrap: [AppComponent],
  

})

export class AppModule { }
