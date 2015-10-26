"use strict";

var express = require("express")
  , bodyParser = require('body-parser')
  , cors = require('cors'),
  mongoose = require('mongoose');

var app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://localhost/simple-react-starter");

var Todo = mongoose.model('Todo', {
  text: String,
  completed: {
    type: Boolean,
    "default": false
  }
});


app.get('/api/todos', function(req, res) {
  Todo.find().exec(function (err, todos) {
    if(err) {
      res.status(500).send({
        err: err
      });
    } else {
      res.json(todos);
    }
  });
});

app.put('/api/todo/complete/:id', function (req, res) {

  Todo.findById(req.params.id, function(err, todo) {
    if (err) {
      res.status(500).send({
        err: err
      });
    } else {
      todo.completed = true;

      todo.save(function (err) {
        if (err) {
          res.status(500).send({
            err: err
          });
        } else {
          res.json(todo);
        }
      });
    }
  })
});

app.post('/api/todo', function (req, res) {
  var todo = new Todo(req.body);
  console.log(req.body);

  todo.save(function (err) {
    if (err) {
      res.status(500).send({
        err: err
      });
    } else {
      res.json(todo);
    }
  });
});

app.delete('/api/todo/:id', function (req, res) {
  Todo.remove({_id: req.params.id}, function (err){
    if (err) {
      res.status(500).send({
        err: err
      });
    } else {
      res.status(200).send({
        status: "deleted"
      });
    }
  });

});


app.get('/api/todo/:id', function (req, res) {
  Todo.findById(req.params.id, function(err, todo) {
    if (err) {
      res.status(500).send({
        err: err
      });
    } else {
      res.json(todo);
    }
  })
});

app.listen(3000, function () {
  console.log("Server listening on port 3000...");
});