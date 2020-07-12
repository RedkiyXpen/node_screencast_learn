const fs = require('fs');

let stream = new fs.ReadStream(__filename, {encoding: 'utf-8'});

stream.on('readable', () => {
    let data = stream.read();
    console.log(data);
});

stream.on('end', () => {
    console.log('THE END');
});

stream.on('error', (err) => {
    if (err.code == 'EN0ENT') {
        console.log('File not found');
    } else {
        console.error(err);
    }
})