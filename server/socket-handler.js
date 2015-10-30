"use strict";

var Todo = require('./todo');

module.export = function (io) {
  io.sockets.on('connection', function (socket) {

    // add todo
    socket.on('AddTodoAction', function (request, callback) {
      var todo = new Todo(request.data.todo);

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
      Todo.find().exec(function (err, todos) {
        callback({
          err: err,
          data: todos
        });
      });
    });


    socket.on('GetTodoAction', function (request, callback) {
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
          data: updateTodo
        });
      });
    });

    // complete todo

    socket.on('CompleteTodoAction', function (request, callback) {
      Todo.findOneAndUpdate({
        _id: request.data.id
      }, {
        $set: {
          completed: true
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
          socket.broadcast.emit("CompleteTodoAction:broadcast", {
            data: updatedTodo
          });
        }
      });
    });

    // uncomplete todo
    socket.on('UncompleteTodoAction', function (request, callback) {
      Todo.findOneAndUpdate({
        _id: request.data.id
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
      Todo.remove({_id: request.data.id}, function (err) {
        callback({
          err: err,
          data: request.id
        });

        if (!err) {
          socket.broadcast.emit('RemoveTodoAction:broadcast', {
            data: request.id
          });
        }
      });
    });
  });
};


