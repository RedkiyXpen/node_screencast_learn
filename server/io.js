const fs = require('fs');

fs.open(__filename, 'r', (err, file) => {
    console.log('IO!');
});

setImmediate(() => {
    console.log('immediate');
});

process.nextTick(() => {
    console.log('process.nextTick');
});