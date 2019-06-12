// jshint esversion:6
// The comment above tells lint I'm using JS ES6 so it won't give me warnings about features only being available at this esversion

/* const = Constant, good for file paths or values that won't change
** fs = File system, method from node.js to read/modify files in the computer
** Require = this method is similiar to a "import", it gets access to the module that needs to be used. Now, whenever
** we need it, this all fileSystem methods will be available on our constant 'fs' */
const fs = require("fs");

// Reading the file1 inside this project's folder and copying into a new file in the same directory called 'file2', or
// overwriting the 'file2' if it's already created.
fs.copyFileSync("file1.txt", "file2.txt");
