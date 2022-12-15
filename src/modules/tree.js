import Node from './node_class';

export default class Tree {
  constructor(arr) {
    this.#prepareArray(arr);
    this.root = this.#buildTree(arr, 0, arr.length - 1);
  }

  #buildTree(arr, start, end) {
    // if (start > end) {
    //     return null;
    // }
    // const root = 
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
