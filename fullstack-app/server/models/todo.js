const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isComplete: {
    type: Boolean,
    required: true,
    default: false,
  },
  // keep track who owns the todo
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
});

const TodoModel = model('todo', todoSchema);

module.exports = {
  TodoModel,
};
