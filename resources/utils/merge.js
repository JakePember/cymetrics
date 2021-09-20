const get = require("../../utils/get")

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
    //lastRunState
    historyReport[titleMatchIndex].lastRunState = get.property(test, 'state')

    //history.duration
    let historyOfDuration = historyReport[titleMatchIndex].history.duration
    historyOfDuration.push(test.duration)
    historyReport[titleMatchIndex].history.duration = historyOfDuration

    //history.successful_runs OR history.failure_runs
    get.property(test, 'state') === 'pass' ? historyReport[titleMatchIndex].history.successful_runs += 1 : historyReport[titleMatchIndex].history.failure_runs += 1

    //success_rate
    historyReport[titleMatchIndex].success_rate = getSuccessRate(historyReport, titleMatchIndex)

    //avg_duration
    historyReport[titleMatchIndex].avg_duration = getAvgDurationTcLevel(historyReport, titleMatchIndex)

    return historyReport
}

function fileData(historyReport, fileMatchIndex, newDataPoint){
    //history.duration
    let historyOfDuration = historyReport[fileMatchIndex].history.avg_duration
    historyOfDuration.push(newDataPoint.avg_duration)
    historyReport[fileMatchIndex].history.avg_duration = historyOfDuration

    //history.successful_runs OR history.failure_runs
    newDataPoint.success_rate ? historyReport[fileMatchIndex].history.successful_runs += 1 : historyReport[fileMatchIndex].history.failure_runs += 1

    //success_rate
    historyReport[fileMatchIndex].success_rate = getSuccessRate(historyReport, fileMatchIndex)

    //avg_duration
    historyReport[fileMatchIndex].avg_duration = getAvgDurationFileLevel(historyReport, fileMatchIndex)

    return historyReport
}
module.exports = {testCases, fileData}