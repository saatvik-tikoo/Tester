var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3');
var cors = require('cors')

var corsOptions = {
  origin: 'localhost:3000'
}

var app = express();
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var db = new sqlite3.Database('./database/mydb.sqlite3', (err) => { 
	if (err) { 
		console.log('Error when creating the database', err);
		throw 0;
	}
	console.log('Database accessed!');
});
 
// Add restful controller
require('./EmployeeController')(app, db, jsonParser, urlencodedParser, cors);
 
// Serve static files
 
app.listen(8000);