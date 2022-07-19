'use strict'
const express = require('express'); 
const { AppError } = require('../bin/config');
const db = require('../bin/config');
const router = express.Router();

router.get('/leave', async(req, res,next) => {

    var empId = req.body.empId;
    var reason = req.body.reason;
    var dateOfLeaveRequired = req.body.date_of_leave_required;
    var numberOfDaysOfLeaveRequired = req.body.number_of_days_of_leave_required;

    
    if(!empId || !dateOfLeaveRequired || !numberOfDaysOfLeaveRequired ) 
        return res.status(400).send("Please fill all required fields");
    
    try {

        let result = await  global.db.query('SELECT * FROM employees  WHERE emp_id = ? ',[empId]);

        if(!result.length)

            return res.status(400).send("Incorrect Employee id");

        await global.db.query('INSERT INTO leaverequests (emp_id,reason,dateOfLeaveRequired,numberOfDaysOfLeaveRequired) VALUES(?,?,?,?)',[empId,reason,date_of_leave_required,number_of_days_of_leave_required]);
        res.status(201).send("Leave requests sent successfully");

    } catch (e) {
        
        next (new AppError(AppError.types.systemError, 0, e, 200, 500));
        
    }
    
});

module.exports = router;