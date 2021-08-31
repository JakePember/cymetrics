const write = require("../utils/write");
const remove = require("./remove");

/*
* Purpose: Takes the cypress generated config, and creates a seperate configuration with only the information needed by
* this application. It will return this object to whoever calls it, and write a file with the same content
* Arguments:
*   @object CypressConfig - cypress generated config
* Notes:
*/
async function config(CypressConfig) {
  remove.file()
  const {
    outputDirectory,
    testCaseOutputFileName,
    fileOutputFileName,
    balancedFilesOutputFileName,
    testRunnerCount,
    mochawesomeReport
  } = CypressConfig.config.load_balancer

  const projectRoot = CypressConfig.config.projectRoot
  const absOutputDir = `${projectRoot}/${outputDirectory}`

  const localConfig = `${projectRoot}/resources/config.json`

  await remove.file(localConfig)
  
  const config = {
    "projectRoot": projectRoot,
    "absOutputDir": absOutputDir,
    "load_balancer": {
      "outputDirectory": outputDirectory,
      "testCaseOutputFileName": testCaseOutputFileName,
      "fileOutputFileName": fileOutputFileName,
      "balancedFilesOutputFileName": balancedFilesOutputFileName,
      "testRunnerCount": testRunnerCount,
      "mochawesomeReport": mochawesomeReport
    },
    "paths": {
      "absolute": {
        "fileLevel": {
          "fileOutputFile": `${absOutputDir}/${fileOutputFileName}.json`,
          "balancedOutputFile": `${absOutputDir}/${balancedFilesOutputFileName}.json`
        },
        "testCaseLevel": {
          "caseOutputFile": `${absOutputDir}/${testCaseOutputFileName}.json`
        },
        "mochaReport": `${projectRoot}/${mochawesomeReport}`
      }
    }
  }

  await write.dataToFile(localConfig, config)
  return config
}

module.exports = {config}