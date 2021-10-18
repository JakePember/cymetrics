const get = require("../../utils/get")
const _ = require("lodash");

function getSuccessRate(report, index){
    return parseFloat((report[index].history.successful_runs / (report[index].history.successful_runs + report[index].history.failure_runs)).toFixed(2))
}
function getAvgDurationTcLevel(report, index){
    const average = (array) => array.reduce((a, b) => a + b) / array.length;
    return parseFloat((average(report[index].history.duration)).toFixed(0))
}
function getAvgDurationFileLevel(report, index){
    const average = (array) => array.reduce((a, b) => a + b) / array.length;
    return parseFloat((average(report[index].history.avg_duration)).toFixed(0))
}
/*
* Purpose: Merges new test data with the past test data
* Arguments:
*   @JSON object historyReport - The name of the test case to look for
*   @int titleMatchIndex - index of the test object location that matches the passed in title
*   @JsonObject test - the latest run of the test case in question, raw from the mochawesome report
* Notes:
*/
function testCases(historyReport, titleMatchIndex, test) {
    let _historyReport = _.cloneDeep(historyReport)
    //lastRunState
    _historyReport[titleMatchIndex].lastRunState = get.property(test, 'state')

    //history.duration
    let historyOfDuration = _historyReport[titleMatchIndex].history.duration
    historyOfDuration.push(test.duration)
    _historyReport[titleMatchIndex].history.duration = historyOfDuration

    //history.successful_runs OR history.failure_runs
    get.property(test, 'state') === 'passed' ? _historyReport[titleMatchIndex].history.successful_runs += 1 : _historyReport[titleMatchIndex].history.failure_runs += 1

    //success_rate
    _historyReport[titleMatchIndex].success_rate = getSuccessRate(_historyReport, titleMatchIndex)

    //avg_duration
    _historyReport[titleMatchIndex].avg_duration = getAvgDurationTcLevel(_historyReport, titleMatchIndex)

    return _historyReport
}
function fileData(historyReport, fileMatchIndex, newDataPoint){
    let _historyReport = _.cloneDeep(historyReport)
    //history.duration
    let historyOfDuration = _historyReport[fileMatchIndex].history.avg_duration
    historyOfDuration.push(newDataPoint.avg_duration)
    _historyReport[fileMatchIndex].history.avg_duration = historyOfDuration

    newDataPoint.success_rate === 1? _historyReport[fileMatchIndex].history.successful_runs += 1 : _historyReport[fileMatchIndex].history.failure_runs += 1

    //success_rate
    _historyReport[fileMatchIndex].success_rate = getSuccessRate(_historyReport, fileMatchIndex)

    //avg_duration
    _historyReport[fileMatchIndex].avg_duration = getAvgDurationFileLevel(_historyReport, fileMatchIndex)

    return _historyReport
}
module.exports = {testCases, fileData}