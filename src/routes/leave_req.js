'use strict'
const express = require('express'); 
const { AppError } = require('../bin/config');
const db = require('../bin/config');
const router = express.Router();


router.get('/leave', async(req, res,next) => {

    var empId = req.body.empId;
    var reason   = req.body.reason;
    var date_of_leave_required = req.body.date_of_leave_required;
    var number_of_days_of_leave_required =req.body.number_of_days_of_leave_required;

    var reqLeave;
    
    try {
        let result = await  global.db.query('SELECT * FROM employees  WHERE emp_id =?',[empId]);

        if(!result.length)

            return res.status(400).send("Incorrect Emp Id");

        reqLeave = await global.db.query('INSERT INTO leaverequests (emp_id,reason,date_of_leave_required,number_of_days_of_leave_required) VALUES(?,?,?,?)',[empId,reason,date_of_leave_required,number_of_days_of_leave_required]);
        res.status(201).send("Marked successfully");

    } catch (e) {
        
        next (new AppError(AppError.types.systemError, 0, e, 200, 500));
        
    }
    
});

module.exports = router;