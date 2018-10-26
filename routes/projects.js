var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Project = require('../models/project.model');

/* GET ALL Project */
router.get('/projectList', function(req, res, next) {
  Project.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET PROJECT BY ID*/
router.route('/getProject/:id').get(function (req, res) {
    let id = req.params.id;
    Project.findById(id, function (err, post){
        if (err) return next(err);
        res.json(post);
    });
  });
  
  /* SORT PROJECT */
  router.route('/sortProject/:id').get(function (req, res) {
    let id = req.params.id;
    Project.find().sort(id).find(function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
  });

/* SAVE Project */
router.post('/saveProject', function(req, res, next) {
  Project.create(req.body, function (err, resutLists) {
    if(err){
      console.log(err);
    }
    else {
      res.json(resutLists);
    }
  });
});



/* UPDATE Project */
router.put('/updateProject/:id', function(req, res, next) {
  Project.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Project */
router.delete('/deleteProject/:id', function(req, res, next) {
  Project.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
