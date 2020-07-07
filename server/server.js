let http = require('http');
let server = new http.Server();
let emit = server.emit;
let counter = 0;

server.listen(1337, '127.0.0.1');

server.emit = (event) => {
    console.log(event);
    emit.apply(server, arguments);
}

server.on('request', (req, res) => {
    res.end("Hello, World!" + ++counter);
})