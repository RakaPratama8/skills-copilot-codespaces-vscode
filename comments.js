// Create web server
// Load Express module
const express = require('express');
const app = express();
// Load body-parser module
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
// Load mongoose module
const mongoose = require('mongoose');
// Connect to MongoDB
mongoose.connect('mongodb://localhost/comment');
// Create schema
const commentSchema = new mongoose.Schema({
  name: String,
  comment: String
});
// Create model
const Comment = mongoose.model('Comment', commentSchema);
// Set view engine
app.set('view engine', 'ejs');
// Set public directory
app.use(express.static('public'));
// Listen to port 3000
app.listen(3000, function() {
  console.log('Server started');
});
// GET request
app.get('/', function(req, res) {
  Comment.find({}, function(err, comments) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {comments: comments});
    }
  });
});
// POST request
app.post('/', function(req, res) {
  const comment = new Comment({
    name: req.body.name,
    comment: req.body.comment
  });
  comment.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});
// DELETE request
app.delete('/:id', function(req, res) {
  Comment.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});
// PUT request
app.put('/:id', function(req, res) {
  Comment.findByIdAndUpdate(req.params.id, {name: req.body.name, comment: req.body.comment}, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});
// Load method-override module
const methodOverride = require('method-override');
app.use(methodOverride('_method'));