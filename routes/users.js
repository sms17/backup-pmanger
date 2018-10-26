var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.model');



// Defined get data(index or listing) route
router.route('/userList').get(function (req, res) {
  User.find(function (err, resutLists){
    if(err){
      console.log(err);
    }
    else {
      res.json(resutLists);
    }
});
});

/* SAVE User */
router.post('/saveUser', function(req, res, next) {
  User.create(req.body, function (err, resutLists) {
    if(err){
      console.log(err);
    }
    else {
      res.json(resutLists);
    }
  });
});



router.route('/getUser/:id').get(function (req, res) {
  let id = req.params.id;
  User.findById(id, function (err, resutLists){
    
    if(err){
      console.log(err);
    }
    else {
      res.json(resutLists);
    }
  });
});

router.route('/sortUser/:id').get(function (req, res) {
  let id = req.params.id;
  User.find().sort(id).find(function (err, resutLists) {
    if(err){
      console.log(err);
    }
    else {
      res.json(resutLists);
    }
  });
});

/* UPDATE User */
router.put('/updateUser/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, resutLists) {
    if(err){
      console.log(err);
    }
    else {
      res.json(resutLists);
    }
  });
});

/* DELETE User */
router.delete('/deleteUser/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, resutLists) {
    if(err){
      console.log(err);
    }
    else {
      res.json(resutLists);
    }
  });
});

/*
router.get('/', function(req, res, next) {
  res.send('Express RESTful API --0');
});
*/

module.exports = router;