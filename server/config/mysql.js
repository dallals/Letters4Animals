var mysql = require('mysql');
var fs = require('fs');
var path = require('path');
var con = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "root",
      database: "rendezvous"
  })

con.connect(function(err){
  if(err){
    console.log("Error connecting to the DB");
    return;
  }
  console.log("Connection established");
})

var models_path = path.join(__dirname, './../models');
fs.readdirSync(models_path).forEach(function(file){
  if(file.indexOf('.js') >= 0) {
    require(models_path + '/' + file);
  }
});
