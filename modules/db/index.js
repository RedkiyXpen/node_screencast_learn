module.exports.connect = function() {
    phrases = require('./ru.json');
}

module.exports.getPhrase = (name) => {
    if (!phrases[name]) { 
        throw new Error("Нет фразы: " + name);
    } else {
        return phrases[name];
    }
}