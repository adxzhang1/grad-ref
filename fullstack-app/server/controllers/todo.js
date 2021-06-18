const { TodoModel } = require('../models');

const todoController = {};

// get all todos for a user
todoController.get = (req, res, next) => {
  // were expecting userId on res.locals
  const userId = res.locals.userId;

  return TodoModel.find({ user: userId })
    .then((todos) => {
      // store the todos on res.locals so other middleware have access to it
      res.locals.todos = todos;

      // go to next middleware
      return next();
    })
    .catch((err) => {
      // catch all other errors
      // console.log(err);

      next({
        message: 'failed getting todos',
        statusCode: 500,
      });
    });
};

// create a todo
todoController.create = (req, res, next) => {
  // were expecting userId on res.locals
  const userId = res.locals.userId;

  // create the todo
  return TodoModel.create({
    ...req.body,
    // todo needs the user who created it
    user: userId,
  })
    .then((todo) => {
      // store the todo on res.locals so other middleware have access to it
      res.locals.todo = todo;

      // go to next middleware
      return next();
    })
    .catch((err) => {
      // catch all other errors
      console.log(err);

      next({
        message: 'failed creating a todo',
        statusCode: 500,
      });
    });
};

// update a todo
todoController.update = (req, res, next) => {
  // were expecting id on url ex. /todos/:todoId
  const todoId = req.params.todoId;

  // update the todo
  return TodoModel.findOneAndUpdate(
    {
      _id: todoId,
    },
    // new data to update the todo with
    {
      ...req.body,
    },
    // options, we want the updated todo
    { returnNewDocument: true }
  )
    .then((todo) => {
      // store the updated todo on res.locals so other middleware have access to it
      res.locals.todo = todo;

      // go to next middleware
      return next();
    })
    .catch((err) => {
      // catch all other errors
      console.log(err);

      next({
        message: 'failed updating a todo',
        statusCode: 500,
      });
    });
};

// delete a todo
todoController.delete = (req, res, next) => {
  // were expecting id on url ex. /todos/:todoId
  const todoId = req.params.todoId;

  // delete the todo
  return TodoModel.deleteOne({
    _id: todoId,
  })
    .then(() => {
      // go to next middleware
      return next();
    })
    .catch((err) => {
      // catch all other errors
      console.log(err);

      next({
        message: 'failed updating a todo',
        statusCode: 500,
      });
    });
};

module.exports = {
  todoController,
};
