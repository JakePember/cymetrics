const find = require('./find')
const merge = require('./merge')
const create = require('./create')

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