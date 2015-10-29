"use strict";

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/simple-react-starter");

var Todo = mongoose.model('Todo', {
  text: String,
  completed: {
    type: Boolean,
    "default": false
  }
});

module.exports = Todo;