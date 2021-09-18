const add = require("../utils/add");
const get = require("../utils/get")

/*
* Purpose: Gets metrics on the test case level and then either creates a file to hold these metrics, or adds to an
* already existing file of metrics
* Arguments:
*   @string tcDataOutputFile- output location where existing or new metrics should be stored
* Notes:
*/
function getTcData(tcData, mochaData) {
    for (const report of get.property(mochaData, 'results')) {
        for (const suite of get.property(report, 'suites')) {
            for (const test of get.property(suite, 'tests')) {
                tcData = add.testData(get.property(report, 'fullFile'), test, tcData)
            }
        }
    }
    return tcData
}
module.exports = {getTcData}