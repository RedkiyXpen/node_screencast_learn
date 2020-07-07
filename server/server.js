let http = require('http'),
    url = require('url');

let server = new http.Server((req, res) => {
    let urlParsed = url.parse(req.url, true);
    console.log(req.method, req.url);
    console.log(urlParsed);
    console.log(req.headers);

    if (urlParsed.pathname == '/echo' && urlParsed.query.message) {
        res.setHeader('Cache-control', 'no-cache');
        res.end(urlParsed.query.message);
    } else {
        res.statusCode = 404
        res.end("Page not found");
    }
});

server.listen(1337, '127.0.0.1');