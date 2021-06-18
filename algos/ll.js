class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// delete single
const deleteNode = (node, value) => {
  if (!node) {
    return;
  }

  // create dummy
  let dummy = new Node();
  dummy.next = node;

  let curr = dummy;
  while (curr.next) {
    if (curr.next.value === value) {
      // remove next node if matches
      curr.next = curr.next.next;
      return dummy.next;
    }
    curr = curr.next;
  }

  return dummy.next;
};

// delete all
const deleteNodes = (node, value) => {
  if (!node) {
    return;
  }

  // create dummy
  let dummy = new Node();
  dummy.next = node;

  let curr = dummy;
  while (curr.next) {
    if (curr.next.value === value) {
      // remove next node if matches
      curr.next = curr.next.next;
    } else {
      // else move forward
      curr = curr.next;
    }
  }

  return dummy.next;
};
