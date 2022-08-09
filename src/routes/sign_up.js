'use strict'
const express = require('express'); 
const { AppError } = require('../bin/config');
const db = require('../bin/config');
const router = express.Router();
const path = require('path')
var bodyparser = require('body-parser');
var urlencodedparser = bodyparser.urlencoded({extended:false})


const jwt = require("jsonwebtoken")
const jwtKey = "my_secret_key"
const jwtExpirySeconds = 300


router.post('/createToken',urlencodedparser, async(req, res,next) => {

    const users = {
        u1: "p1",
        u2: "p2",
    }
    
    try {
        // console.log(req.body)
        // Get credentials from JSON body
        // console.log(req.body.username);
        let username = req.body.username;
        let password = req.body.password;

        if (!username || !password || users[username] !== password) {

            // return 401 error is username or password doesn't exist, or if password does not match the password in our records
            return res.status(401).send("username or password doesn't exist, or if password does or not match the password in our records")
        }
    
        // Create a new token with the username in the payload 
        let token = jwt.sign({ username }, jwtKey, {
            algorithm: "HS256",
            expiresIn: jwtExpirySeconds,
        }) 

        res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })
        res.status(200).send(token);

    } 
    catch (e) {
        
        next (new AppError(AppError.types.systemError, 0, e, 200, 500));
    }
});



module.exports = router;