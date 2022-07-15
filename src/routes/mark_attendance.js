'use strict'
const express = require('express'); 
const { AppError } = require('../bin/config');
const db = require('../bin/config');
const router = express.Router();

var md5 = require('md5');

router.get('/attendance', async(req, res,) => {

  var id;
  var markAtt;
  var statusTypes=['in','out'];

  var username = req.body.username;
  var password = req.body.password;
  var status   = req.body.status;
  var comment   = req.body.comment;

  var hashPassword = md5(password);

  var statusLowCase =status.toLowerCase();
  

  if(!username || !password || !status) 
    return res.status(500).send("Please fill all required fields");

  if (statusTypes.includes(statusLowCase) === false) 
    return res.status(500).send("Invalied status type");

  try {

    let result = await  global.db.query('SELECT * FROM employees  WHERE username = ? and hashpassword=?',[username,hashPassword]);

    if(!result.length)

      return res.status(500).send("Incorrect Username or Password");

              
    id = result[0].emp_id;

    var valiedAttendance = await global.db.query('SELECT * FROM attendance WHERE date=CURRENT_DATE AND  emp_id=? AND status=?',[id,statusLowCase]);

    if(!valiedAttendance.length){
      
      markAtt = await global.db.query('INSERT INTO attendance (emp_id,status,date,time,comment) VALUES(?,?,SYSDATE(),SYSDATE(),?)',[id,statusLowCase,comment]);
      return res.status(200).send("Marked successfully");
    }
      
    res.status(200).send("Already marked"); 
  }
    
  catch (error) {

    res.status(500).send(error);
   
  }

  
  
});

module.exports = router;