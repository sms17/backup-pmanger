var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/user.model');
var Project = require('../models/project.model');

var taskSchema = new mongoose.Schema({
    project :{ type: mongoose.Schema.Types.ObjectId,ref: 'Project', required: true},
    task: {type: String, required: true, unique: true, dropDups: true},
    parent_task:{type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: false},
    priority : {type: Number},
    start_date : {type: Date},
    end_date: {type: Date},
    user :{ type: mongoose.Schema.Types.ObjectId,ref: 'User', required: true}
 });

module.exports = mongoose.model('Task', taskSchema);

