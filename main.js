const fs = require('fs');
const _ = require('lodash')
const mochawesomeReport = require("./resources/report.json")
const s = require("./resources/settings.json")
const clone = require("./resources/utils/clone")
const add = require("./resources/utils/add")
const write = require('./resources/utils/write')
const find = require('./resources/utils/find')
const create = require('./resources/utils/create')
const merge = require('./resources/utils/merge')

function findFileIndex(file, mutTcDataOutput) {
  for(let index = 0; index < mutTcDataOutput.length; index++){
    if(file === mutTcDataOutput[index].file){
      return index
    }
  }
  return -1;
}

function getFileFirstTimeData(_tcReports){
  const tcReports = require(_tcReports)

  let tmp = tcReports,
      groupedByFileReport = tmp.reduce((r, a) => {
        r[a.file] = r[a.file] || [];
        r[a.file].push(a);
        return r;
      }, Object.create(null));


  let result
  let newFileData = []
  for(fileGrouping in groupedByFileReport){
    const file = fileGrouping
    let avg_duration = 0
    let allTestsPassed = true

    groupedByFileReport[fileGrouping].forEach((tc) => {
      avg_duration = avg_duration + tc.avg_duration
      if(tc.lastRunState === 'failed'){
        allTestsPassed = false
      }
    })
    result = {
      file,
      avg_duration,
      allTestsPassed
    }
    newFileData.push(create.fileObj(result))
  }

  return newFileData
}

/*
* Purpose: Main process that is called when there is past test case data to fuse with new test case data.
* Arguments:
*   @string relativeHistoryPath- relative path to past test case data
* Notes:
*/
function getTcData(tcDataOutputFile) {
  mData = clone.safeClone(tcDataOutputFile)
  for (const report of mochawesomeReport.results) {
    for (const suite of report.suites) {
      for (const test of suite.tests) {
        mData = add.testData(report.fullFile, test, mData)
      }
    }
  }
  return mData
}

function getFileUpdatedData(_tcReports){
  const tcReports = require(_tcReports)
  const fileDataOutput = require("./output/fileDataOutput.json")
  let mData = _.cloneDeep(fileDataOutput)

  let tmp = tcReports,
      groupedByFileReport = tmp.reduce((r, a) => {
        r[a.file] = r[a.file] || [];
        r[a.file].push(a);
        return r;
      }, Object.create(null));


  let result
  let newFileData = []
  for(fileGrouping in groupedByFileReport){
    const fileTitle = fileGrouping
    let fileMatchIndex = findFileIndex(fileTitle, mData)

    let avg_duration = 0
    let allTestsPassed = true

    groupedByFileReport[fileGrouping].forEach((tc) => {
      avg_duration = avg_duration + tc.avg_duration
      if(tc.lastRunState === 'failed'){
        allTestsPassed = false
      }
    })
    result = {
      file: fileTitle,
      avg_duration,
      allTestsPassed
    }

    if(fileMatchIndex !== -1){
      mData = merge.fileData(mData, fileMatchIndex, create.fileObj(result))
    }else {
      mData.push(create.fileObj(result))
    }

  }

  return mData
}


/*
* Purpose: The start of the program, determines which major paths to take
* Arguments:
* Notes:
*/
function main() {
  const tcDataOutputFile = `output/${s.testCaseOutputFileName}.json`
  const fileDataOutputFile = `output/${s.fileOutputFileName}.json`


  write.dataToFile(tcDataOutputFile, getTcData(`./${tcDataOutputFile}`))

  fs.existsSync(fileDataOutputFile) ?
      write.dataToFile(fileDataOutputFile, getFileUpdatedData(`./${tcDataOutputFile}`))
      : write.dataToFile(fileDataOutputFile, getFileFirstTimeData(`./${tcDataOutputFile}`))
}

if (require.main === module) {
  main();
}