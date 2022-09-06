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

  var  id = req.empId;
  var status   = req.body.status;
  var comment  = req.body.comment;


  var statusLowCase =status.toLowerCase();

  try {

    //Checking whether mandatory data has been entered.
    if(!status)
      return res.status(400).send("Please fill all required fields");

    //Checking that 'Status' is entered correctly.
    if (statusTypes.includes(statusLowCase) === false) 
    return res.status(400).send("Invalied status type");


    //Checking if date related data is already entered.
    let valiedAttendance1 = await global.db.query('SELECT * FROM attendance WHERE date=CURRENT_DATE AND  emp_id=? AND status=?',[id,statusLowCase]);
    
    if(valiedAttendance1.length === 1)
      return res.status(400).send("Already marked"); 

      
    //If 'Out' is entered, checking whether 'In' is entered for that date.
    if (statusLowCase === statusTypes[1]){

      let valiedAttendance2 = await global.db.query('SELECT * FROM attendance WHERE date=CURRENT_DATE AND  emp_id=? AND status="in"',[id]);
        
      if(!valiedAttendance2.length)
        return res.status(400).send("You cannot mark 'out' without marking 'in'");

    }

    //If everything is OK, enter the data into the database.
    markAtt = await global.db.query('INSERT INTO attendance (emp_id,status,date,time,comment) VALUES(?,?,SYSDATE(),SYSDATE(),?)',[id,statusLowCase,comment]);
    res.status(201).send("Marked successfully");

  }
    
  catch (e) {

    next (new AppError(AppError.types.systemError, 0, e, 200, 500));
   
  }

  
  
});

module.exports = router;