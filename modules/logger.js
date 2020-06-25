module.exports = (module) => {
    return () => {
        let args = [module.filename].concat([].slice.call(arguments));
        console.log.apply(console, args);
    }
}