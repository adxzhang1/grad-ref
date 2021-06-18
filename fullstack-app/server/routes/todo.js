const { Router } = require('express');
const { userController, todoController } = require('../controllers');

const router = Router();

// only allow logged in users to perform actions with the todos
router.use(userController.verify);

// get a user's todos
router.get('/', todoController.get, (req, res) => {
  res.status(200).json({
    todos: res.locals.todos,
  });
});

// create a new todo
router.post('/', todoController.create, (req, res) => {
  res.status(200).json({
    todo: res.locals.todo,
  });
});

// update a specific todo
router.patch('/:todoId', todoController.update, (req, res) => {
  res.status(200).json({
    todo: res.locals.todo,
  });
});

// delete a specific todo
router.delete('/:todoId', todoController.delete, (req, res) => {
  res.status(200).json({});
});

module.exports = {
  todoRouter: router,
};
