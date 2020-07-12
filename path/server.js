const http = require('http'),
      url = require('url'),
      fs = require('fs'),
      path = require('path');
const { normalize } = require('path');

let ROOT = __dirname + '/public';

http.createServer((req, res) => {

    if (!checkAcess(req)) {
        res.statusCode = 403;
        res.end("Tell me the secret to acess");
        return;
    }

    sendFileSafe(url.parse(req.url).pathname, res);
}).listen(3000);

function checkAcess(req) {
    return url.parse(req.url, true).query.secret == "db";
}

function sendFileSafe(filepath, res) {
    try {
        filePath = decodeURIComponent(filepath);
    } catch (e) {
        res.statusCode = 400;
        res.end("Bad Request");
        return;
    }

    if (~filepath.indexOf('\0')) {
        res.statusCode = 400;
        res.end("Bad request");
        return;
    }

    filePath = path.normalize(path.join(ROOT, filePath));

    if (filePath.indexOf(ROOT) != 0) {
        res.statusCode = '404';
        res.end('Page not found');
        return;
    }

    fs.stat(filePath, (err, stats) => {
        if (err || stats.isFile()) {
            res.statusCode = 404;
            res.end('Page not found');
            return;
        }
    });

    sendFile(filePath, res);
}

function sendFile(filepath, res) {
    fs.readFile(filepath, (err, content) => {
        if (err) throw err;

        let mime = require('mime').lookup(filepath);
        res.setHeader('Content-Type', mime + "; charset=utf-8");
        res.end(content);
    });
}