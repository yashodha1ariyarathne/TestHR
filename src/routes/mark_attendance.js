'use strict'
const express = require('express'); 
const { AppError } = require('../bin/config');
const db = require('../bin/config');
const router = express.Router();

var md5 = require('md5');

router.get('/attendance', async(req, res,next) => {

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
    return res.status(400).send("Please fill all required fields");

  if (statusTypes.includes(statusLowCase) === false) 
    return res.status(400).send("Invalied status type");

  try {

    let result = await  global.db.query('SELECT * FROM employees  WHERE username = ? and hashpassword=?',[username,hashPassword]);

    if(!result.length)

      return res.status(400).send("Incorrect Username or Password");

              
    id = result[0].emp_id;

    var valiedAttendance1 = await global.db.query('SELECT * FROM attendance WHERE date=CURRENT_DATE AND  emp_id=? AND status=?',[id,statusLowCase]);
    
    if(valiedAttendance1.length ===1)
      return res.status(400).send("Already marked"); 
      

   if (statusLowCase===statusTypes[1]){
    var valiedAttendance2 = await global.db.query('SELECT * FROM attendance WHERE date=CURRENT_DATE AND  emp_id=? AND status="in"',[id]);
      
    if(!valiedAttendance2.length)
      return res.status(400).send("You cannot mark 'out' without marking 'in'");

   }
   
   markAtt = await global.db.query('INSERT INTO attendance (emp_id,status,date,time,comment) VALUES(?,?,SYSDATE(),SYSDATE(),?)',[id,statusLowCase,comment]);
   res.status(201).send("Marked successfully");

  }
    
  catch (e) {

    next (new AppError(AppError.types.systemError, 0, e, 200, 500));
   
  }

  
  
});

module.exports = router;