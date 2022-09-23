'use strict'
const express = require('express'); 
const { AppError } = require('../bin/config');
const db = require('../bin/config');
const router = express.Router();

router.post('/approvereq' ,async(req, res,next) => {

    var id = req.body.empId;
    let empTypeId =res.locals.empTypeId;
    var date = req.body.date;
    var approval = req.body.approval;
    var comment = req.body.comment;
    var empaIdOfTheStatusMarker=req.empId;

    var approvalTypes=['accept','reject'];

    //Checking user privilege level.
    if(empTypeId <= 2) 
        return res.status(400).json("You cannot do this according to the your user privilege level.");

    //Checking whether mandatory data has been entered.
    if(!date|| !approval) 
        return res.status(400).json("Please fill all required fields");

    var approval = approval.toLowerCase();
    
    //Checking that 'approval' is entered correctly.
    if (approvalTypes.includes(approval) === false) 
    return res.status(400).json("Invalied approval");

 

    try {

        //Retrieving leave requests from the database related to the date entered.
        let result = await global.db.query('SELECT * FROM leaverequests WHERE emp_id=? AND dateOfLeaveRequired=?',[id,date]);

        if(!result.length)
            return res.status(400).json("Error");

        
        await global.db.query('update leaverequests SET status=?,comment=?,empaIdOfTheStatusMarker=? where emp_id=? AND dateOfLeaveRequired=?',[approval,comment,empaIdOfTheStatusMarker,id,date]); 
        res.status(201).json("Approval submit successfully");

    }
        
    catch (e) {

        next (new AppError(AppError.types.systemError, 0, e, 200, 500));
    
    }

    
  
});

module.exports = router;