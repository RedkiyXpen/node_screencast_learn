const http = require('http'),
      fs = require('fs'),

function handler(req, res) {
    if (req.url == '/') {

        fs.readFile('index.html', (err, content) => {
            if (err) throw err;
            res.end(content);    
        });
    } else {
        res.statusCode = 404;
        res.end('Page not found');
    }
}      

const server = new http.createServer(handler);
module.exports = server;