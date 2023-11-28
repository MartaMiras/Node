const crypto = require('crypto');

// Generate a random buffer of 16 bytes (128 bits)
const randomBuffer = crypto.randomBytes(16);

// Convert the buffer to a hex string
const randomID = randomBuffer.toString('hex');

console.log('Random ID:', randomID);
