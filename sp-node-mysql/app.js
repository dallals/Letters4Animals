// var mysql = require("mysql");
// //create a connection to the db
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "ajaxnotes"
// })
//
// con.connect(function(err){
//   if(err){
//     console.log("Error connecting to the DB");
//     return;
//   }
//   console.log("Connection established");
// });
//
// var employee = {name: 'Ben', location: 'Buffalo'};
// con.query('INSERT INTO employees SET ?', employee, function(err, res){
//   if(err) throw err;
//   console.log('Last insert ID:', res.insertId);
// })
//
// con.query('SELECT * FROM employees', function(err, rows){
//   if(err) throw err;
//   console.log('Data received from Db;\n');
//   console.log(rows);
//   for(var i=0; i<rows.length; i++){
//     console.log(rows[i].name);
//   }
//
// })
//
//
// con.end(function(err){
//   //connection is terminated gracefully, ensures all previously enqueued queries are still before sending a com_quit packet to the MySQL server.
// })
