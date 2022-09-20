'use strict'
const express = require('express'); 
const { AppError } = require('../bin/config');
const db = require('../bin/config');
const router = express.Router();

var md5 = require('md5');
const { TokenExpiredError } = require('jsonwebtoken');

router.post('/attendance' ,async(req, res,next) => {
  
  var markAtt;
  var statusTypes=['in','out'];

  var  id = res.locals.empId;
  var typeId=res.locals.empTyepeId;
  var status   = req.body.status;
  var comment  = req.body.comment;


  var statusLowCase =status.toLowerCase();

console.log(res.locals);
  try {

    //Checking whether mandatory data has been entered.
    if(!status)
      return res.status(400).json("Please fill all required fields");

    //Checking that 'Status' is entered correctly.
    if (statusTypes.includes(statusLowCase) === false) 
    return res.status(400).json("Invalied status type");


    //Checking if date related data is already entered.
    let valiedAttendance1 = await global.db.query('SELECT * FROM attendance WHERE date=CURRENT_DATE AND  emp_id=? AND status=?',[id,statusLowCase]);
    
    if(valiedAttendance1.length === 1)
      return res.status(400).json("Already marked"); 

      
    //If 'Out' is entered, checking whether 'In' is entered for that date.
    if (statusLowCase === statusTypes[1]){

      let valiedAttendance2 = await global.db.query('SELECT * FROM attendance WHERE date=CURRENT_DATE AND  emp_id=? AND status="in"',[id]);
        
      if(!valiedAttendance2.length)
        return res.status(400).json("You cannot mark 'out' without marking 'in'");

    }

    //If everything is OK, enter the data into the database.
    markAtt = await global.db.query('INSERT INTO attendance (emp_id,status,date,time,comment) VALUES(?,?,SYSDATE(),SYSDATE(),?)',[id,statusLowCase,comment]);
    res.status(201).json("Marked successfully");

  }
    
  catch (error) {

    next (new AppError(AppError.types.systemError, 0, error, 200, 500));
   
  }

  
  
});

module.exports = router;