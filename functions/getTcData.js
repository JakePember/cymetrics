const add = require("../utils/add");
/*
* Purpose: Gets metrics on the test case level and then either creates a file to hold these metrics, or adds to an
* already existing file of metrics
* Arguments:
*   @string tcDataOutputFile- output location where existing or new metrics should be stored
* Notes:
*/
function getTcData(tcData, mochaData) {
    for (const report of mochaData.results) {
        for (const suite of report.suites) {
            for (const test of suite.tests) {
                tcData = add.testData(report.fullFile, test, tcData)
            }
        }
    }
    return tcData
}
module.exports = {getTcData}