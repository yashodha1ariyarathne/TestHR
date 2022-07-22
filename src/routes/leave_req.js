'use strict'
const express = require('express'); 
const { AppError } = require('../bin/config');
const db = require('../bin/config');
const router = express.Router();

router.get('/leave', async(req, res,next) => {

    let empId = req.body.empId;
    let reason = req.body.reason;
    let dateOfLeaveRequired = req.body.date_of_leave_required;
    let numberOfDaysOfLeaveRequired = req.body.number_of_days_of_leave_required;
    let leaveType = req.body.type;

    let valiedLeaveType = ['casual','medical','halfday'];

    let leaveTypeLowCase = leaveType.toLowerCase();


    //Checking whether mandatory data has been entered.
    if(!empId || !dateOfLeaveRequired || !numberOfDaysOfLeaveRequired || !leaveType) 
        return res.status(400).send("Please fill all required fields");

    
    //Checking that 'leave type' is entered correctly.
    if (valiedLeaveType.includes(leaveTypeLowCase) === false) 
    return res.status(400).send("Invalied leave type");
    
    try {

         //Checking that the entered emp_id matches the data in the database.
        let result = await  global.db.query('SELECT * FROM employees  WHERE emp_id = ? ',[empId]);

        if(!result.length)
            return res.status(400).send("Incorrect Employee id");

        let empTypeId = result[0].empTypeId;


        //To find the total number of holidays available in the year for the employee's employee type and leave type
        let result2 = await  global.db.query('SELECT * FROM availableleave  WHERE empTypeId = ? and leaveType = ?',[empTypeId,leaveTypeLowCase]);
        let numberOfAvailabLeleave= result2[0].NumberOfLeaves
        

        //To find out the total number of leaves taken by the respective employee during the year by employee type and leave type
        let result3 = await  global.db.query('SELECT COUNT(emp_id) as numberOfLeaveTaken  FROM leavetaken  WHERE emp_id = ? AND leaveType = ?',[empId,leaveTypeLowCase]);
        let numberOfLeaveTaken= result3[0].numberOfLeaveTaken  

        //Checking whether the employee has taken the total number of leaves available in the year for the employee type and leave type
        if(numberOfAvailabLeleave <= numberOfLeaveTaken)
            return res.status(400).send("Sorry! All your leave will be taken for this leave type");
            
        //If everything is OK, enter the data into the database.
        await global.db.query('INSERT INTO leaverequests (emp_id,reason,dateOfLeaveRequired,numberOfDaysOfLeaveRequired) VALUES(?,?,?,?)',[empId,reason,dateOfLeaveRequired,numberOfDaysOfLeaveRequired]);
        res.status(201).send("Leave requests sent successfully");
        
    } 

    catch (e) {
        
        next (new AppError(AppError.types.systemError, 0, e, 200, 500));
        
    }
    
});

module.exports = router;