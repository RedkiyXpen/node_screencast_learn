let EventEmitter = require('events').EventEmitter;

let db = new EventEmitter;

function Request() {
    let self = this;

    this.bigData = new Array(1e6).join('*');

    this.send = (data) => {
        console.log(data);
    };

    function onData(info) {
        self.send(info);
    }

    this.end = () => {
        db.removeListener('data', onData);
    }

    db.on('data', onData);
}

setInterval(() => {
    let request = new Request();
    console.log(process.memoryUsage().heapUsed);
}, 200);