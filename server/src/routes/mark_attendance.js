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
  // var time = moment('13:05:00', tFormat),
  beforeTime = moment('09:00:00', tFormat),
  afterTime = moment('09:15:00', tFormat),
  halfdayEndTime = moment('12:30:00', tFormat);
  var startDate = moment("2022-10-10").format('YYYY-MM-DD');

  var endDate = moment().format('YYYY-MM-DD');

  var leaveType ='halfday';
  var numberOfDaysOfLeave = 1;

  try { 

    //-----------Checking whether mandatory data has been entered.----------------------//
    if(!status)
      return res.status(400).send("Please fill all required fields");

    //------------Checking that 'Status' is entered correctly.----------------------//
    if (!Object.values(statusTypes).includes(statusLowCase)) 
      return res.status(400).send("Invalied status type");

    //-------------Checking if date related data is already entered.----------------------//
    if(await allreadyMarked()){
      return res.status(400).send("Already marked");
    }
     
    //-------------Checking late attendance-------------------------//
    if(statusLowCase === statusTypes.in){

      const inTimeAlignment = getinTimeAlignment();
      // console.log(inTimeAlignment);
  
      switch (inTimeAlignment) {

        case "not-late":
          await global.db.query('INSERT INTO attendance (emp_id,status,date,time,comment) VALUES(?,?,SYSDATE(),SYSDATE(),?)',[id,statusLowCase,comment]);
          res.status(201).send("Marked successfully");
          break;


        case "within-late":
          if(await isLateAttAvailable()){
            await global.db.query('INSERT INTO attendance (emp_id,status,date,time,comment) VALUES(?,?,SYSDATE(),SYSDATE(),?)',[id,statusLowCase,comment]);
            res.status(201).send("Marked successfully");
          }

          else{

            if(isHalfdaysAvailable()){
              await global.db.query('INSERT INTO leavetaken (emp_id,leaveType,numberOfDaysOfLeave) VALUES(?,?,?)',[id,leaveType,numberOfDaysOfLeave]);
              await global.db.query('INSERT INTO attendance (emp_id,status,date,time,comment) VALUES(?,?,SYSDATE(),SYSDATE(),?)',[id,statusLowCase,comment]);
              res.status(400).send("Today is marked as a half-day leave.");
            }

            res.status(400).send("You have already taken the maximum number of lates and halfdays for the month"); 
          } 
          break;


        case "late-time-passed":
          if(await isHalfdaysAvailable()){
            await global.db.query('INSERT INTO leavetaken (emp_id,leaveType,numberOfDaysOfLeave) VALUES(?,?,?)',[id,leaveType,numberOfDaysOfLeave]);
            await global.db.query('INSERT INTO attendance (emp_id,status,date,time,comment) VALUES(?,?,SYSDATE(),SYSDATE(),?)',[id,statusLowCase,comment]);
            res.status(400).send("Today is marked as a half-day leave."); 
          }

          res.status(400).send("You have already taken the maximum number of halfdays for the month");
          break;


        case "half-day-time-passed":
          res.status(400).send("You cannot mark your attendance"); 
          break;
  
        default:
          res.status(400).send("Error"); 
          break;
      }
    }

    else{
      //----------------------If 'Out' is entered, checking whether 'In' is entered for that date.----------------------//
      if(validOut()){
        return res.status(400).send("You cannot mark 'out' without marking 'in'");
      }

    }     
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

  function getinTimeAlignment(){
    //before 9.00am
    if(time < beforeTime){
      return "not-late";
    }
    //between 9.00am and 9.15am
    if(time.isBetween(beforeTime, afterTime)){
      return "within-late";
    }
    //between 9.15am and 12.30pm
    if(time.isBetween(afterTime,halfdayEndTime)){
      return "late-time-passed";
    }
    //after 12.30pm
    if(time > halfdayEndTime){
      return "half-day-time-passed";
    }   
  
  }

  async function isLateAttAvailable(){
    let resultAttendanceForMonth = await  global.db.query('SELECT COUNT(*) as numberOfLateAttendance from attendance WHERE  emp_id =? AND date BETWEEN ? AND ?  AND time BETWEEN "09:00:00" AND "09:15:00"',[id,startDate,endDate]);
    let numberOfLateAttendance= resultAttendanceForMonth[0].numberOfLateAttendance
    
    if(numberOfLateAttendance <= 4){
      return true;
    }
    return false;
  }

  async function isHalfdaysAvailable(){
  
    //To find the total number of halfdays available in the year for the employee's employee type.//
    let resultAvalable = await  global.db.query('SELECT * FROM availableleave  WHERE empTypeId = ? and leaveType = ?',[empTypeId,leaveType]);
    let numberOfAvailabLeleave= resultAvalable[0].NumberOfLeaves
    

    //To find out the total number of halfdays taken by the respective employee during the year by employee type.//
    let resultTaken = await  global.db.query('SELECT SUM(numberOfDaysOfLeave) as numberOfLeaveTaken  FROM leavetaken  WHERE emp_id = ? AND leaveType = ?',[id,leaveType]);
    let numberOfLeaveTaken= resultTaken[0].numberOfLeaveTaken
        

    //Checking whether the employee has taken the total number of halfdays available in the year for the employee type.//
    if(numberOfAvailabLeleave >= numberOfLeaveTaken){
      return true;
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