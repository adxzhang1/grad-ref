function Stack() {
  this.stack = {};
  this.length = 0;
}

Stack.prototype.push = function (val) {
  this.stack[this.length] = val;
  this.length += 1;
};

Stack.prototype.pop = function () {
  if (this.length === 0) {
    return;
  }

  const val = this.stack[this.length - 1];
  delete this.stack[this.length - 1];
  this.length -= 1;
  return val;
};

function Queue() {
  this.stack1 = new Stack();
  this.stack2 = new Stack();
}

Queue.prototype.enqueue = function (val) {
  this.stack1.push(val);
};

Queue.prototype.dequeue = function () {
  if (!this.stack2.length) {
    while (this.stack1.length) {
      this.stack2.push(this.stack1.pop());
    }
  }
  return this.stack2.pop();
};

module.exports = { Stack, Queue };
