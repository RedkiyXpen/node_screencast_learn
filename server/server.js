let http = require('http'),
    url = require('url');

let server = http.createServer();

server.on('request', (req, res) => {
    let urlParsed = url.parse(req.url, true);
    
    if (req.method = 'GET' && urlParsed.pathname == '/echo' && urlParsed.query.method) {
        res.end(urlParsed.query.method);
        return;
    }

    res.statusCode = 404;
    res.end('Not Found');
});

server.listen(1337, '127.0.0.1');