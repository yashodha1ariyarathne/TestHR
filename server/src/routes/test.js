'use strict'
const express = require('express'); 
const { AppError } = require('../bin/config');


var sampleOneRouter = express.Router();
var sampleTwoRouter = express.Router();


sampleOneRouter.get('/sample1', async(req, res,next) => {

    // Get credentials from JSON body
    res.setHeader('Content-Type', 'application/json');

    try {
        
        return  res.status(200).send("sample 1 is working");
             

    } 
    catch (error) {
        
        next (new AppError(AppError.types.systemError, 0, error, 200, 500));
    }
});


sampleTwoRouter.get('/sample2', async(req, res,next) => {

    // Get credentials from JSON body
    res.setHeader('Content-Type', 'application/json');

    try {
        
        return  res.status(200).send("sample 2 is working");
             

    } 
    catch (error) {
        
        next (new AppError(AppError.types.systemError, 0, error, 200, 500));
    }
});


module.exports = {sampleOneRouter: sampleOneRouter, sampleTwoRouter: sampleTwoRouter};