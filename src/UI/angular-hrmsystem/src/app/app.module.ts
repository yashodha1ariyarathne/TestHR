import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; 
import { AuthInterceptorService } from './auth-interceptor.service'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 


import { AppRoutingModule } from './app-routing.module';
import { ReqleaveComponent } from './reqleave/reqleave.component';
import { AppleaveComponent } from './appleave/appleave.component';
import { ManageleaveComponent } from './manageleave/manageleave.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboad.component';

import { AuthGuard } from './services/auth.guard';
import { tokenGetter } from './services/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { AppService } from './app.service';
import { MarkattendanceComponent } from './markattendance/markattendance.component';


@NgModule({

  declarations: [
   
    AppComponent,
    ReqleaveComponent,
    AppleaveComponent,
    ManageleaveComponent,
    LoginComponent,
    DashboardComponent,
    MarkattendanceComponent
  ],
  imports: [
    
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
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    AuthGuard,
    AppService,
  ],
  bootstrap: [AppComponent],
  

})

export class AppModule { }
