class Tree {
  constructor(arr) {
    this.root = this.#buildTree(arr);
  }

  #buildTree(arr) {
    this.#prepareArray(arr);
  }

  #prepareArray(arr) {
    this.#removeDuplicates(arr);
    arr.sort();
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

const tree1 = new Tree([1, 5, 3, 2, 6, 5, 8, 7, 6, 7, 0]);
