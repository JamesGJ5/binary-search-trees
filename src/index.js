import Tree from './modules/tree';

// const tree1 = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// tree1.prettyPrint();

// console.log(tree1.find(4));
// console.log(tree1.find(21));

// tree1.insert(1000);
// tree1.insert(-10);
// tree1.prettyPrint();

// console.log(tree1.levelOrder());

// tree1.preorder(console.log);
// console.log(tree1.preorder());

const tree1Values = [1, 2, 3, 4, 5];
const tree1 = new Tree(tree1Values);
tree1.prettyPrint();
// tree1.preorder(console.log);
// tree1.inorder(console.log);
// console.log(tree1.inorder());
// console.log(tree1.postorder());
for (let i = 0; i < tree1Values.length; i += 1) {
  const value = tree1Values[i];
  console.log(value);
//   console.log(typeof value);
  const node = tree1.find(value);
//   console.log(node);
//   const height = Tree.height(node);
//   console.log(height);
  const depth = tree1.depth(node);
  console.log(depth);
}

// const tree2 = new Tree([1]);
// tree2.prettyPrint();
// tree2.preorder(console.log);
// tree2.inorder(console.log);
// console.log(tree2.inorder());
// console.log(tree2.postorder());

// const tree3 = new Tree([]);
// tree3.prettyPrint();
// tree3.preorder(console.log);
// tree3.inorder(console.log);
// console.log(tree3.inorder());
// console.log(tree3.postorder());
