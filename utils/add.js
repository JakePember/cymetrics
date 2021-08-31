const find = require('./find')
const merge = require('../resources/utils/merge')
const create = require('./create')

/*
* Purpose: Adds new metadata for a particular test to the existing metadata history for that test. If this is the first
* run of the test, it will create a new entry for it
* Arguments:
*   @string file - the file in which the test case is from
*   @string test - the metadata for the test such as pass/fail, duration, etc
*   @object report - the report the new metadata should be added too
* Notes:
*/
function testData(file, test, report){
    let titleMatchIndex = find.index('title', test.title, report)

    //enter only if the test case exists
    if (titleMatchIndex !== -1) {
        report = merge.testCases(report, titleMatchIndex, test)
    } else { //if its a new addition to the project
        report.push(create.testCaseObj(file, test))
    }
    return report
}

/*
* Purpose: Adds new metadata for a particular file to the existing metadata history for that file. If this is the first
* run of this particular file, it will create a new entry for it
* Arguments:
*   @string tcGroupedByFileReport - test case metadata organized under their respective file they came from
*   @string fileGrouping - the name of the file the test cases are from
*   @object report - the report the new metadata should be added too
* Notes:
*/
function fileData(tcGroupedByFileReport, fileGrouping, report){
    const fileTitle = fileGrouping
    let fileMatchIndex = find.index('file', fileTitle, report)

    let avg_duration = 0
    let allTestsPassed = true

    tcGroupedByFileReport[fileGrouping].forEach((tc) => {
        avg_duration = avg_duration + tc.avg_duration
        if(tc.lastRunState === 'failed'){
            allTestsPassed = false
        }
    })

    const result = {
        file: fileTitle,
        avg_duration: avg_duration,
        allTestsPassed: allTestsPassed
    }

    if(fileMatchIndex !== -1){
        report = merge.fileData(report, fileMatchIndex, create.fileObj(result))
    }else {
        report.push(create.fileObj(result))
    }
    return report
}
module.exports = {testData, fileData}