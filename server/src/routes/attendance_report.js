'use strict'
const express = require('express'); 
const { AppError } = require('../bin/config');
const db = require('../bin/config');
const router = express.Router();
var moment = require('moment');
 

router.post('/attendanceReport', async(req, res,next) => {
   
    let empId = req.body.empId;
    let stDate = req.body.stDate;
    let endDate = req.body.endDate;
    
    var startDate = new Date(stDate); //YYYY-MM-DD
    var edDate = new Date(endDate);
    

    try {

    //Checking whether mandatory data has been entered.----------------------//
        if(!empId || !stDate || !endDate) 
        return res.status(400).json("Please fill all required fields");

    //Between the 2 days of entry for the employee entered To search for all dates marked for attendance.----------------//
        let details = await global.db.query('SELECT date,time,comment FROM attendance where emp_id =? AND status="in" AND date BETWEEN ? AND ?' ,[empId, stDate, endDate]);

    //Between the 2 days of entry for the employee entered To search for all out comments marked for attendance.----------------//
        let outComments = await global.db.query('SELECT date,comment FROM attendance where emp_id =? AND status="out" AND date BETWEEN ? AND ?' ,[empId, stDate, endDate]);

    //Between the 2 days of entry for the employee entered To search for all leaves.----------------//
        let leaveDetails = await global.db.query('SELECT date,leaveType FROM leavetaken where emp_id =? and date BETWEEN ? AND ?' ,[empId, stDate, endDate]);

        //get date array from details array
        const resultMarkattArr = [];
        details.forEach(object => {
            resultMarkattArr.push(object.date);
        });

        //get time array from details array
        const resultMarkattTimeArr = [];
        details.forEach(object => {
            resultMarkattTimeArr.push(object.time);
        });
        
        //get out comment array from outComments array
        const resultMarkattOutCommentsArr = [];
        outComments.forEach(object => {
            resultMarkattOutCommentsArr.push(object.comment);
        });

        //get in comment array from details array
        const resultMarkattCommentsArr = [];
        details.forEach(object => {
            resultMarkattCommentsArr.push(object.comment);
        });

        //get in leave dates array from leaveDetails array
        const resultLeaveArr = [];
        leaveDetails.forEach(object => {
            resultLeaveArr.push(object.date);
        });

        //get in leave dates array from leaveDetails array
        const resultLeaveTypeArr = [];
        leaveDetails.forEach(object => {
            resultLeaveTypeArr.push(object.leaveType);
        });


    //To find holidays between 2 entered dates.-----------------------------------------------------------------//
        let resultHolidays = await global.db.query('SELECT date FROM holidays where date BETWEEN ? AND ?' ,[stDate, endDate]);

        const resultHolidaysArr = [];
        resultHolidays.forEach(object => {
            resultHolidaysArr.push(object.date);
        });


//---holidays---------------------------------------------------------------//
    var officalHolidays = resultHolidaysArr; //YYYY-MM-DD


//--compute date array between start and end dates----------------------------------------------//
    var dateArray = getDateArray(startDate, edDate);

// prepare the marked array
    var markedAttArray = prepareDateArray(resultMarkattArr);

// prepare the leave array
var leaveArray = prepareDateArray(resultLeaveArr);

// prepare the holidays array
    var holidaysArray = prepareDateArray(officalHolidays);

// get the working days array
    var workingDateArray = getWorkingDateArray(dateArray, holidaysArray);
    

// get the working days detail object
    var detailsobj={};
    var arr = [];
    
for (var i = 0; i < workingDateArray.length; i++) {
    if(markedAttArray.indexOf(workingDateArray[i]) > -1){
        arr.push({
            date: workingDateArray[i],
            attendance_status: {
                type: "present",
                time: resultMarkattTimeArr[i]
                // time: details[i].time
            },
            comment:{
                morning:resultMarkattCommentsArr[i],
                // morning:details[i].comment,
                evening:resultMarkattOutCommentsArr[i]
                // evening:outComments[i].comment
            }
        }); 
        
    }
    else if(leaveArray.indexOf(workingDateArray[i]) > -1){
        arr.push({
            date: workingDateArray[i],
            attendance_status: {
                type: "casual or medical leave"
                // type:resultLeaveTypeArr[i].leaveType
            },
        }); 
    }
    else{
        arr.push({
            date: workingDateArray[i],
            attendance_status: {
                type: "unapproved casual leave",
            },
        }); 

    }
                
    
}
     
    
    // detailsobj.details = arr;

//output
    return res.status(201).send(arr);

    } 
    catch (error) {
        
        next (new AppError(AppError.types.systemError, 0, error, 200, 500));
    }

    //------this will return an array containing all the dates between start date and an end date-----------//
    function getDateArray(start, end) {
        var arr = new Array();
        var dt = new Date(start);
        while (dt <= end) {
            arr.push((new Date(dt)).toString().substring(0,15)); //save only the Day MMM DD YYYY part
            dt.setDate(dt.getDate() + 1);
        }
        return arr;
    }
//--this will prepare a date array--------------------------------------------------------------------//

    function prepareDateArray (dtArr) {
        var arr = new Array();
        for (var i = 0; i < dtArr.length; i++) {
            arr.push((new Date(dtArr[i])).toString().substring(0,15)); //save only the Day MMM DD YYYY part
        }
        return arr;
}


//--this will return an array consisting of the working dates-----------------------------//
    function getWorkingDateArray(dates, hoildayDates) {
        
        // remove holidays
    var arr = dates.filter((dt) =>{
        return holidaysArray.indexOf(dt) < 0;
    });
   
    // remove weekend dates that are not working dates
    var result = arr.filter((dt) => {
        if (dt.indexOf("Sat") > -1 || dt.indexOf("Sun") > -1) {
            return null;
        }
        return dt;
    });
    
    return result;

    }

});

module.exports = router;