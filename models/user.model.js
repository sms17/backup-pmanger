var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    first_name: {type: String, required: true, unique: true, dropDups: true},
    last_name: {type: String, required: true, unique: true, dropDups: true},
    employee_id: {type: String, required: true, unique: true, dropDups: true}
  });

  module.exports = mongoose.model('User', UserSchema);