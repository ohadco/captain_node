// Using express as a web server
var express = require('express');

// default port is 3000 - can be changed if needed
var port = 3000;

// configure the express application variable
var app = express();

// bodyParser is used to get post request's body
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Serving static files from 'app' folder
// for example, serving static js files as items.js
app.use(express.static('app'));

// import item routes from itemRoutes.js
var routes = require('./BE/itemRoutes.js');
app.use('/', routes);

// start listening to requests on the specified port
app.listen(port);
console.log('Server is running on port: ' + port);
