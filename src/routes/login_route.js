'use strict'
const express = require('express'); 
const { AppError } = require('../bin/config');
const db = require('../bin/config');
const router = express.Router();

var md5 = require('md5');

async function login(req, res,next) {

    var username = req.body.username;
    var password = req.body.password;

    var hashPassword = md5(password);
   
    if(!username || !password) 
        return res.status(400).send("Please fill all fields");

    try {

        let result = await  global.db.query('SELECT * FROM employees  WHERE username = ? and hashpassword=?',[username,hashPassword]);

        if(!result.length)

            return res.status(400).send("Incorrect Username or Password");

        res.status(201).send("Loging successful");
        return id = result[0].emp_id;

    }
    catch(e){

        next (new AppError(AppError.types.systemError, 0, e, 200, 500));
    }
};


module.exports = router;