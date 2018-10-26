var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Task = require('../models/task.model');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/* SAVE Project */
router.post('/saveTask', function(req, res, next) {
  Task.create(req.body, function (err, resutLists) {
    if(err){
      console.log(err);
    }
    else {
      res.json(resutLists);
    }
  });
});

router.put('/updateTask/:id', function(req, res, next) {
  Task.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/taskList', function(req, res, next) {
  Task.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});


router.route('/getTaskById/:id').get(function (req, res) {
  let id = req.params.id;
  Task.findById(id, function (err, post){
      if (err) return next(err);
      res.json(post);
  });
});

router.get('/getTaskByProject/:id', (req, res) => {
  Task.find({project:req.params.id}, (err, items) => {
    if(err){
      console.log(err);
    }
    else {
      res.status(200).json(items);
    }
 });
});

router.route('/getTaskBySortedProject/:sort/:id').get(function (req, res) {
  let sort = req.params.sort;
  let id = req.params.id;
  console.log('route sort' + sort);
  console.log('route id -' + id);
  Task.find({project:req.params.id}).sort(sort).find(function (err, post) {
      if (err) return next(err);
      res.json(post);
  });
});


module.exports = router;
