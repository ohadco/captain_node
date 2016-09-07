// configure express so we will be able to add the item routes
var express = require('express');
var router = express.Router();
// import the item model
var itemModel = require('./itemModel.js')

// GET for the main page (List all items + add + remove)
router.get('/', function(req, res){
  // returns all of the items in the DB - without query
  // on success @renders the index page
  // on failure @returns error 500
  itemModel.find().then(function(items) {
      res.render('items/index.ejs', { 'items' : items });
    }, function(err) {
      // [TODO] - remove the error details on production
      res.status(500).send({err: err})
  });
});

// GET request for a specific item (show)
router.get('/items/:item_id', function(req, res){
  itemModel.find({_id: req.params.item_id}).then(
    function(item) {
      //find returns an array - need to return the first element
      res.render('items/show.ejs', { 'item' : item[0] });
    }, function(err) {
      // On error @returns 400 (Bad request) response
      res.status(400).send();
  });
});

// POST an item - add an item
router.post('/items/create', function(req,res){
  // using bodyParser to get the title
  title = req.body.title;
  // check that title is present - otherwise returns 422 Unprocessable Entity response
  if (!title || title == "") res.status(422);
  var newItem = new itemModel({
    title: req.body.title
  });
  // returns "items/show.ejs" partial as html - (prepend it to the items div in items.js)
  newItem.save().then(function(item){
    res.render('items/show.ejs', { 'item' : item });
  }, function(err){
    res.status(500).send();
  });
});

// DELETE an item (by id)
router.delete('/items', function(req,res){
  itemModel.findOne({_id: req.body.item_id}).remove().then(function(item){
    res.send(item);
  }, function(err){
    res.status(500).send({err: err, msg: err});
  });
});

// export the new configured item routes
module.exports = router;
