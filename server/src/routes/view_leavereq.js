'use strict'
const express = require('express'); 
const { error } = require('jquery');
const { AppError } = require('../bin/config');
const db = require('../bin/config');
const router = express.Router();

router.post('/viewreq' ,async(req, res,next) => {
 
  var date = req.body.date;
  
  
  //Checking whether date has been entered.
  if(!date) 
    return res.status(400).json("Please enter date");

 

  try {

    //Retrieving leave requests from the database related to the date entered.
  
    await global.db.query('SELECT * FROM leaverequests WHERE dateOfLeaveRequired = ?',[date] ,(err, rows, fields) => { 
      if(err)
      return res.status(400).json("There are no leave requests related to the date entered");

   
    for( let i = 0 ; i < rows.length ; i++){
      var row = rows[i];
      console.log(row.emp_id);
      console.log(row.reason);
      console.log(row.leaveType);
      console.log(row.dateOfLeaveRequired);
      console.log(row.numberOfDaysOfLeaveRequired);
      console.log(row.timeForHalfday);
      console.log(row.status);
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(rows));
    });     
  }

  catch (e) {

    next (new AppError(AppError.types.systemError, 0, e, 200, 500));
   
  }

  
  
});

module.exports = router;