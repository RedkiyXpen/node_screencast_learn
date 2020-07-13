const http = require('http'),
      fs = require('fs');

new http.Server((req, res) => {
    if (req.url == '/big.html') {

        let file = new fs.ReadStream('big.html');
        sendFile(file, res);

    }
}).listen(3000);

function sendFile(file, res) {
    file.pipe(res);
    
    file.on('error', (err) => {
        res.statusCode = 500;
        res.end('Server error');
        console.error(err);
    });

    res.on('close', () => {
        file.destroy();
    })
}