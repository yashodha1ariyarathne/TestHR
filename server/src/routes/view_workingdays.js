'use strict'
const express = require('express'); 
const { AppError } = require('../bin/config');
const db = require('../bin/config');
const router = express.Router();
var moment = require('moment');


router.post('/workingdays', async(req, res,next) => {
   
    let stDate = req.body.stDate;
    let endDate = req.body.endDate;
    
    var startDate = new Date(stDate); //YYYY-MM-DD
    var edDate = new Date(endDate);

    try {

        let resultHolidays = await global.db.query('SELECT date FROM holidays where date BETWEEN ? AND ?' ,[stDate, endDate]);

        const resultHolidaysArr = [];
        resultHolidays.forEach(object => {
            resultHolidaysArr.push(object.date);
        });


//---holidays and working weekends---------------------------------------------------------------//
    var officalHolidays = resultHolidaysArr; //YYYY-MM-DD
    var workingWeekends = []; //YYYY-MM-DD
    

//--compute date array between start and end dates----------------------------------------------//
    var dateArray = getDateArray(startDate, edDate);

// prepare the holidays array
    var holidaysArray = prepareDateArray(officalHolidays);

// prepare the working weekends array
    var workingWeekendsArray = prepareDateArray(workingWeekends);

// get the working days array
    var workingDateArray = getWorkingDateArray(dateArray, holidaysArray, workingWeekendsArray);

// output
    return res.status(201).send(workingDateArray);

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
    function getWorkingDateArray(dates, hoildayDates, workingWeekendDates) {
        
        // remove holidays
    var arr = dates.filter(function(dt){
        return holidaysArray.indexOf(dt) < 0;
    });

    // remove weekend dates that are not working dates
    var result = arr.filter(function(dt){
        if (dt.indexOf("Sat") > -1 || dt.indexOf("Sun") > -1) {
            if (workingWeekendDates.indexOf(dt) > -1) {
                return dt;
            }
        }
        else {
            return dt;
        }
    });
    
    return result;

    }



});

module.exports = router;