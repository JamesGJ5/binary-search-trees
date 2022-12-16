import Node from './node_class';
import Deque from '../../node_modules/collections/deque';

export default class Tree {
  constructor(arr) {
    Tree.#prepareArray(arr);
    this.root = this.#buildTree(arr, 0, arr.length - 1);
  }

  #buildTree(arr, start, end) {
    // arr must be sorted
    if (start > end) {
      return null;
    }
    const mid = parseInt((start + end) / 2, 10);
    const root = new Node(arr[mid]);
    root.left = this.#buildTree(arr, start, mid - 1);
    root.right = this.#buildTree(arr, mid + 1, end);
    return root;
  }

  static #prepareArray(arr) {
    Tree.#removeDuplicates(arr);
    // arr must contain values that permit the below
    arr.sort((a, b) => a - b);
  }

  static #removeDuplicates(arr) {
    // TODO: consider splitting the below into two methods
    const dataUnrepeated = new Set();
    while (arr.length > 0) {
      dataUnrepeated.add(arr.pop());
    }
    dataUnrepeated.forEach((data) => {
      dataUnrepeated.delete(data);
      arr.push(data);
    });
  }

  prettyPrint(curr = this.root, prefix = '', isLeft = true) {
    if (curr.right !== null) {
      this.prettyPrint(curr.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${curr.value}`);
    if (curr.left !== null) {
      this.prettyPrint(curr.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  find(value) {
    // Don't need to do recursive solution which checks every curr in tree 
    // because of the nature of a correctly-formed BST
    let curr = this.root;
    while (curr !== null && curr.value !== value) {
      if (curr.value > value) {
        curr = curr.left;
      } else {
        curr = curr.right;
      }
    }
    return curr;
  }

  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }
    let curr = this.root;
    while (curr.value !== value) {
      if (curr.value > value) {
        if (curr.left === null) {
          curr.left = new Node(value);
        }
        curr = curr.left;
      } else {
        if (curr.right === null) {
          curr.right = new Node(value);
        }
        curr = curr.right;
      }
    }
  }

  levelOrder(callback) {
    const queue = (this.root !== null) ? new Deque([this.root]) : new Deque([]);
    const breadthFirstTraversal = [];
    while (queue.length > 0) {
      const curr = queue.shift();
      if (callback) {
        callback(curr.value);
      } else {
        breadthFirstTraversal.push(curr.value);
      }
      if (curr.left !== null) {
        queue.push(curr.left);
      }
      if (curr.right !== null) {
        queue.push(curr.right);
      }
    }
    if (!callback) {
      return breadthFirstTraversal;
    }
  }

  preorder(callback) {
    const stack = (this.root !== null) ? [this.root] : [];
    const preorderTraversal = [];
    while (stack.length > 0) {
      const curr = stack.pop();
      if (callback) {
        callback(curr.value);
      } else {
        preorderTraversal.push(curr.value);
      }
      if (curr.right !== null) {
        stack.push(curr.right);
      }
      if (curr.left !== null) {
        stack.push(curr.left);
      }
    }
    if (!callback) {
      return preorderTraversal;
    }
  }

  inorder(callback) {
    const stack = [];
    const inorderTraversal = [];
    let curr = this.root;
    while (curr !== null || stack.length > 0) {
      while (curr !== null) {
        stack.push(curr);
        curr = curr.left;
      }
      curr = stack.pop();
      if (callback) {
        callback(curr.value);
      } else {
        inorderTraversal.push(curr.value);
      }
      curr = curr.right;
    }
    if (!callback) {
      return inorderTraversal;
    }
  }
}
