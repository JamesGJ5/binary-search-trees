Mini object-oriented binary search tree learning project.

./src/modules contains a class for the binary tree and a class for a node that can be found in a binary tree.

Within ./src/modules/tree.js, particularly within methods defined for the tree, I tend to write iterative solutions rather than recursive ones where the complexity of each is the same, so that recursive overhead and issues with recursion depth need not be dealt with.

To see the results of ./src/index.js, clone this repo locally and, in the current directory, use the command "node dist/main.js" in your terminal.

In order to make changes to ./dist/main.js, amend ./src/index.js as desired and then use the command "npx webpack" to bundle the code.
