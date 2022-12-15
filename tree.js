class Tree {
  constructor(arr) {
    this.#prepareArray(arr);
    this.root = this.#buildTree(arr);
  }

  #buildTree(arr) {
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

const tree1 = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
