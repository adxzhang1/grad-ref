// single todo item
export class TodoItem {
  constructor(id, name, isComplete, onCheck, onDelete) {
    this.id = id;
    this.name = name;
    this.isComplete = isComplete; // for checkbox
    this.onCheck = onCheck; // when user clicks check
    this.onDelete = onDelete; // when user clicks delete

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
    this.containerEl.classList.add('todo-item');

    // create checkbox element
    this.isCompleteEl = document.createElement('input');
    this.isCompleteEl.setAttribute('type', 'checkbox');
    this.isCompleteEl.checked = this.isComplete;
    this.isCompleteEl.addEventListener('change', this.onToggleIsComplete);
    this.containerEl.appendChild(this.isCompleteEl);

    // create name element
    this.nameEl = document.createElement('p');
    this.nameEl.classList.add('todo-item-name');
    this.nameEl.innerText = this.name;
    this.containerEl.appendChild(this.nameEl);

    // create the delete button element
    this.deleteBtn = document.createElement('button');
    this.deleteBtn.innerText = 'delete';
    this.deleteBtn.addEventListener('click', this.onClickDelete);
    this.containerEl.appendChild(this.deleteBtn);
  }

  // bind methods
  bind() {
    this.onToggleIsComplete = this.onToggleIsComplete.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  // update the name and checkbox elements
  update(name, isComplete) {
    this.nameEl.innerText = name;
    this.isCompleteEl.checked = isComplete;
  }

  // when the user clicks on the checkbox
  onToggleIsComplete(event) {
    // update isComplete
    this.isComplete = event.target.checked;
    this.isCompleteEl.checked = this.isComplete;
    // call callback
    this.onCheck(this.isComplete);
  }

  // when user clicks delete button
  onClickDelete() {
    this.onDelete();
  }
}
