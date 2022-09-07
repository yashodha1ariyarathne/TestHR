import { HttpClient, HttpErrorResponse,  } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-appleave',
  templateUrl: './appleave.component.html',
  styleUrls: ['./appleave.component.css']
})
export class AppleaveComponent {
  
  constructor(
    private fb:FormBuilder,
    private http:HttpClient,
    private appService: AppService
   
  ) { }
  form = new FormGroup({
    empId: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    approval: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required)    
  });

  get f(){
    return this.form.controls;
  }
   
  submit(){
    console.log(this.form.value);
    debugger
    const url=this.appService.url;

    this.http.post(

      url+'/approveLeaveRequest/approvereq', 

      JSON.stringify({
        empId:this.form.value.empId,
        date:this.form.value.date,
        approval:this.form.value.approval,
        comment:this.form.value.comment
      }), 

      { "responseType": 'text'}).subscribe(response => {
        localStorage.getItem('token');
        window.alert(response);
      })
  
      this.form.reset();
      
    }
     
     
  
  }




