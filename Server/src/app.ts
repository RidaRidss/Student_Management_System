/// <reference path='./../typings/tsd.d.ts' />

import express = require('express');         // create our app w/ Express 5
import path = require('path');
import mongoose = require('mongoose');       // mongoose for mongodb
import bodyParser = require('body-parser');      // pull information from HTML POST (Express 5)
var app : express.Express = express();
var database = require('./../src/config/database'); 			// load the database config
// Connecting Database
// configuration ===============================================================
mongoose.connect(database.url); 	// connect to mongoDB database
 // view engine setup
app.set('views', path.join(__dirname, '../../Client'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


//body-parser Middleware
app.use(bodyParser.urlencoded({ extended:false }))      // parse application/x-www-form-urlencoded
app.use(bodyParser.json())       // parse application as json


//Static files path
app.use(express.static(path.join(__dirname, '../../Client')));       // set the static files location
app.use(express.static(path.join(__dirname, '../../node_modules')));


// routes ======================================================================


// application -------------------------------------------------------------

require('./../src/routes/routes.js')(app);

// listen (start app with node app.js) ======================================

var port = process.env.PORT || 8080;    // set the port
app.listen(port, () => {
    console.log('Server Listening on 8080')
});
