// import mongoose from 'mongoose';
var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
  createdAt:{
    type: Date,
    default: Date.now
  },
  fullName: String,
  todoText: String,
  
});

var todo = module.exports = mongoose.model('Todo', todoSchema);
// export default mongoose.model('Todo', Schema);