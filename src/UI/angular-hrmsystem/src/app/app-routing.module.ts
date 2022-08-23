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


const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  { path: 'manageleave', component: ManageleaveComponent },
  { path: 'reqleave', component: ReqleaveComponent },
  { path: 'appleave', component: AppleaveComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

