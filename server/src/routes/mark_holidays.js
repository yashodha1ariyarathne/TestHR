'use strict'
const express = require('express'); 
const { AppError } = require('../bin/config');
const db = require('../bin/config');
const router = express.Router();


router.post('/holidays', async(req, res,next) => {
   
    let date = req.body.date;
    let holidayType = req.body.holidayType;
    holidayType = holidayType.toLowerCase();

    try {

        //-------------Checking whether mandatory data has been entered.--------------//
        if(!date || !holidayType ) 
        return res.status(401).send("Please fill all required fields")
       
        //-------------Checking if data is already entered.----------------------//
        if( await allreadyMarked()){
            return res.status(401).send("Allready added this holiday")
        }

        await global.db.query('INSERT INTO holidays (date,holidayType) VALUES(?,?)',[date, holidayType]);
        return res.status(201).send("Successfully entered into the database as a holiday.");
           

    } 
    catch (error) {
        
        next (new AppError(AppError.types.systemError, 0, error, 200, 500));
    }


    async function allreadyMarked (){
        let valiedHoliday = await global.db.query('SELECT * FROM holidays WHERE date =? AND  holidayType =?',[date, holidayType]);
        if(valiedHoliday.length === 1){
        return true;
        }

        return false;
        
    } 

});

module.exports = router;