const fs = require('fs');
var path = require('path');
var appDir = path.dirname(require.main.filename);
const _ = require('lodash')

function safeClone(dataFile){
    let mutatedTcDataReport
    if(fs.existsSync(`${appDir}/${dataFile}`)){
        const tcDataReport = require(`${appDir}/${dataFile}`)
        mutatedTcDataReport = _.cloneDeep(tcDataReport)
    } else {
        mutatedTcDataReport = []
    }
    return mutatedTcDataReport
}
module.exports = {safeClone}