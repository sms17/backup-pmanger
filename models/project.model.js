var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/user.model');

var ProjectSchema = new mongoose.Schema({
  project: {type: String, required: true, unique: true, dropDups: true},
  start_date : {type: Date},
  end_date: {type: Date},
  priority : {type: Number, required: true},
  manager :{ type: mongoose.Schema.Types.ObjectId,ref: 'User'}
  });

  module.exports = mongoose.model('Project', ProjectSchema);