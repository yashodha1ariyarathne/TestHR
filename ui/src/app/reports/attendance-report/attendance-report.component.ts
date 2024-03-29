import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { ApiService } from 'src/app/exapi.service';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.scss']
})
export class AttendanceReportComponent {
  constructor(
    private fb:FormBuilder,
    private http:HttpClient,
    private appService: AppService,
    private  apiService:  ApiService
  ) { }
   
  requestResult:any;
  form = new FormGroup({
    empId: new FormControl('', Validators.required),
    stDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
  });
  get f(){
    return this.form.controls;
  }

  async submit(){

debugger
    try {
    let empId  = JSON.parse(JSON.stringify(this.form.value.empId));
    let stDate  = JSON.parse(JSON.stringify(this.form.value.stDate));
    let endDate = JSON.parse(JSON.stringify(this.form.value.endDate));
   
    
    this.requestResult = await this.apiService.viewWorkingdays({empId,stDate,endDate});
    // window.alert(this.requestResult);
    // console.log(requestResult)
    // this.form.reset();

    
    
    } 
    
    catch (error) {
      var err:any = error;
      window.alert(err.error);
    
    } 


  }
    
   
   

}
