const find = require('./find')
const merge = require('./merge')
const create = require('./create')
function testData(file, test, report){
    let titleMatchIndex = find.index(test.title, report)

    //enter only if the test case exists
    if (titleMatchIndex !== -1) {
        report = merge.testCases(report, titleMatchIndex, test)
    } else { //if its a new addition to the project
        report.push(create.testCaseObj(file, test))
    }
    return report
}
module.exports = {testData}