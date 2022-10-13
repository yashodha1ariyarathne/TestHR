'use strict'
const express = require('express'); 
const { AppError } = require('../bin/config');
const db = require('../bin/config');
const router = express.Router();

var md5 = require('md5');
var moment = require('moment');

router.post('/attendance' ,async(req, res,next) => {
  
  var statusTypes={in:'in',out:'out'};

  var id = res.locals.empId;
  var empTypeId = res.locals.empTypeId;
  var status    = req.body.status;
  var comment   = req.body.comment;

  var statusLowCase =status.toLowerCase();

  var tFormat = 'hh:mm:ss';
  var time = moment(),
  // var time = moment('09:05:00', tFormat),
  beforeTime = moment('09:00:00', tFormat),
  afterTime = moment('09:15:00', tFormat);

  var startDate = moment("2022-10-10").format('YYYY-MM-DD');
  var endDate = moment().format('YYYY-MM-DD');

  var leaveType ='halfday';
  var numberOfDaysOfLeave = 1;

  try { 

    //-----------Checking whether mandatory data has been entered.----------------------//
    if(!status)
      return res.status(400).json("Please fill all required fields");

    //------------Checking that 'Status' is entered correctly.----------------------//
    if (!Object.values(statusTypes).includes(statusLowCase)) 
      return res.status(400).json("Invalied status type");

    //-------------Checking if date related data is already entered.----------------------//
    if(await allreadyMarked()){
      return res.status(400).json("Already marked");
    }
     
    //-------------Checking late attendance-------------------------//
    if(statusLowCase === statusTypes.in){

      if(withingLatePeriod()){

        if(await checkingForHalfdays()){
          return res.status(400).json("You cannot mark your attendance");
        } 
        await global.db.query('INSERT INTO leavetaken (emp_id,leaveType,numberOfDaysOfLeave) VALUES(?,?,?)',[id,leaveType,numberOfDaysOfLeave]);
        return res.status(400).json("Today is marked as a half-day leave.");
      }
      
      if(lateAttendance()){
        return res.status(400).json("You cannot mark your attendance");  
      }

    }

    else{
      //----------------------If 'Out' is entered, checking whether 'In' is entered for that date.----------------------//
      if(validOut()){
        return res.status(400).json("You cannot mark 'out' without marking 'in'");
      }

    }
    

    //----------------------If everything is OK, enter the data into the database.----------------------//
    await global.db.query('INSERT INTO attendance (emp_id,status,date,time,comment) VALUES(?,?,SYSDATE(),SYSDATE(),?)',[id,statusLowCase,comment]);
    res.status(201).json("Marked successfully");

       
  } 

  catch (error) {
    next (new AppError(AppError.types.systemError, 0, error, 200, 500));
    
  }
 

  async function allreadyMarked (){
    let valiedAttendance1 = await global.db.query('SELECT * FROM attendance WHERE date=CURRENT_DATE AND  emp_id=? AND status=?',[id,statusLowCase]);
    if(valiedAttendance1.length === 1){
      return true;
    }

    return false;
     
  } 


  function withingLatePeriod(){
    if(time.isBetween(beforeTime, afterTime)){
      return true;
    }
    return false; 
  }


  function lateAttendance(){
    if(time > afterTime){
      return true;
    }
    return false;
  }


  async function checkingForHalfdays(){
   
    let resultAttendanceForMonth = await  global.db.query('SELECT COUNT(*) as numberOfLateAttendance from attendance WHERE  emp_id =? AND date BETWEEN ? AND ?  AND time BETWEEN "09:00:00" AND "09:15:00"',[id,startDate,endDate]);
    let numberOfLateAttendance= resultAttendanceForMonth[0].numberOfLateAttendance
    
    if(numberOfLateAttendance >= 4){
      
      //----------To find the total number of halfdays available in the year for the employee's employee type.------------------//
      let resultAvalable = await  global.db.query('SELECT * FROM availableleave  WHERE empTypeId = ? and leaveType = ?',[empTypeId,leaveType]);
      let numberOfAvailabLeleave= resultAvalable[0].NumberOfLeaves
      

      //--------To find out the total number of halfdays taken by the respective employee during the year by employee type.---------------//
      let resultTaken = await  global.db.query('SELECT SUM(numberOfDaysOfLeave) as numberOfLeaveTaken  FROM leavetaken  WHERE emp_id = ? AND leaveType = ?',[id,leaveType]);
      let numberOfLeaveTaken= resultTaken[0].numberOfLeaveTaken
          

      //---------Checking whether the employee has taken the total number of halfdays available in the year for the employee type.---------//
      if(numberOfAvailabLeleave <= numberOfLeaveTaken){
        return true;
      }

      return false;
    }

    return false;
      
  }


  async function validOut(){
    let valiedAttendance2 = await global.db.query('SELECT * FROM attendance WHERE date=CURRENT_DATE AND  emp_id=? AND status="in"',[id]);
      
    if(!valiedAttendance2.length)
      return true;
      

  }

});


module.exports = router;