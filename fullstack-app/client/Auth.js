// auth elements
export class Auth {
  constructor(client) {
    this.client = client; // TodoClient

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

    // create email input element
    this.emailEl = document.createElement('input');
    this.emailEl.placeholder = 'email';
    this.containerEl.appendChild(this.emailEl);

    // create password input element
    this.passwordEl = document.createElement('input');
    this.passwordEl.placeholder = 'password';
    this.containerEl.appendChild(this.passwordEl);

    // create login button element
    this.loginBtn = document.createElement('button');
    this.loginBtn.innerText = 'login';
    this.loginBtn.addEventListener('click', this.onClickLogin);
    this.containerEl.appendChild(this.loginBtn);

    // create sign up button element
    this.signUpBtn = document.createElement('button');
    this.signUpBtn.innerText = 'sign up';
    this.signUpBtn.addEventListener('click', this.onClickSignUp);
    this.containerEl.appendChild(this.signUpBtn);

    // create logout button element
    this.logoutBtn = document.createElement('button');
    this.logoutBtn.innerText = 'logout';
    this.logoutBtn.addEventListener('click', this.onClickLogout);
    this.containerEl.appendChild(this.logoutBtn);

    // create status element
    this.statusEl = document.createElement('p');
    this.statusEl.innerText = 'status: unknown';
    this.containerEl.appendChild(this.statusEl);
  }

  // bind methods
  bind() {
    this.onClickLogin = this.onClickLogin.bind(this);
    this.onClickSignUp = this.onClickSignUp.bind(this);
    this.onClickLogout = this.onClickLogout.bind(this);
  }

  // when user clicks login
  onClickLogin() {
    const email = this.emailEl.value;
    const password = this.passwordEl.value;
    return this.client
      .login(email, password)
      .then(() => {
        this.statusEl.innerText = 'status: logged in';
      })
      .catch((err) => alert(err.message));
  }

  // when user clicks login
  onClickSignUp() {
    const email = this.emailEl.value;
    const password = this.passwordEl.value;
    return this.client
      .signup(email, password)
      .then(() => {
        this.statusEl.innerText = 'status: logged in';
      })
      .catch((err) => alert(err.message));
  }

  // when user clicks login
  onClickLogout() {
    return this.client
      .logout()
      .then(() => {
        this.statusEl.innerText = 'status: logged out';
      })
      .catch((err) => alert(err.message));
  }
}
