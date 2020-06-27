const util = require('util');

let str = util.format("My %s %d %j", "string", 123, {test: "obj"});

console.log(str);