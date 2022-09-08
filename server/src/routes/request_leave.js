'use strict'
const express = require('express'); 
const { AppError } = require('../bin/config');
const db = require('../bin/config');
const router = express.Router();



router.post('/leave', async(req, res,next) => {
    
    let empId =res.locals.empId;
    let reason = req.body.reason;
    let dateOfLeaveRequired = req.body.dateOfLeaveRequired;
    let numberOfDaysOfLeaveRequired = req.body.numberOfDaysOfLeaveRequired;
    let timeForHalfday=req.body.timeForHalfday;
    let leaveType = req.body.leaveType;


   
    //Checking whether mandatory data has been entered.

    if(!empId || !dateOfLeaveRequired || !leaveType) 
        return res.status(400).send("Please fill all required fields");
    
    
    if( leaveType === 'halfday'){

        numberOfDaysOfLeaveRequired = 1; //The numberOfDaysOfLeaveRequired variable defaults to 1 for halfday.

        if(!timeForHalfday) 
            return res.status(400).send("Please fill all required fields");
    }

    if(!numberOfDaysOfLeaveRequired) 
        return res.status(400).send("Please fill all required fields");
          
       
    try {

         //Checking that the entered emp_id matches the data in the database.
        let result = await  global.db.query('SELECT * FROM employees  WHERE emp_id = ? ',[empId]);

        if(!result.length)
            return res.status(400).send("Incorrect Employee id");

        let empTypeId = result[0].empTypeId;


        //To find the total number of holidays available in the year for the employee's employee type and leave type
        let resultAvalable = await  global.db.query('SELECT * FROM availableleave  WHERE empTypeId = ? and leaveType = ?',[empTypeId,leaveType]);
        let numberOfAvailabLeleave= resultAvalable[0].NumberOfLeaves
        

        //To find out the total number of leaves taken by the respective employee during the year by employee type and leave type
        let resultTaken = await  global.db.query('SELECT SUM(numberOfDaysOfLeave) as numberOfLeaveTaken  FROM leavetaken  WHERE emp_id = ? AND leaveType = ?',[empId,leaveType]);
        let numberOfLeaveTaken= resultTaken[0].numberOfLeaveTaken
            

        //Checking whether the employee has taken the total number of leaves available in the year for the employee type and leave type
        if(numberOfAvailabLeleave <= numberOfLeaveTaken)
            return res.status(400).send("Sorry, you've already taken all those leave-type leave.");

            
        //If everything is OK, enter the data into the database.
        await global.db.query('INSERT INTO leaverequests (emp_id,leaveType,reason,dateOfLeaveRequired,numberOfDaysOfLeaveRequired,timeForHalfday) VALUES(?,?,?,?,?,?)',[empId,leaveType,reason,dateOfLeaveRequired,numberOfDaysOfLeaveRequired,timeForHalfday]);
        return res.status(201).send("Leave requests sent successfully");
        
    } 

    catch (e) {
        
        next (new AppError(AppError.types.systemError, 0, e, 200, 500));
        
    }
    
});

module.exports = router;