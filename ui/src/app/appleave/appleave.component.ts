import { HttpClient, HttpErrorResponse,  } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { AppService } from '../app.service';
import { ApiService } from '../exapi.service';

@Component({
  selector: 'app-appleave',
  templateUrl: './appleave.component.html',
  styleUrls: ['./appleave.component.scss']
})
export class AppleaveComponent {
  
  constructor(
    private fb:FormBuilder,
    private http:HttpClient,
    private appService: AppService,
    private  apiService:  ApiService
   
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
   
  async submit(){

    try {
    let empId = JSON.parse(JSON.stringify(this.form.value.empId));
    let date = JSON.parse(JSON.stringify(this.form.value.date));
    let approval= JSON.parse(JSON.stringify(this.form.value.approval));
    let  comment = JSON.parse(JSON.stringify(this.form.value.comment));
    
    let approveResult = await this.apiService.approveLeave({empId,date,approval,comment});
    window.alert(approveResult);
    this.form.reset();

    
    
    } 
    
    catch (error) {
      var err:any = error;
      window.alert(err.error);
    
    } 


  }
      
      
}
     
     
  
  




