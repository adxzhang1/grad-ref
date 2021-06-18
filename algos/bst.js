class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// in order traversal = left -> center -> right
const inorder = (node, callback) => {
  if (node) {
    inorder(node.left, callback);
    callback(node.value);
    inorder(node.right, callback);
  }
};

// preorder = center -> left -> right
const preorder = (node, callback) => {
  if (node) {
    callback(node.value);
    preorder(node.left, callback);
    preorder(node.right, callback);
  }
};

// postorder = left -> right -> center
const postorder = (node, callback) => {
  if (node) {
    postorder(node.left, callback);
    postorder(node.right, callback);
    callback(node.value);
  }
};

// breadth first
const bfs = (node, callback) => {
  if (!node) {
    return;
  }

  const queue = [node];
  while (queue.length > 0) {
    const node = queue.shift();
    callback(node.value);
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
  }
};
