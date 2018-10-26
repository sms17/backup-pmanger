const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose');


//Adding NodeJS routing...
const usersRouter = require('./routes/users');
const projectRouter = require('./routes/projects');
const taskRouter = require('./routes/tasks');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/pmdb').then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/users', usersRouter);
app.use('/projects', projectRouter);
app.use('/tasks', taskRouter);

const port = process.env.PORT || 4000;

const server = app.listen(port, function(){
console.log('Listening on port ' + port);
});


module.exports = app;


