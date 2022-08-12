'use strict'
const express = require('express'); 
const { AppError } = require('../bin/config');
const db = require('../bin/config');
const router = express.Router();
const path = require('path')
var bodyparser = require('body-parser');
var urlencodedparser = bodyparser.urlencoded({extended:false})
var md5 = require('md5');

const jwt = require("jsonwebtoken")
const jwtKey = "my_secret_key"
const jwtExpirySeconds = 300


router.post('/login',urlencodedparser, async(req, res,next) => {

    // Get credentials from JSON body
        
    let username = req.body.username;
    let password = req.body.password;

    //Checking whether mandatory data has been entered.
    if(!username || !password ) 
    return res.status(400).send("Please fill all required fields");

    var hashPassword = md5(password);

    try {
        

        let result = await  global.db.query('SELECT * FROM employees  WHERE username =? && hashPassword = ? ',[username,hashPassword]);

        if (!result ) {
            // return 401 error is username or password doesn't exist, or if password does not match the password in our records
            return res.status(401).send("username or password doesn't exist, or if password does or not match the password in our records")
        }
        
        username = result[0].username;
        let empId = result[0].emp_id;

        // Create a new token with the username in the payload 
        let token = jwt.sign({empId}, jwtKey, {
            expiresIn: jwtExpirySeconds,
        }) 

          return res.json(token);
        
        

    } 
    catch (e) {
        
        next (new AppError(AppError.types.systemError, 0, e, 200, 500));
    }
});



module.exports = router;