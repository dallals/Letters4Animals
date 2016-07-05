var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require("mysql");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, './client')));
require('./server/config/mysql.js');
require('./server/config/routes.js')(app);


app.listen(8000, function() {
  console.log("Listening on Port 8000");
})
