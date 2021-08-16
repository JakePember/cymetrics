const find = require('./find')
/*
* Purpose: Merges new test data with the past test data
* Arguments:
*   @JSON object historyReport - The name of the test case to look for
*   @int titleMatchIndex - index of the test object location that matches the passed in title
*   @JSONobject test - the latest run of the test case in question, raw from the mochawesome report
* Notes:
*/
function testCases(historyReport, titleMatchIndex, test) {
    const average = (array) => array.reduce((a, b) => a + b) / array.length;

    //lastRunState
    historyReport[titleMatchIndex].lastRunState = test.state

    //history.duration
    let historyOfDuration = historyReport[titleMatchIndex].history.duration
    historyOfDuration.push(test.duration)
    historyReport[titleMatchIndex].history.duration = historyOfDuration

    //history.successful_runs OR history.failure_runs
    test.pass ? historyReport[titleMatchIndex].history.successful_runs += 1 : historyReport[titleMatchIndex].history.failure_runs += 1

    //success_rate
    historyReport[titleMatchIndex].success_rate = parseFloat((historyReport[titleMatchIndex].history.successful_runs / (historyReport[titleMatchIndex].history.successful_runs + historyReport[titleMatchIndex].history.failure_runs)).toFixed(2))

    //avg_duration
    historyReport[titleMatchIndex].avg_duration = parseFloat((average(historyReport[titleMatchIndex].history.duration)).toFixed(0))

    return historyReport
}

function fileData(historyReport, fileMatchIndex, newDataPoint){
    const average = (array) => array.reduce((a, b) => a + b) / array.length;

    //history.duration
    let historyOfDuration = historyReport[fileMatchIndex].history.avg_duration
    historyOfDuration.push(newDataPoint.avg_duration)
    historyReport[fileMatchIndex].history.avg_duration = historyOfDuration

    //history.successful_runs OR history.failure_runs
    newDataPoint.success_rate ? historyReport[fileMatchIndex].history.successful_runs += 1 : historyReport[fileMatchIndex].history.failure_runs += 1

    //success_rate
    historyReport[fileMatchIndex].success_rate = parseFloat((historyReport[fileMatchIndex].history.successful_runs / (historyReport[fileMatchIndex].history.successful_runs + historyReport[fileMatchIndex].history.failure_runs)).toFixed(2))

    //avg_duration
    historyReport[fileMatchIndex].avg_duration = parseFloat((average(historyReport[fileMatchIndex].history.avg_duration)).toFixed(0))

    return historyReport
}
module.exports = {testCases, fileData}