// handles talking with the server
export class TodoClient {
  // --- auth ---
  // login
  login(email, password) {
    return fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => {
      if (res.status !== 200) {
        return res.json().then((data) => Promise.reject(data));
      }
      return res.json();
    });
  }

  // sign up
  signup(email, password) {
    return fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => {
      if (res.status !== 200) {
        return res.json().then((data) => Promise.reject(data));
      }
      return res.json();
    });
  }

  // logout
  logout() {
    return fetch('/auth/logout', { method: 'POST' }).then((res) => {
      if (res.status !== 200) {
        return res.json().then((data) => Promise.reject(data));
      }
      return res.json();
    });
  }

  // --- todos ---
  // get
  getTodos() {
    return fetch('/todos').then((res) => {
      if (res.status !== 200) {
        return res.json().then((data) => Promise.reject(data));
      }
      return res.json();
    });
  }

  // create todo
  createTodo(name) {
    return fetch('/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
      }),
    }).then((res) => {
      if (res.status !== 200) {
        return res.json().then((data) => Promise.reject(data));
      }
      return res.json();
    });
  }

  // update todo
  updateTodo(todoId, name, isComplete) {
    return fetch(`/todos/${todoId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        isComplete,
      }),
    }).then((res) => {
      if (res.status !== 200) {
        return res.json().then((data) => Promise.reject(data));
      }
      return res.json();
    });
  }

  // delete todo
  deleteTodo(todoId) {
    return fetch(`/todos/${todoId}`, { method: 'DELETE' }).then((res) => {
      if (res.status !== 200) {
        return res.json().then((data) => Promise.reject(data));
      }
      return res.json();
    });
  }
}
