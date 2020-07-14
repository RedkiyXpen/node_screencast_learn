const domain = require('domain'),
      serverDomain = domain.create();

let server;

serverDomain.on('error', (err) => {
    console.error('Server error', err);
    if (server) server.close();

    setTimeout(() => process.exit(1), 1000).unref();
});

serverDomain.run(() => {
    const http = require('http'),
          handler = require('./handler');

    server = http.createServer((req, res) => {
        let reqDomain = domain.create();
        reqDomain.add(req);
        reqDomain.add(res);

        reqDomain.on('error', (err) => {
            res.statusCode = 500;
            res.end('Sorry, ' + err);
            console.error("Error for req = ", req);
            serverDomain.emit('error', err);
        });

        reqDomain.run(() => {
            handler(req, res);
        });
    });

    server.listen(3000);
})