const User = require('user');
const db = require('db');

function run() {
    let vasya = new User("Vasya");
    let petya = new User("Petya");

    vasya.hello(petya);

    console.log(db.getPhrase("Run succesfull"));
}

if (module.parent) {
    exports.run = run;
} else {
    run();
}