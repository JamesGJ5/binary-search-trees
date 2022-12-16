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

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  find(value) {
    // Don't need to do recursive solution which checks every node in tree 
    // because of the nature of a correctly-formed BST
    let node = this.root;
    while (node !== null && node.value !== value) {
      if (node.value > value) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    return node;
  }

  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }
    let node = this.root;
    while (node.value !== value) {
      if (node.value > value) {
        if (node.left === null) {
          node.left = new Node(value);
        }
        node = node.left;
      } else {
        if (node.right === null) {
          node.right = new Node(value);
        }
        node = node.right;
      }
    }
  }

  levelOrder(callback) {
    const queue = (this.root !== null) ? new Deque([this.root]) : new Deque([]);
    const breadthFirstTraversal = [];
    while (queue.length > 0) {
      const node = queue.shift();
      if (callback) {
        callback(node.value);
      } else {
        breadthFirstTraversal.push(node.value);
      }
      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
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
      const node = stack.pop();
      if (callback) {
        callback(node.value);
      } else {
        preorderTraversal.push(node.value);
      }
      if (node.right !== null) {
        stack.push(node.right);
      }
      if (node.left !== null) {
        stack.push(node.left);
      }
    }
    if (!callback) {
      return preorderTraversal;
    }
  }
}
