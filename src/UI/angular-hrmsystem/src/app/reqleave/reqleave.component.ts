import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';

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
    private appService: AppService
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
   
  submit(){
    console.log(this.form.value);
    debugger
    const url=this.appService.url;

    this.http.post(

      url+'/request/leave', 

      JSON.stringify({reason:this.form.value.reason,
        dateOfLeaveRequired:this.form.value.dateOfLeaveRequired,
        numberOfDaysOfLeaveRequired:this.form.value.numberOfDaysOfLeaveRequired,
        timeForHalfday:this.form.value.timeForHalfday,
        leaveType:this.form.value.leaveType}), 

      { "responseType": 'text'})
      
      .subscribe(response => {
        localStorage.getItem('token');
      })
  }
   
   

}
