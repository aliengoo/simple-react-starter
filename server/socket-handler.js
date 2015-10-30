"use strict";

var Todo = require('./todo');

module.exports = function init(io) {

  io.on('error', function (err) {
    console.log(err);
  });

  io.sockets.on('connection', function (socket) {
    console.log("connected:" + socket.id);

    // add todo
    socket.on('AddTodoAction', function (request, callback) {
      console.log("AddTodoAction", request);
      var todo = new Todo(request.data);

      todo.save(function (err) {
        if (!err) {
          socket.broadcast.emit("AddTodoAction:broadcast", {
            data: todo
          });
        }

        callback({
          data: todo
        });
      });
    });

    // get all todos
    socket.on('GetAllTodosAction', function (request, callback) {
      console.log("GetAllTodosAction", request);
      Todo.find().exec(function (err, todos) {
        console.log(todos);
        callback({
          err: err,
          data: todos
        });
      });
    });


    socket.on('GetTodoAction', function (request, callback) {
      console.log("GetTodoAction", request);
      Todo.findById({
        _id: request.data.id
      }, function (err, todo) {
        callback({
          err: err,
          data: todo
        });
      });
    });


    // updates
    socket.on('UpdateTodoCommitAction', function (request, callback) {
      console.log("UpdateTodoCommitAction", request);

      Todo.findOneAndUpdate({
        _id: request.data._id
      }, request.data, {
        'new': true,
        upsert: true
      }, function (err, updatedTodo) {
        if (!err) {
          socket.broadcast.emit("UpdateTodoCommitAction:broadcast", {
            data: updatedTodo
          });
        }
        callback({
          err: err,
          data: updatedTodo
        });
      });
    });

    // complete todo

    socket.on('CompleteTodoAction', function (request, callback) {
      console.log("CompleteTodoAction", request);
      Todo.findOneAndUpdate({
        _id: request.data
      }, {
        $set: {
          completed: true
        }
      }, {
        'new': true,
        upsert: false
      }, function (err, updatedTodo) {

        console.log("CompleteTodoAction");

        callback({
          err: err,
          data: updatedTodo
        });

        if (!err) {
          socket.broadcast.emit("CompleteTodoAction:broadcast", {
            data: updatedTodo
          });
        }
      });
    });

    // uncomplete todo
    socket.on('UncompleteTodoAction', function (request, callback) {
      console.log("UncompleteTodoAction", request);
      Todo.findOneAndUpdate({
        _id: request.data
      }, {
        $set: {
          completed: false
        }
      }, {
        'new': true,
        upsert: false
      }, function (err, updatedTodo) {

        callback({
          err: err,
          data: updatedTodo
        });

        if (!err) {
          socket.broadcast.emit("UncompleteTodoAction:broadcast", {
            data: updatedTodo
          });
        }
      });
    });


    // remove todo
    socket.on('RemoveTodoAction', function (request, callback) {
      console.log("RemoveTodoAction", request);
      Todo.remove({_id: request.data}, function (err) {
        callback({
          err: err,
          data: request.data
        });

        if (!err) {
          socket.broadcast.emit('RemoveTodoAction:broadcast', {
            data: request.data
          });
        }
      });
    });
  });
};


