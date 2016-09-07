// [TODO] - add environment variable reference for server_name and db_name
var serverName = 'localhost';
var dbName = 'captain_node';

// using mongoose as a db conector
var mongoose = require('mongoose');

// connect to the mongo database using mongoose
mongoose.connect(`mongodb://${serverName}/${dbName}`);
console.log(`Mongoose successful connection to ${dbName} db on ${serverName}`);

// configure the item Model schema using mongoose
var itemSchema = new mongoose.Schema({
  title: String
});

// configuring the item model using the schema
// export the item model
var itemModel = mongoose.model('Item', itemSchema);
module.exports = mongoose.model('Item', itemModel);
