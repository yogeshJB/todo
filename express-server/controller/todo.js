var  mongoose = require('mongoose');
var Todo = require ('../models/todo');

var getTodos = (req, res) => {
  const { limit = 10, skip = 0, page = 1 } = req.query;
  Todo.find()
    .sort({ createdAt: -1 })
    .skip(parseInt(limit) * ((parseInt(page)) -1))
    .limit(parseInt(limit))
    .exec((err, todos) => {
      if (err) {
        return res.json({
          'success': false,
          'message': 'Some Error'
        });
      }
      var totalCount  = 0;
      Todo.find().count()
      .exec((err, count) => {
        if(!err) {
          totalCount = count
        }
        console.log(count);
        return res.json({
          'success': true,
          'message': 'Todos fetched successfully',
          'count' : totalCount,
          'currentPage' : (parseInt(page)),
          todos
        });
      });
      
  });
}

var addTodo = (req, res) => {
  const newTodo = new Todo(req.body);
  console.log(req.body);
  newTodo.save((err, todo) => {
    if (err) {
      return res.json({
        'success': false,
        'message': 'Some Error'
      });
    }
    return res.json({
      'success': true,
      'message': 'Todo added successfully',
      todo
    });
  })
}

var updateTodo = (req, res) => {
  Todo.findOneAndUpdate({
    _id: req.body.id
  }, req.body, {
    new: true
  }, (err, todo) => {
    if (err) {
      return res.json({
        'success': false,
        'message': 'Some Error',
        'error': err
      });
    }
    console.log(todo);
    return res.json({
      'success': true,
      'message': 'Updated successfully',
      todo
    });
  })
}
var getTodo = (req, res) => {
  Todo.find({
    _id: req.params.id
  }).exec((err, todo) => {
    if (err) {
      return res.json({
        'success': false,
        'message': 'Some Error'
      });
    }
    if (todo.length) {
      return res.json({
        'success': true,
        'message': 'Todo fetched by id successfully',
        todo
      });
    } else {
      return res.json({
        'success': false,
        'message': 'Todo with the given id not found'
      });
    }
  })
}
var deleteTodo = (req, res) => {
  Todo.findByIdAndRemove(req.params.id, (err, todo) => {
    if (err) {
      return res.json({
        'success': false,
        'message': 'Some Error'
      });
    }
    return res.json({
      'success': true,
      'message': todo.todoText + ' deleted successfully'
    });
  })
}

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  getTodo,
  deleteTodo
}