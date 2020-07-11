let http = require('http'),
    fs = require('fs');

http.createServer((req, res) => {
    let info;

    if (req.url == '/') {
        fs.readFile('index.html', (err, info) => {
            if (err) {
                console.error(err);
                res.statusCode = 500;
                res.end('Sorry, we have a trouble on server side');
                return;
            }
            res.end(info);
        })
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
}).listen(300);