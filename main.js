const fs = require('fs');
const mochawesomeReport = require("./resources/report.json")
const s = require("./resources/settings.json")

/*
* Purpose: Writes JSON data to a file
* Arguments:
*   @string file - file path. ie: "output/myFile.json"
*   @JSONobject data - some json object, example seen in notes section
* Notes:
* example object on what argument 'data' might look like
*  {
*    "title": test.title,
*    "avg_duration": 234
*    "success_rate": 1.0
*    "history": {
*      "duration": [234, 234],
*      "successful_runs": 2,
*      "failure_runs": 0
*    }
*  }
*/
function writeDataToFile(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), err => {
    if (err) throw err;
  });
}

/*
* Purpose: Takes the large test objects and makes a new object with only the properties that are needed
* Arguments:
*   @JSONobject test- mocahawesome test case output. Raw test case input can be seen in the notes section
* Notes:
*  {
*    "title": ".as() - alias a DOM element for later use",
*    "fullTitle": "Aliasing .as() - alias a DOM element for later use",
*    "timedOut": null,
*    "duration": 462,
*    "state": "passed",
*    "speed": "slow",
*    "pass": true,
*    "fail": false,
*    "pending": false,
*    "context": null,
*    "code": "// https://on.cypress.io/as\n// Alias a DOM element for use later\n// We don't have to traverse to the element\n// later in our code, we reference it with @\ncy.get('.as-table').find('tbody>tr').first().find('td').first().find('button').as('firstBtn'); // when we reference the alias, we place an\n// @ in front of its name\ncy.get('@firstBtn').click();\ncy.get('@firstBtn').should('have.class', 'btn-success').and('contain', 'Changed');",
*    "err": {},
*    "uuid": "2454021b-4b44-47b0-bcd4-07291eee0418",
*    "parentUUID": "2ccd440a-1113-4aed-a616-592a2a5c47ae",
*    "isHook": false,
*    "skipped": false
*  }
*/
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

/*
* Purpose: Goes through through the entire mochawesome report results and creates test objects out of all of the test
* cases
* Arguments:
* Notes:
*/
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

/*
* Purpose: Returns the index of the test object location that matches the passed in title. Returns -1 if the title is
* not found.
* Arguments:
*   @string title - The name of the test case to look for
*   @string relativeHistoryPath- relative path to past test case data
* Notes:
*/
function findHistoryIndex(title, relativeHistoryPath) {
  const historyReport = require(relativeHistoryPath)
  for (let index = 0; index < historyReport.length; index++) {
    if (title === historyReport[index].title) {
      return index
    }
  }
  return -1
}

/*
* Purpose: Merges new test data with the past test data
* Arguments:
*   @JSON object historyReport - The name of the test case to look for
*   @int titleMatchIndex - index of the test object location that matches the passed in title
*   @JSONobject test - the latest run of the test case in question, raw from the mochawesome report
* Notes:
*/
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

/*
* Purpose: Main process that is called when there is past test case data to fuse with new test case data.
* Arguments:
*   @string relativeHistoryPath- relative path to past test case data
* Notes:
*/
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


/*
* Purpose: The start of the program, determines which major paths to take
* Arguments:
* Notes:
*/
function main() {
  const relOutputFile = `output/${s.outputFileName}.json`

  fs.existsSync(relOutputFile) ?
    writeDataToFile(relOutputFile, getUpdatedData(`./${relOutputFile}`))
    : writeDataToFile(relOutputFile, getFirstTimeData())
}

if (require.main === module) {
  main();
}