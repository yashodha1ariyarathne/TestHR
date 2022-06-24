'use strict'
const express = require('express');
const { AppError } = require('../bin/config');
const conn = require('./../database');
const router = express.Router();



router.get('/attendance', async (req, res, next) => {
 
    var username = req.body.username;
    var password = req.body.password;
    var id;


    var sql = 'SELECT * FROM employee WHERE username = ? and password=?';
    

    conn.query(sql,[username,password], (err, result, fields) => {

        if (!result.length) {

          console.log("Incorrect Username or Password");
          res.send("Incorrect Username or Password");

        }

        else {
          id = result[0].emp_id;

          var sql2 = "INSERT INTO attendance (emp_id,date,time) VALUES (?,SYSDATE(),SYSDATE())";

          conn.query(sql2, [id], (err, result) => {

            if (err)
              throw err;
            console.log("1 record inserted");
            res.send("1 record inserted");


          });

        }

      }); 
            
      
});

module.exports = router;