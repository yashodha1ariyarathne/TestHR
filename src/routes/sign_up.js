'use strict'
const express = require('express'); 
const { AppError } = require('../bin/config');
const db = require('../bin/config');
const router = express.Router();

const jwt = require("jsonwebtoken")

  const jwtKey = "my_secret_key"
  const jwtExpirySeconds = 300

router.get('/createToken', async(req, res,next) => {

    const users = {
        user1: "password1",
        user2: "password2",
    }
    
    try {
        
        // Get credentials from JSON body
        const { username, password } = req.body;

        if (!username || !password || users[username] !== password) {

            // return 401 error is username or password doesn't exist, or if password does not match the password in our records
            return res.status(401).send("username or password doesn't exist, or if password does or not match the password in our records")
        }
    
        // Create a new token with the username in the payload 
        let token = jwt.sign({ username }, jwtKey, {
            algorithm: "HS256",
            expiresIn: jwtExpirySeconds,
        }) 

        res.status(201).send(token)
    

    } 
    catch (e) {
        
        next (new AppError(AppError.types.systemError, 0, e, 200, 500));
    }
});



module.exports = router;