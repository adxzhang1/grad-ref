import { TodoClient } from './TodoClient.js';
import { Auth } from './Auth.js';
import { TodoApp } from './TodoApp.js';

// wait for document to load
document.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('#root');

  // create the client, handles talking with server
  const client = new TodoClient();

  // add the auth dom elements and functionality
  const auth = new Auth(client);
  el.appendChild(auth.el);

  // add the todo dom elements and functionality
  const app = new TodoApp(client);
  el.appendChild(app.el);
});
