"use strict";

var Todo = require('./todo');

module.export = function (io) {
  io.sockets.on('connection', function (socket) {

    // add todo
    socket.on('AddTodoAction', function (request, callback) {
      var todo = new Todo(request.todo);

      todo.save(function (err) {
        if (!err) {
          socket.broadcast.emit("AddTodoAction:broadcast", {
            todo: todo
          });
        }

        callback({
          todo: todo
        });
      });
    });

    // get all todos
    socket.on('getAllTodos', function () {
      Todo.find().exec(function (err, todos) {
        socket.emit('getAllTodos:result', {
          err: err,
          data: todos
        });
      });
    });


    socket.on('getTodo', function (request) {
      Todo.findById({
        _id: request.id
      }, function (err, todo) {
        socket.emit('getTodo:result', {
          err: err,
          todo: todo
        });
      });
    });


    // updates
    socket.on('updateTodo', function (request) {
      Todo.findOneAndUpdate({
        _id: request.todo.id
      }, request.todo, {
        'new': true,
        upsert: true
      }, function (err, updatedTodo) {

        // back to sender
        socket.emit('updateTodo:result', {
          err: err,
          todo: updatedTodo
        });

        // notify everyone but sender
        socket.broadcast.emit("updateTodo:notify", {
          todo: updatedTodo
        });
      });
    });

    // complete todo

    socket.on('completeTodo', function (request) {
      Todo.findOneAndUpdate({
        _id: request.todo.id
      }, {
        $set: {
          completed: true
        }
      }, {
        'new': true,
        upsert: false
      }, function (err, updatedTodo) {

        socket.emit('completeTodo:result', {
          err: err,
          todo: updatedTodo
        });

        if (!err) {
          socket.broadcast.emit("completeTodo:notify", {
            todo: updatedTodo
          });
        }
      });
    });

    // uncomplete todo
    socket.on('uncompleteTodo', function (request) {
      Todo.findOneAndUpdate({
        _id: request.todo.id
      }, {
        $set: {
          completed: false
        }
      }, {
        'new': true,
        upsert: false
      }, function (err, updatedTodo) {

        socket.emit('uncompleteTodo:result', {
          err: err,
          todo: updatedTodo
        });

        if (!err) {
          socket.broadcast.emit("uncompleteTodo:notify", {
            todo: updatedTodo
          });
        }
      });
    });



    // remove todo
    socket.on('removeTodo', function (request) {
      Todo.remove({_id: request.id}, function (err) {
        socket.emit("removeTodo:result", {
          err: err,
          id: req.params.id
        });

        if (!err) {
          socket.broadcast.emit('removeTodo:notify', {
            id: request.id
          });
        }
      });
    });
  });
};


