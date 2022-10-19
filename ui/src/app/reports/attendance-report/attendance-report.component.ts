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

  form = new FormGroup({
    stDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
  });
  get f(){
    return this.form.controls;
  }

  async submit(){

    try {
    let stDate  = JSON.parse(JSON.stringify(this.form.value.stDate));
    let endDate = JSON.parse(JSON.stringify(this.form.value.endDate));
   
    
    let requestResult = await this.apiService.viewWorkingdays({stDate,endDate});
    window.alert(requestResult);
    console.log(requestResult)
    this.form.reset();

    
    
    } 
    
    catch (error) {
      var err:any = error;
      window.alert(err.error);
    
    } 


  }
    
   
   

}
