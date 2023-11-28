const fs = require('fs');

const content = 'This is the content of the text file.';

fs.writeFile('example.txt', content, (err) => {
  if (err) {
    console.error('Error writing file:', err);
  } else {
    console.log('File has been written successfully!');
  }
});
