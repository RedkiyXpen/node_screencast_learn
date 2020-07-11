const http = require('http');

const server = new http.Server((req, res) => {}).listen(3000);

setTimeout(() => {
    server.close();
}, 2500);

let timer = setInterval(() => {
    console.log(process.memoryUsage());
}, 1000);

timer.unref();