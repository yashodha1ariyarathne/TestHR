'use strict'
const express = require('express'); 
const { AppError } = require('../bin/config');
const db = require('../bin/config');
const router = express.Router();

router.post('/approvereq' ,async(req, res,next) => {

    var id = req.body.empId;
    var date = req.body.date;
    var approval = req.body.approval;
    var comment = req.body.comment;
    var empaIdOfTheStatusMarker=req.empId;

    var approvalTypes=['accept','reject'];

    //Checking whether mandatory data has been entered.
    if(!date|| !approval) 
        return res.status(400).send("Please fill all required fields");

    var approval = approval.toLowerCase();
    
    //Checking that 'approval' is entered correctly.
    if (approvalTypes.includes(approval) === false) 
    return res.status(400).send("Invalied approval");

 

    try {

        //Retrieving leave requests from the database related to the date entered.
        let result = await global.db.query('SELECT * FROM leaverequests WHERE emp_id=? AND dateOfLeaveRequired=?',[id,date]);

        if(!result.length)
            return res.status(400).send("Error");

        
        await global.db.query('update leaverequests SET status=?,comment=?,empaIdOfTheStatusMarker=? where emp_id=? AND dateOfLeaveRequired=?',[approval,comment,empaIdOfTheStatusMarker,id,date]); 
        res.status(201).send(result);

    }
        
    catch (e) {

        next (new AppError(AppError.types.systemError, 0, e, 200, 500));
    
    }

    
  
});

module.exports = router;