const fs = require('fs');

/*
* Purpose: Removes the file specified
* Arguments:
*   @object file - the file to be removed
* Notes:
*/
function file(file) {
    try {
        fs.unlinkSync(file);
    } catch (err) {
        // console.error(err);
    }
}
module.exports = {file}