const http = require('http'),
      opts = require('optimist');

http.createServer((req, res) => {
    res.end("Server created");
}).listen(opts.port);      

