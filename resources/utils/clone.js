const fs = require('fs');
const _ = require('lodash')

function safeClone(dataFile, config){
    const appDir = config.config.projectRoot
    let mutatedTcDataReport
    if(fs.existsSync(`${appDir}/${dataFile}`)){
        const tcDataReport = require(`${appDir}/${dataFile}`)
        mutatedTcDataReport = _.cloneDeep(tcDataReport)
    } else {
        console.log(`INFO - File does not exist: ${appDir}/${dataFile}`)
        mutatedTcDataReport = []
    }
    return mutatedTcDataReport
}
module.exports = {safeClone}