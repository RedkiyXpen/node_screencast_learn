const http = require('http'),
      fs = require('fs'),
      chat = require('./chat');

http.createServer((req, res) => {

    switch(req.url) {
        case '/':
            sendFile("index.html", res);
            break;
        
        case '/subscribe':
            chat.subscribe(req, res);
            break;
        
        case '/publish':
            let body = '';

            req
                .on('readable', () => {
                    body += req.read();

                    if (body.length > 1e4) {
                        res.statusCode = 413;
                        res.end("Your message is too big");
                    }
                })
                .on('end', () => {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {
                        res.statusCode = 400;
                        res.end("Bad request");
                        return;
                    }

                    chat.publish(body.message);
                    res.end("ok");
                })
            break;
        
        default: 
            res.statusCode = 404;
            res.end('Page not found');
    }

}).listen(3000);

function sendFile(fileName, res) {
    let fileStream = fs.createReadStream(fileName);
    fileStream.on('error', () => {
        res.statusCode = 500;
        res.end("Server error");
    });

}

