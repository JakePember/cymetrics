const clone = require("./utils/clone")
const write = require('./utils/write')
const create = require("./utils/create")
const sleep = require("./utils/sleep")
const check = require("./utils/check")
const set = require("./utils/set")

const {getTcData} = require('./functions/getTcData')
const {getFileData} = require("./functions/getFileData");
const {getBalancedFileData} = require("./functions/getBalancedFileData");
const {getBalancedTcData} = require("./functions/getBalancedTcData");

/*
* Purpose: The start of the program, determines which major paths to take
* Arguments:
* Notes:
*/
async function balance(allConfig) {
  const c = await set.config(allConfig)
  const {fileOutputFile, balancedFileOutputFile} = c.paths.absolute.fileLevel
  const {caseOutputFile, balancedTcOutputFile} = c.paths.absolute.testCaseLevel
  const mochaReport = c.paths.absolute.mochaReport
  const testRunnerCount = c.load_balancer.testRunnerCount

  //wait for mochawesome report to finish generating
  await check.fileExistenceWithTimeout(mochaReport, 10000)
  await sleep.sleep(2000) //file isn't done waiting, give it a few seconds to make sure its usable

  await create.directory(c.absOutputDir)

  const _caseOutputFile = clone.safeClone(caseOutputFile)

  _caseOutputFile.forEach(test => test.lastRunState = 'skipped'); //default last run state to skipped, status will be updated if it wasn't skipped

  const _mochaReport = clone.safeClone(mochaReport)
  const _fileOutputFile = clone.safeClone(fileOutputFile)

  const updatedTcData = getTcData(_caseOutputFile, _mochaReport)
  const updatedFileData = getFileData(updatedTcData, _fileOutputFile)

  let balancedTcData = {}
  let balancedFileData = {}

  if(updatedTcData.length >= testRunnerCount){ // Only enter if there is at least 1 data point/runner
    balancedTcData = getBalancedTcData(updatedTcData, testRunnerCount)
  }

  if(updatedFileData.length >= testRunnerCount){ // Only enter if there is at least 1 data point/runner
    balancedFileData = getBalancedFileData(updatedFileData, testRunnerCount)
  }

  //write data
  await write.dataToFile(caseOutputFile, updatedTcData)
  await write.dataToFile(fileOutputFile, updatedFileData)
  await write.dataToFile(balancedTcOutputFile, balancedTcData)
  await write.dataToFile(balancedFileOutputFile, balancedFileData)
}

if (require.main === module) {
  const config = require('./resources/testing/config')

  balance(config).then(() => {});
}

module.exports = {balance}