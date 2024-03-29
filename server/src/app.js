'use strict'

const express = require('express');
const app = express();
const routes = require('./routes');
const log = require('./bin/config').log;
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const url = require('url');
var $  = require('jquery');  

const jwt = require("jsonwebtoken")
const jwtKey = "my_secret_key"
const jwtExpirySeconds = 60

const path = require('path')
app.use('/',express.static(path.join(__dirname,'ui')))


//Expect a JSON body
app.use(bodyParser.json({
    limit: '50mb'                   //Request size - 50MB
}));

// // Accessing Cookies from user's Browser
// app.use(cookieParser())


//Handle CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    if ('OPTIONS' == req.method) {
        res.status(200).send();
    } else {
        next();
    }
});


//Health Checker
app.use('/healthz', async (req, res) => {

    if (global.db) {

        try{

            var results = await db.query('select 1');

            return res.status(200).json({
                ping: 'PONG'
            })
        }
        catch(e) {

            log.error(e);

            return res.status(500).json({
                ping: 'FAIL'
            })
        }
        
    }
    else{
        // A patch for initial health checking
        return res.status(200).json({
            ping: 'PONG'
        })    
    }
    
});


//Version
app.use('/ver', (req, res) => {
    res.status(200).send('0.1.0');
});

//------------------------- Open Routes -------------------------//
// app.post('/', (req, res) => {
// res.sendFile(path.join(__dirname+'/UI/login.html'));
// });
// res.setHeader('Authorization', 'Bearer ' + token);
                // next();

app.use('/login',routes.login);

app.use(async (req, res, next) => {
    const bearerHeader= req.headers['authorization']

        if(!bearerHeader)
           return res.status(400).send('Invalied token'); 
    
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.headers['authorization'] = bearerToken;
        
        try {
            // Verify the token using jwt.verify method
            const decodedToken = jwt.verify(bearerToken, jwtKey,jwtExpirySeconds);
            res.locals.empId = decodedToken.payload.empId;
            res.locals.empTypeId = decodedToken.payload.empTypeId;
            next();
            // return res.status(400).send('Invalied token');
            
        } 
        catch (error) {
            return res.status(400).send(error);
        }
})
    
app.use('/markAddendance', routes.mark_attendance);
app.use('/requestLeave', routes.request_leave);
app.use('/viewLeaveRequest', routes.view_leavereq);
app.use('/approveLeaveRequest', routes.app_leavereq);
app.use('/markHolidays', routes.mark_holidays);
app.use('/viewAttendanceReport', routes.attendance_report);


//Common error handler
app.use(function errorHandler(err, req, res, next){

    console.log('error');

    if (res.headersSent) {
        log.error(`Name: ${err.name},  End-point: ${req.originalUrl}, Message: ${err.message}, Code: ${err.errorCode}, Address: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`);
        return next(err);        //Hand it over to express default error handler
    }

    
    log.error(`Name: ${err.name}, End-point: ${req.originalUrl}, Message: ${err.message}, DevMessage: ${err.devMessage}, Code: ${err.errorCode}, Stack: ${err.stack}, Address: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`);
   
    if (process.env.NODE_ENV !== 'production') {

        //err.message now has only 3 own properties. We need to get "stack" and "message" properties front 
        Object.defineProperty(err, 'message', {
            enumerable: true,
            configurable: true,
            writable: true,
            value: err.message
        });

        Object.defineProperty(err, 'stack', {
            enumerable: true,
            configurable: true,
            writable: true,
            value: err.stack
        });


        res.status(err.httpCode).json(err);
    }    
    else {

        //Delete unnecessary fileds in production
        delete err.type;
        delete err.devMessage;
        delete err.internalCode;
        res.status(err.httpCode).json(err.message); 
    }

}) 


module.exports = app;