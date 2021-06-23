const fs = require('fs');
const _ = require('lodash');
const mochawesomeReport = require("./resources/report.json")
const s = require("./resources/settings.json")

/*
* Purpose
*
*
*
*
*/
function write_results_to_file(jsonName, data) {
  fs.writeFileSync(`output/${s.outputFileName}.json`, JSON.stringify(data, null, 2), err => {
    if (err) throw err;

    console.log("Done writing"); // Success
  });
}

function createTestCaseObj(test) {
  return {
    "title": test.title,
    "avg_duration": test.duration,
    "success_rate": test.pass ? 1.00 : 0.00,
    "history": {
      "duration": [test.duration],
      "successful_runs": test.pass ? 1 : 0,
      "failure_runs": test.pass ? 0 : 1
    }
  }
}

function getFirstTimeData() {
  const maReports = mochawesomeReport.results
  let data = []
  for (const report of maReports) {
    for (const suite of report.suites) {
      for (const test of suite.tests) {
        data.push(createTestCaseObj(test))
      }
    }
    return data
  }
}

function findHistoryIndex(title, historyLogReport) {
  const historyReport = require(historyLogReport)
  for (let x = 0; x < historyReport.length; x++) {
    if (title === historyReport[x].title) {
      return x
    }
  }
  return -1
}

function mergeTestCases(historyReport, titleMatchIndex, test) {
  const average = (array) => array.reduce((a, b) => a + b) / array.length;

  //history.duration
  let historyOfDuration = historyReport[titleMatchIndex].history.duration
  historyOfDuration.push(test.duration)
  historyReport[titleMatchIndex].history.duration = historyOfDuration

  //history.successful_runs OR history.failure_runs
  test.pass ? historyReport[titleMatchIndex].history.successful_runs += 1 : historyReport[titleMatchIndex].history.failure_runs += 1

  //success_rate
  historyReport[titleMatchIndex].success_rate = (historyReport[titleMatchIndex].history.successful_runs / (historyReport[titleMatchIndex].history.successful_runs + historyReport[titleMatchIndex].history.failure_runs)).toFixed(2)

  //avg_duration
  historyReport[titleMatchIndex].avg_duration = (average(historyReport[titleMatchIndex].history.duration)).toFixed(0)

  return historyReport
}

function getUpdatedData(relativeHistoryPath) {
  const maReports = mochawesomeReport.results
  const historyReport = require(relativeHistoryPath)
  let mutHistoryReport = historyReport

  for (const report of maReports) {
    for (const suite of report.suites) {
      for (const test of suite.tests) {
        let titleMatchIndex = findHistoryIndex(test.title, relativeHistoryPath)

        //enter only if the test case exists
        if (titleMatchIndex !== -1) {
          mutHistoryReport = mergeTestCases(mutHistoryReport, titleMatchIndex, test)
        } else { //if its a new addition to the project
          mutHistoryReport.push(createTestCaseObj(test))
        }
      }
    }
  }
  return historyReport
}

function main() {
  const relOutputFile = `output/${s.outputFileName}.json`

  // Create history file if it doesnt exist
  if (fs.existsSync(relOutputFile) === false) {
      write_results_to_file(s.outputFileName, getFirstTimeData())
  } else {
      write_results_to_file(s.outputFileName, getUpdatedData(`./${relOutputFile}`))
  }
}

if (require.main === module) {
  main();
}