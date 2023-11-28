// Require the exported function
const greetFunction = require('./moduleExport');

// Call the imported function
const message = greetFunction('John');

console.log(message);
