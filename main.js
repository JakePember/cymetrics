const clone = require("./resources/utils/clone")
const add = require("./resources/utils/add")
const write = require('./resources/utils/write')
const group = require('./resources/utils/group')
const create = require("./resources/utils/create");
const path = require("path");
const fs = require("fs");
function sleep(ms) {
  console.log('IN THE SLEEP')
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
/*
* Purpose: Gets metrics on the test case level and then either creates a file to hold these metrics, or adds to an
* already existing file of metrics
* Arguments:
*   @string tcDataOutputFile- output location where existing or new metrics should be stored
* Notes:
*/
function getTcData(tcDataOutputFile, config) {
  const lbSettings = config.config.load_balancer

  const mochawesomeReport = clone.safeClone(lbSettings.mochawesomeReport, config)


  let mData = clone.safeClone(tcDataOutputFile, config)
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
function getFileData(tcDataOutputFile, fileDataOutputFile, config){
  const tcGroupedByFileReport = group.testCasesByFile(clone.safeClone(tcDataOutputFile, config))
  let mData = clone.safeClone(fileDataOutputFile, config)

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
async function main(config) {
  // console.log('BEFORE SLEEP');
  // var waitTill = new Date(new Date().getTime() + seconds * 1000);
  // while(waitTill > new Date()){}
  // console.log('AFTER SLEEP');


  const lbSettings = config.config.load_balancer
  const tcDataOutputFile = `${lbSettings.outputDirectory}/${lbSettings.testCaseOutputFileName}.json`
  const fileDataOutputFile = `${lbSettings.outputDirectory}/${lbSettings.fileOutputFileName}.json`


  const checkTime = 1000;
  const fs = require('fs');

  function check() {
    setTimeout(() => {
      fs.readFile(`${config.config.projectRoot}/${lbSettings.mochawesomeReport}`, 'utf8', function(err, data) {
        if (err) {
          // got error reading the file, call check() again
          check();
        } else {
          // we have the file contents here, so do something with it
          // can delete the source file too
        }
      });
    }, checkTime)
  }

  check();

  create.directory(lbSettings.outputDirectory, config)
  write.dataToFile(tcDataOutputFile, getTcData(`./${tcDataOutputFile}`, config), config)
  write.dataToFile(fileDataOutputFile, getFileData(`./${tcDataOutputFile}`, fileDataOutputFile, config), config)
}

module.exports = {balance: main}