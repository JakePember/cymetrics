/*
* Purpose: sleeps for a user specified amount of time
* Arguments:
*   @int ms - desired amount of time to sleep in milliseconds
*/
const fs = require("fs");
const path = require("path");

function fileExistenceWithTimeout(filePath, timeout) {
    return new Promise(function (resolve, reject) {

        let timer = setTimeout(function () {
            watcher.close();
            reject(new Error(`File not found: ${filePath}`));
        }, timeout);

        fs.access(filePath, fs.constants.R_OK, async (err) => {
            if (!err) {
                clearTimeout(timer);
                watcher.close();
                resolve();
            }
        });

        var dir = path.dirname(filePath);
        var basename = path.basename(filePath);
        var watcher = fs.watch(dir, function (eventType, filename) {
            if (eventType === 'rename' && filename === basename) {
                clearTimeout(timer);
                watcher.close();
                resolve();
            }
        });
    });
}
module.exports = {fileExistenceWithTimeout}