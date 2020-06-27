const util = require('util');
let phrases = {
    "Hello": "Привет",
    "World": "Мир"
}

function PhraseError(message) {
    this.message = message;
    Error.captureStackTrace(this, PhraseError);
}
util.inherits(PhraseError, Error);
PhraseError.prototype.name = 'PhraseError';

function HTTPError(status, message) {
    this.status = status;
    this.message = message;
    Error.captureStackTrace(this, HTTPError);
}
util.inherits(HTTPError, Error);
HTTPError.prototype.name = 'HttpError';

function getPhrase(name) {
    if (!phrases[name]) {
        throw new PhraseError(`Нету такого слова ${name}`);
    } 
    return phrases[name];
}

function makePage(url) {
    if (url !== 'index.html') {
        throw new HTTPError(404, "Page not found");
    }
    return util.format("%s, %s!", getPhrase("Hllo"), getPhrase("World"));
}

try {
    let page = makePage("index.html");
    console.log(page);
} catch(er) {
    if (er instanceof HTTPError) {
        console.log(er.status, er.message);
    } else if (er instanceof PhraseError) {
        console.error("Ошибка %s\n сообщение: %s\n стек: %s", er.name, er.message, er.stack);
    }
}
