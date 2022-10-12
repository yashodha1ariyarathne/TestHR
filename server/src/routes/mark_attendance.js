'use strict'
const express = require('express'); 
const { AppError } = require('../bin/config');
const db = require('../bin/config');
const router = express.Router();

var md5 = require('md5');
var moment = require('moment');

router.post('/attendance' ,async(req, res,next) => {
  
  var markAtt;
  var statusTypes={in:'in',out:'out'};

  var  id = res.locals.empId;
  var typeId=res.locals.empTyepeId;
  var status   = req.body.status;
  var comment  = req.body.comment;


  var statusLowCase =status.toLowerCase();


  try {

    //-------------------Checking whether mandatory data has been entered.----------------------//
    if(!status)
      return res.status(400).json("Please fill all required fields");


    //------------Checking that 'Status' is entered correctly.----------------------//
    if (!Object.values(statusTypes).includes(statusLowCase)) 
    return res.status(400).json("Invalied status type");


    //----------------------Checking if date related data is already entered.----------------------//
    let valiedAttendance1 = await global.db.query('SELECT * FROM attendance WHERE date=CURRENT_DATE AND  emp_id=? AND status=?',[id,statusLowCase]);
    
    if(valiedAttendance1.length === 1)
      return res.status(400).json("Already marked"); 
    

    //----------------------checking late attendance-------------------------//
    if (statusLowCase === statusTypes.in){
      
      var tFormat = 'hh:mm:ss';
      // var dFormat = 'YYYY-MM-DD';

      var time = moment(),
      // var time = moment('09:05:00', tFormat),
      beforeTime = moment('09:00:00', tFormat),
      afterTime = moment('09:15:00', tFormat);

      // var startDate = moment('2022-10-11', dFormat);
      // var endDate = moment('2022-11-10', dFormat);
      
      if(time > afterTime){
        return res.status(400).json("You cannot mark your attendance");
      }
  

      if (time.isBetween(beforeTime, afterTime)) {
        let resultAttendanceForMonth = await  global.db.query('SELECT COUNT(*) as numberOfLateAttendance from attendance WHERE  emp_id =? AND date BETWEEN "2022-10-11" AND "2022-11-10" AND time BETWEEN "09:00:00" AND "09:15:00"',[id,startDate,endDate]);
        // let resultAttendanceForMonth = await  global.db.query('SELECT COUNT(*) as numberOfLateAttendance from attendance WHERE  emp_id =? AND date BETWEEN "?" AND "?" AND time BETWEEN "09:00:00" AND "09:15:00"',[id,startDate,endDate]);
        let numberOfLateAttendance= resultAttendanceForMonth[0].numberOfLateAttendance
        console.log(numberOfLateAttendance)

        if(numberOfLateAttendance >= 4)
          return res.status(400).json("You have delayed marking 'in' for 4 days this month.");
        
      } 
    }
    

      
    //----------------------If 'Out' is entered, checking whether 'In' is entered for that date.----------------------//
    if (statusLowCase === statusTypes.out){

      let valiedAttendance2 = await global.db.query('SELECT * FROM attendance WHERE date=CURRENT_DATE AND  emp_id=? AND status="in"',[id]);
        
      if(!valiedAttendance2.length)
        return res.status(400).json("You cannot mark 'out' without marking 'in'");

    }

    //----------------------If everything is OK, enter the data into the database.----------------------//
    markAtt = await global.db.query('INSERT INTO attendance (emp_id,status,date,time,comment) VALUES(?,?,SYSDATE(),SYSDATE(),?)',[id,statusLowCase,comment]);
    res.status(201).json("Marked successfully");

  }
    
  catch (error) {

    next (new AppError(AppError.types.systemError, 0, error, 200, 500));
   
  }

  
  
});

module.exports = router;