const clone = require("./utils/clone")
const write = require('./utils/write')
const create = require("./utils/create");
const sleep = require("./utils/sleep")
const check = require("./utils/check");

const {getTcData} = require('./functions/getTcData')
const {getFileData} = require("./functions/getFileData");
/*
* Purpose: The start of the program, determines which major paths to take
* Arguments:
* Notes:
*/
async function main(allConfig) {
  const {
    outputDirectory,
    testCaseOutputFileName,
    fileOutputFileName,
    mochawesomeReport
  } = allConfig.config.load_balancer
  const projectRoot = allConfig.config.projectRoot

  const absMochaReportFile = `${projectRoot}/${mochawesomeReport}`
  const absTcLevelOutFile = `${projectRoot}/${outputDirectory}/${testCaseOutputFileName}.json`
  const absFileLevelOutFile = `${projectRoot}/${outputDirectory}/${fileOutputFileName}.json`
  const absOutputDir = `${projectRoot}/${outputDirectory}`

  //wait for mochawesome report to finish generating
  await check.fileExistenceWithTimeout(absMochaReportFile, 10000)
  await sleep.sleep(2000) //file isn't done waiting, give it a few seconds to make sure its usable

  await create.directory(absOutputDir)

  //gather data
  const mochaData = clone.safeClone(absMochaReportFile)
  const currTcData = clone.safeClone(absTcLevelOutFile)
  const currFileData = clone.safeClone(absFileLevelOutFile)

  const updatedTcData = getTcData(currTcData, mochaData)
  const updatedFileData = getFileData(updatedTcData, currFileData)

  //write data
  await write.dataToFile(absTcLevelOutFile, updatedTcData)
  await write.dataToFile(absFileLevelOutFile, updatedFileData)
}

if (require.main === module) {
  const config = require('./resources/testing/config')

  main(config);
}
module.exports = {balance: main}