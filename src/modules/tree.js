import Node from './node_class';

export default class Tree {
  constructor(arr) {
    this.#prepareArray(arr);
    this.root = this.#buildTree(arr, 0, arr.length - 1);
  }

  #buildTree(arr, start, end) {
    // arr must be sorted
    if (start > end) {
        return null;
    }
    const mid = parseInt((start + end) / 2);
    const root = new Node(arr[mid]);
    root.left = this.#buildTree(arr, start, mid - 1);
    root.right = this.#buildTree(arr, mid + 1, end);
    return root;
  }

  #prepareArray(arr) {
    this.#removeDuplicates(arr);
    arr.sort((a, b) => a - b);
  }

  #removeDuplicates(arr) {
    const dataUnrepeated = new Set();
    while (arr.length > 0) {
      dataUnrepeated.add(arr.pop());
    }
    dataUnrepeated.forEach((data) => {
      dataUnrepeated.delete(data);
      arr.push(data);
    });
  }
}
