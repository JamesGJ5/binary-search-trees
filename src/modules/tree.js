import Node from './node_class';
import Deque from '../../node_modules/collections/deque';

// TODO: replace checks for null with checks for falsey where applicable, in case 
// undefined might be passed for example
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

  prettyPrint() {
    if (this.root !== null) {
      this.#_prettyPrint();
    } else {
      console.log('This tree is empty');
    }
  }

  #_prettyPrint(curr = this.root, prefix = '', isLeft = true) {
    if (curr.right !== null) {
      this.#_prettyPrint(curr.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${curr.value}`);
    if (curr.left !== null) {
      this.#_prettyPrint(curr.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
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
        callback(curr);
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
      Tree.#_processNode(curr, callback, preorderTraversal);
      if (curr.right !== null) {
        stack.push(curr.right);
      }
      if (curr.left !== null) {
        stack.push(curr.left);
      }
    }
    return Tree.#_getTraversalIfNoCallback(callback, preorderTraversal);
  }

  static #_processNode(node, callback, traversal) {
    if (callback) {
      callback(node);
    } else {
      traversal.push(node.value);
    }
  }

  static #_getTraversalIfNoCallback(callback, traversal) {
    if (!callback) {
      return traversal;
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
      Tree.#_processNode(curr, callback, inorderTraversal);
      curr = curr.right;
    }
    return Tree.#_getTraversalIfNoCallback(callback, inorderTraversal);
  }

  postorder(callback) {
    // See Apr 02, 2016 00:57 comment by ofLucas at
    // https://leetcode.com/problems/binary-tree-postorder-traversal/solutions/45551/preorder-inorder-and-postorder-iteratively-summarization/?orderBy=most_votes
    // for this solution. I chose it instead of the original poster's solution 
    // because the original poster's solution requires the traversal be made 
    // before the callbacks can be done in the right order, because the traversal 
    // fills the traversal array in reverse, I believe.
    const stack = [];
    const postorderTraversal = [];
    let curr = this.root;
    while (curr != null || stack.length > 0) {
      while (!Tree.#isLeaf(curr)) {
        stack.push(curr);
        curr = curr.left;
      }
      if (curr !== null) {
        Tree.#_processNode(curr, callback, postorderTraversal);
      }
      while (stack.length > 0 && curr === stack[stack.length - 1].right) {
        curr = stack.pop();
        Tree.#_processNode(curr, callback, postorderTraversal);
      }
      if (stack.length === 0) {
        curr = null;
      } else {
        curr = stack[stack.length - 1].right;
      }
    }
    return Tree.#_getTraversalIfNoCallback(callback, postorderTraversal);
  }

  static #isLeaf(node) {
    if (node === null) {
      return true;
    } else {
      return node.left === null && node.right === null;
    }
  }

  static height(node) {
    // Finds the height of a node whatever tree it is in
    let maximum_height = -1;
    const queue = (node !== null) ? new Deque([node]) : new Deque([]);
    while (queue.length > 0) {
      maximum_height += 1;
      for (let i = 0; i < queue.length; i += 1) {
        const curr = queue.shift();
        if (curr.left) {
          queue.push(curr.left);
        }
        if (curr.right) {
          queue.push(curr.right);
        }
      }
    }
    return (maximum_height >= 0) ? maximum_height : null;
  }

  depth(node) {
    let res = 0;
    let curr = this.root;
    while (curr !== null && curr !== node) {
      if (curr.value > node.value) {
        curr = curr.left;
      } else if (curr.value === node.value) {
        curr = null;
      } else {
        curr = curr.right;
      }
      res += 1;
    }
    return (node !== null && curr === node) ? res : null;
  }

  isBalanced() {
    try {
      this.postorder(Tree.#_checkIfSubtreesBalanced);
      return true;
    } catch {
      return false;
    }
  }

  // TODO: consider making it so that Tree.height returns -1 if the node passed 
  // to it is null, because then #_getSubtreeHeight will be able to be used 
  // more generally (because it'll have handling for when node === null) and 
  // we won't have to do the below null-check
  static #_checkIfSubtreesBalanced(node) {
    if (node === null) {
      return;
    }
    const leftSubtreeHeight = Tree.#_getSubtreeHeight(node, true);
    const rightSubtreeHeight = Tree.#_getSubtreeHeight(node, false);
    if (Math.abs(leftSubtreeHeight - rightSubtreeHeight) > 1) {
      throw false;
    }
  }

  static #_getSubtreeHeight(node, leftSubtree = true) {
    const subtree = (leftSubtree) ? 'left' : 'right';
    const subtreeHeight = (node[subtree] !== null) ? Tree.height(node[subtree]) + 1: 0;
    return subtreeHeight;
  }
}
