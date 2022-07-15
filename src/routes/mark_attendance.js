'use strict'
const express = require('express'); 
const { AppError } = require('../bin/config');
const db = require('../bin/config');
const router = express.Router();

var md5 = require('md5');

router.get('/attendance', async(req, res,) => {

  var id;
  var res_att;
  var status_types=['in','out'];
 

  var username = req.body.username;
  var password = req.body.password;
  var status   = req.body.status;
  var comment   = req.body.comment;

  var hashpassword = md5(password);

  var status_low =status.toLowerCase();
  

  if(!username || !password || !status) 
    res.status(500).send("Please fill all required fields");

  if (status_types.includes(status_low) === false) 
    return res.status(500).send("Invalied status type");

  try {
    let result =await  global.db.query('SELECT * FROM employees WHERE username = ? and hashpassword=?',[username,hashpassword]);

    if(!result.length)
      res.status(500).send("Incorrect Username or Password");

              
    id = result[0].emp_id;

    var valiedAttendance = await global.db.query('SELECT * FROM attendance WHERE date=CURRENT_DATE AND  emp_id=? AND status=?',[id,status_low]);

    if(!valiedAttendance.length){
      res_att = await global.db.query('INSERT INTO attendance (emp_id,status,date,time,comment) VALUES(?,?,SYSDATE(),SYSDATE(),?)',[id,status_low,comment]);
      return res.status(200).send("Marked successfully");
    }
      
    res.status(500).send("Already marked"); 
  }
    
  catch (error) {

    res.send(error);
   
  }

  
  
});

module.exports = router;