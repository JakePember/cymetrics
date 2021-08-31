const fs = require('fs');
const _ = require('lodash')

/*
* Purpose: Returns data object (javascript or json) located within a file. However if the file does not exist,
* an empty object is returned in its place to avoid throwing an error or compile issue.
* Arguments:
*   @object filePath - path the desired json or javascript object resides in
* Notes:
*/
function safeClone(filePath){
    let clonedData
    if(fs.existsSync(filePath)){
        const data = require(filePath)
        clonedData = _.cloneDeep(data)
    } else {
        clonedData = {}
    }
    return clonedData
}
module.exports = {safeClone}