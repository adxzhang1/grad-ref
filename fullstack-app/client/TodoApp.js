import { TodoItem } from './TodoItem.js';

// todo elements
export class TodoApp {
  constructor(client) {
    this.client = client; // TodoClient

    this.todos = [];

    this.init();
  }

  // alias for root element
  get el() {
    return this.containerEl;
  }

  // initialize elements
  init() {
    this.bind();

    // create container element
    this.containerEl = document.createElement('div');

    // create title element
    this.titleEl = document.createElement('h3');
    this.titleEl.innerText = 'Todo';
    this.containerEl.appendChild(this.titleEl);

    // create fetch button element
    this.fetchBtn = document.createElement('button');
    this.fetchBtn.innerText = 'fetch';
    this.fetchBtn.addEventListener('click', this.fetchTodos);
    this.containerEl.appendChild(this.fetchBtn);

    // create new todo input elements
    this.newTodoContainerEl = document.createElement('div');
    this.containerEl.appendChild(this.newTodoContainerEl);
    this.newTodoInputEl = document.createElement('input');
    this.newTodoContainerEl.appendChild(this.newTodoInputEl);
    this.newTodoBtnEl = document.createElement('button');
    this.newTodoBtnEl.innerText = 'add';
    this.newTodoBtnEl.addEventListener('click', this.addNewTodo);
    this.newTodoContainerEl.appendChild(this.newTodoBtnEl);

    // create todos container element
    this.todosContainerEl = document.createElement('div');
    this.containerEl.appendChild(this.todosContainerEl);

    // DEVELOPMENT ONLY
    // this.seed();

    // try fetching the todos, only works if user is logged in
    this.fetchTodos(false);
  }

  // bind methods
  bind() {
    this.fetchTodos = this.fetchTodos.bind(this);
    this.addNewTodo = this.addNewTodo.bind(this);
    this.onRemoveTodo = this.onRemoveTodo.bind(this);
    this.onUpdateTodo = this.onUpdateTodo.bind(this);
  }

  // remove all todos
  clearTodos() {
    // remove all todos from the dom
    while (this.todos.length > 0) {
      const todo = this.todos.pop();
      this.todosContainerEl.removeChild(todo.el);
    }
  }

  // renders a new todo to the todos container
  renderTodo(todo) {
    // create a new TodoItem
    const todoItem = new TodoItem(
      todo._id,
      todo.name,
      todo.isComplete,
      (isComplete) => {
        this.onUpdateTodo(todo._id, todo.name, isComplete);
      },
      () => {
        this.onRemoveTodo(todo._id);
      }
    );
    this.todos.push(todoItem);
    // add it to the dom
    this.todosContainerEl.appendChild(todoItem.el);
    return todoItem;
  }

  // event handlers
  fetchTodos(shouldAlert = true) {
    return this.client
      .getTodos()
      .then((data) => {
        // remove todos from dom
        this.clearTodos();
        // add new todos to dom
        for (const todo of data.todos) {
          this.renderTodo(todo);
        }
      })
      .catch((err) => {
        if (!shouldAlert) {
          return;
        }
        alert(err.message);
      });
  }

  // when user clicks add a todo
  addNewTodo() {
    const name = this.newTodoInputEl.value;

    // dont continue if empty
    if (!name) {
      return;
    }

    return this.client
      .createTodo(name)
      .then((data) => {
        // add todo to dom
        this.renderTodo(data.todo);
        // set input to empty
        this.newTodoInputEl.value = '';
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  // remove a todo, passed down to TodoItem
  onRemoveTodo(todoId) {
    return this.client
      .deleteTodo(todoId)
      .then(() => {
        // remove all deleted todos
        const dirtyTodos = this.todos.filter((todo) => todo.id === todoId);
        for (const dirtyTodo of dirtyTodos) {
          this.todosContainerEl.removeChild(dirtyTodo.el);
        }
        this.todos = this.todos.filter((todo) => todo.id !== todoId);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  // update a todo, passed down to TodoItem
  onUpdateTodo(todoId, name, isComplete) {
    return this.client
      .updateTodo(todoId, name, isComplete)
      .then((data) => {
        for (const todo of this.todos) {
          // update the todo that changed
          if (todo._id === data.todo._id) {
            todo.update(data.todo.name, data.todo.isComplete);
          }
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  // seed some fake data
  seed() {
    for (let i = 0; i < 5; i++) {
      this.renderTodo(i.toString(), i % 2 === 0);
    }
  }
}
