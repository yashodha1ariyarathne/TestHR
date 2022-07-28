'use strict'
const express = require('express'); 
const { AppError } = require('../bin/config');
const db = require('../bin/config');
const router = express.Router();
// const { TokenExpiredError } = require('jsonwebtoken');

router.get('/manage' ,async(req, res,next) => {
 
  var date = req.body.date;
  
  
  //Checking whether date has been entered.
  if(!date) 
    return res.status(400).send("Please enter date");


  try {

    //Checking whether the username and password entered matche the data in the database.
    let result = await global.db.query('SELECT * FROM leaverequests WHERE dateOfLeaveRequired=?',[date]);

    if(!result.length)
      return res.status(400).send("There are no leave requests related to the date entered");
      
    res.status(201).send(result);

  }
    
  catch (e) {

    next (new AppError(AppError.types.systemError, 0, e, 200, 500));
   
  }

  
  
});

module.exports = router;