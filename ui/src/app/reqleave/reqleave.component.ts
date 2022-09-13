import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { AppService } from '../app.service';
import { ApiService } from '../exapi.service';

@Component({
  selector: 'app-reqleave',
  templateUrl: './reqleave.component.html',
  styleUrls: ['./reqleave.component.css']
})

export class ReqleaveComponent  { 
  leaveTypes = [
    { id: 1,   name: "casual" },
    { id: 2 , name: "medical" },
    { id: 3,  name: "halfday" }
  ];
  constructor(
    private fb:FormBuilder,
    private http:HttpClient,
    private appService: AppService,
    private  apiService:  ApiService
  ) { }
  form = new FormGroup({
    reason: new FormControl('', Validators.required),
    dateOfLeaveRequired: new FormControl('', Validators.required),
    numberOfDaysOfLeaveRequired: new FormControl('', Validators.required),
    timeForHalfday: new FormControl('', Validators.required),
    leaveType:  new FormControl('', Validators.required)
  });
  get f(){
    return this.form.controls;
  }

  async submit(){

    try {
    let reason = JSON.parse(JSON.stringify(this.form.value.reason));
    let dateOfLeaveRequired = JSON.parse(JSON.stringify(this.form.value.dateOfLeaveRequired));
    let numberOfDaysOfLeaveRequired = JSON.parse(JSON.stringify(this.form.value.numberOfDaysOfLeaveRequired));
    let timeForHalfday = JSON.parse(JSON.stringify(this.form.value.timeForHalfday));
    let leaveType = JSON.parse(JSON.stringify(this.form.value.leaveType));
    
    let requestResult = await this.apiService.requestLeave(reason,dateOfLeaveRequired,numberOfDaysOfLeaveRequired,timeForHalfday,leaveType);
    window.alert(requestResult);
    this.form.reset();

    
    
    } 
    
    catch (error) {
      var err:any = error;
      window.alert(err.error);
    
    } 


  }
    
   
   

}
