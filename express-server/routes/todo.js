var express = require('express');
var todoController = require('../controller/todo');

var router = express.Router();

router.route('/')
     .get(todoController.getTodos)
     .post(todoController.addTodo)
     .put(todoController.updateTodo);

router.route('/:id')
      .get(todoController.getTodo)
      .delete(todoController.deleteTodo);

module.exports = router;