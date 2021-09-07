const add = require("../utils/add");
const group = require("../resources/utils/group");
/*
* Purpose: Gets metrics on a file level and then either creates a file to hold these metrics, or adds to an
* already existing file of metrics
* Arguments:
*   @string tcDataOutputFile- location where test case data is located needed to generate file level metrics
* Notes:
*/
function getFileData(tcData, fileData){
    const tcGroupedByFileReport = group.testCasesByFile(tcData)

    for(fileGrouping in tcGroupedByFileReport){
        mdata = add.fileData(tcGroupedByFileReport, fileGrouping, fileData)
    }

    return fileData
}
module.exports = {getFileData}