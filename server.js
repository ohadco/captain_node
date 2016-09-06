// Using express as a web server
var express = require('express');

// default port is 3000 - can be changed if needed
var port = 3000;

// configure the express application variable
var app = express();

// Serving static files from 'app' folder
app.use(express.static('app'));

// start listening to requests on the specified port
app.listen(port);
console.log('Server is running on port: ' + port)
