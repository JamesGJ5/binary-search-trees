import Tree from './modules/tree';

const randomIntegerArray = (size, maximum) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * maximum));

const tree = new Tree(randomIntegerArray(40, 100));
console.log(`It is ${tree.isBalanced()} that the tree is balanced.`);
console.log('Level-order traversal:', tree.levelOrder());
console.log('Preorder traversal:', tree.preorder());
console.log('Postorder traversal:', tree.postorder());
console.log('Inorder traversal:', tree.inorder());
tree.insert(1000);
tree.insert(10000);
tree.insert(100000);
tree.insert(1000000);
console.log(`It is ${tree.isBalanced()} that the tree is balanced.`);
tree.rebalance();
console.log(`It is ${tree.isBalanced()} that the tree is balanced.`);
console.log('Level-order traversal:', tree.levelOrder());
console.log('Preorder traversal:', tree.preorder());
console.log('Postorder traversal:', tree.postorder());
console.log('Inorder traversal:', tree.inorder());
