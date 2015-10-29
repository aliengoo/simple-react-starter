"use strict";

var express = require("express")
  , bodyParser = require('body-parser')
  , cors = require('cors'),
  mongoose = require('mongoose'),
  delay = require('express-delay');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

//app.use(delay(1000));
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

function resultCallback(httpResponse) {
   return function(err, data) {
     if (err) {
       httpResponse.status(500).send({
         err: err
       });
     } else {
       httpResponse.json(data);
     }
   }
}

app.get('/api/todos', function (req, res) {
  Todo.find().exec(resultCallback(res));
});

app.put('/api/todo/:id', function (req, res) {
  Todo.findOneAndUpdate({
    _id: req.params.id
  }, req.body, {
    'new': true,
    upsert: true
  }, function(err, updatedTodo){
    io.emit("todoUpdated", {
      sessionId: req.header("ws-session-id"),
      todo: updatedTodo
    });
    resultCallback(res)(err, updatedTodo);
  });
});

app.put('/api/todo/complete/:id', function (req, res) {

  Todo.findOneAndUpdate({
    _id: req.params.id
  }, {
    $set: {
      completed: true
    }
  }, {
    'new': true,
    upsert: false
  }, function(err, updatedTodo){
    io.emit("todoUpdated", {
      sessionId: req.header("ws-session-id"),
      todo: updatedTodo
    });
    resultCallback(res)(err, updatedTodo);
  });
});

app.put('/api/todo/uncomplete/:id', function (req, res) {

  Todo.findOneAndUpdate({
    _id: req.params.id
  }, {
    $set: {
      completed: false
    }
  }, {
    'new': true,
    upsert: false
  }, function(err, updatedTodo){
    io.emit("todoUpdated", {
      sessionId: req.header("ws-session-id"),
      todo: updatedTodo
    });
    resultCallback(res)(err, updatedTodo);
  });
});


app.post('/api/todo', function (req, res) {
  var todo = new Todo(req.body);

  todo.save(function (err) {
    if (err) {
      res.status(500).send({
        err: err
      });
    } else {
      io.emit("todoAdded", {
        sessionId: req.header("ws-session-id"),
        todo: todo
      });
      res.json(todo);
    }
  });
});

app.delete('/api/todo/:id', function (req, res) {
  Todo.remove({_id: req.params.id}, function (err) {
    if (err) {
      res.status(500).send({
        err: err
      });
    } else {
      io.emit("todoDeleted", {
        sessionId: req.header("ws-session-id"),
        id: req.params.id
      });
      res.status(200).send({
        status: "deleted"
      });
    }
  });

});


app.get('/api/todo/:id', function (req, res) {
  Todo.findById(req.params.id, function (err, todo) {
    if (err) {
      res.status(500).send({
        err: err
      });
    } else {
      res.json(todo);
    }
  })
});


io.on('connection', function (socket) {
  console.log("New client connected");
});

server.listen(3000, function () {
  console.log("Server listening on port 3000...");
});
