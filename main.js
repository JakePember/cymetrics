const clone = require("./utils/clone")
const write = require('./utils/write')
const create = require("./utils/create")
const sleep = require("./utils/sleep")
const check = require("./utils/check")
const set = require("./utils/set")

const {getTcData} = require('./functions/getTcData')
const {getFileData} = require("./functions/getFileData");
const {getBalancedFileData} = require("./functions/fileLevel/getBalancedFileData");

/*
* Purpose: The start of the program, determines which major paths to take
* Arguments:
* Notes:
*/
async function main(allConfig) {
  const c = await set.config(allConfig)
  const {fileOutputFile, balancedOutputFile} = c.paths.absolute.fileLevel
  const {caseOutputFile} = c.paths.absolute.testCaseLevel
  const mochaReport = c.paths.absolute.mochaReport

  //wait for mochawesome report to finish generating
  await check.fileExistenceWithTimeout(mochaReport, 10000)
  await sleep.sleep(2000) //file isn't done waiting, give it a few seconds to make sure its usable

  await create.directory(c.absOutputDir)

  const updatedTcData = getTcData(clone.safeClone(caseOutputFile), clone.safeClone(mochaReport))
  const updatedFileData = getFileData(updatedTcData, clone.safeClone(fileOutputFile))

  const balancedFileData = getBalancedFileData(updatedFileData, c.load_balancer.testRunnerCount)

  //write data
  await write.dataToFile(caseOutputFile, updatedTcData)
  await write.dataToFile(fileOutputFile, updatedFileData)
  await write.dataToFile(balancedOutputFile, balancedFileData)
}

if (require.main === module) {
  const config = require('./resources/testing/config')

  main(config);
}
module.exports = {balance: main}