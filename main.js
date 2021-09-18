const clone = require("./utils/clone")
const write = require('./utils/write')
const create = require("./utils/create")
const sleep = require("./utils/sleep")
const check = require("./utils/check")
const set = require("./utils/set")

const {getTcData} = require('./functions/getTcData')
const {getFileData} = require("./functions/getFileData");
const {getBalancedFileData} = require("./functions/fileLevel/getBalancedFileData");
const {getBalancedTcData} = require("./functions/tcLevel/getBalancedTcData");

/*
* Purpose: The start of the program, determines which major paths to take
* Arguments:
* Notes:
*/
async function main(allConfig) {
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
  const _mochaReport = clone.safeClone(mochaReport)
  const _fileOutputFile = clone.safeClone(fileOutputFile)

  const updatedTcData = getTcData(_caseOutputFile, _mochaReport)
  const updatedFileData = getFileData(updatedTcData, _fileOutputFile)

  const balancedFileData = getBalancedFileData(updatedFileData, testRunnerCount)
  const balancedTcData = getBalancedTcData(updatedTcData, testRunnerCount)

  console.log('balanced test cases:', balancedTcData)

  //write data
  await write.dataToFile(caseOutputFile, updatedTcData)
  await write.dataToFile(fileOutputFile, updatedFileData)
  await write.dataToFile(balancedFileOutputFile, balancedFileData)
  await write.dataToFile(balancedTcOutputFile, balancedTcData)
}

if (require.main === module) {
  const config = require('./resources/testing/config')

  main(config).then(() => {});
}
module.exports = {balance: main}