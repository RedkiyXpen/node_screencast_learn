const fs = require('fs');

// fs.stat(__filename, (err, stats) => {
//     console.log("Stat is file? " + stats.isFile());
//     console.log(stats);
// })

// fs.readFile(__filename, (err, data) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(data.toString());
//     }
// })

fs.writeFile("file.tmp", "data", (err) => {
    if (err) throw err;

    fs.rename("file.tmp", "new.tmp", (err) => {
        if (err) throw err;

        fs.unlink("new.tmp", (err) => {
            if (err) throw err;
        })
    })
})