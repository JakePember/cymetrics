const mochawesomeReport = require("./resources/report.json")
const s = require("./resources/settings.json")
const clone = require("./resources/utils/clone")
const add = require("./resources/utils/add")
const write = require('./resources/utils/write')
const group = require('./resources/utils/group')
const create = require("./resources/utils/create");

/*
* Purpose: Gets metrics on the test case level and then either creates a file to hold these metrics, or adds to an
* already existing file of metrics
* Arguments:
*   @string tcDataOutputFile- output location where existing or new metrics should be stored
* Notes:
*/
function getTcData(tcDataOutputFile) {
  let mData = clone.safeClone(tcDataOutputFile)
  for (const report of mochawesomeReport.results) {
    for (const suite of report.suites) {
      for (const test of suite.tests) {
        mData = add.testData(report.fullFile, test, mData)
      }
    }
  }
  return mData
}

/*
* Purpose: Gets metrics on a file level and then either creates a file to hold these metrics, or adds to an
* already existing file of metrics
* Arguments:
*   @string tcDataOutputFile- location where test case data is located needed to generate file level metrics
* Notes:
*/
function getFileData(tcDataOutputFile, fileDataOutputFile){
  const tcGroupedByFileReport = group.testCasesByFile(clone.safeClone(tcDataOutputFile))
  let mData = clone.safeClone(fileDataOutputFile)

  for(fileGrouping in tcGroupedByFileReport){
    mdata = add.fileData(tcGroupedByFileReport, fileGrouping, mData)
  }

  return mData
}


/*
* Purpose: The start of the program, determines which major paths to take
* Arguments:
* Notes:
*/
function main() {
  const tcDataOutputFile = `${s.outputDirectory}/${s.testCaseOutputFileName}.json`
  const fileDataOutputFile = `${s.outputDirectory}/${s.fileOutputFileName}.json`

  create.directory(s.outputDirectory)

  write.dataToFile(tcDataOutputFile, getTcData(`./${tcDataOutputFile}`))
  write.dataToFile(fileDataOutputFile, getFileData(`./${tcDataOutputFile}`, fileDataOutputFile))
}

if (require.main === module) {
  main();
}

module.exports = {balance: main}