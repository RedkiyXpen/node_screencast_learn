const { request } = require('express');

const EventEmitter = require('events').EventEmitter;

let server = new EventEmitter;

server.on('request', (request) => {
    request.approved = true;
})

server.on('request', function(request) {
    console.log(request);
})

server.emit('request', {from: "Client"});
server.emit('request', {from: "Another client"});