const fs = require('fs');
const _ = require('lodash')

function safeClone(filePath){
    let clonedData
    if(fs.existsSync(filePath)){
        const data = require(filePath)
        clonedData = _.cloneDeep(data)
    } else {
        clonedData = []
    }
    return clonedData
}
module.exports = {safeClone}