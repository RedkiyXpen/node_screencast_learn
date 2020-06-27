const util = require('util');

function Animal(name) {
    this.name = name;
}

Animal.prototype.walk = () => {
    console.log(`Ходит ${this.name}`);
}

function Rabit(name) {
    this.name = name;
    console.log(this.name);
}

util.inherits(Rabit, Animal);

Rabit.prototype.jump = () => {
    console.log("Прыгает " + this.name);
}

let rabit = new Rabit("our rabit");
rabit.walk();
rabit.jump();