const clone = require("./resources/utils/clone")
const add = require("./resources/utils/add")
const write = require('./resources/utils/write')
const group = require('./resources/utils/group')
const create = require("./resources/utils/create");
const path = require("path");
const fs = require("fs");

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


function checkExistsWithTimeout(filePath, timeout) {
  return new Promise(function (resolve, reject) {

    var timer = setTimeout(function () {
      watcher.close();
      reject(new Error('File did not exists and was not created during the timeout.'));
    }, timeout);

    fs.access(filePath, fs.constants.R_OK, async (err) => {
      if (!err) {
        clearTimeout(timer);
        watcher.close();
        resolve();
      }
    });

    var dir = path.dirname(filePath);
    var basename = path.basename(filePath);
    var watcher = fs.watch(dir, function (eventType, filename) {
      if (eventType === 'rename' && filename === basename) {
        clearTimeout(timer);
        watcher.close();
        resolve();
      }
    });
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
function getFileData(tcData, fileDataOutputFile, config){
  const tcGroupedByFileReport = group.testCasesByFile(tcData)
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
  const lbSettings = config.config.load_balancer
  const tcDataOutputFile = `${lbSettings.outputDirectory}/${lbSettings.testCaseOutputFileName}.json`
  const fileDataOutputFile = `${lbSettings.outputDirectory}/${lbSettings.fileOutputFileName}.json`

  //wait for mochawesome report to finish generating
  await checkExistsWithTimeout(`${config.config.projectRoot}/${lbSettings.mochawesomeReport}`, 10000)
  await sleep(2000) //file isn't done waiting, give it a few seconds to make sure its usable

  await create.directory(lbSettings.outputDirectory, config)

  //gather data
  const tcData = getTcData(`./${tcDataOutputFile}`, config)
  const fileData = getFileData(tcData, fileDataOutputFile, config)

  //write data
  await write.dataToFile(tcDataOutputFile, tcData, config)
  await write.dataToFile(fileDataOutputFile, fileData, config)
}

if (require.main === module) {
  const config = {
    "config": {
      "projectRoot": path.dirname(require.main.filename),
      "load_balancer": {
        "outputDirectory": "resources/testing/output",
        "testCaseOutputFileName": "tcDataOutput",
        "fileOutputFileName": "fileDataOutput",
        "testRunnerCount": "3",
        "mochawesomeReport": "resources/testing/mochawesomeMerged.json"
      }
    }
  }
  main(config);
}
module.exports = {balance: main}