"use strict";

var express = require("express")
  , bodyParser = require('body-parser')
  , cors = require('cors'),
  mongoose = require('mongoose');

var app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://localhost/simple-react-starter");

var Customer = mongoose.model('Customer', {
  firstName: String,
  middleNames: String,
  lastName: String
});


app.get('/api/customers', function(req, res) {
  Customer.find().exec(function (err, customers) {
    if(err) {
      res.status(500).send({
        err: err
      });
    } else {
      res.json(customers);
    }
  });
});

app.post('/api/customer', function (req, res) {
  var customer = new Customer(req.body);
  console.log(req.body);

  customer.save(function (err) {
    if (err) {
      res.status(500).send({
        err: err
      });
    } else {
      res.json(customer);
    }
  });
});

app.delete('/api/customer/:id', function (req, res) {
  Customer.remove({_id: req.params.id}, function (err){
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

app.put('/api/customer/:id', function (req, res) {

});

app.get('/api/customer/:id', function (req, res) {
  Customer.findById(req.params.id, function(err, customer) {
    if (err) {
      res.status(500).send({
        err: err
      });
    } else {
      res.json(customer);
    }
  })
});

app.listen(3000, function () {
  console.log("Server listening on port 3000...");
});