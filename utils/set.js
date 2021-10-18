/*
* Purpose: Takes the cypress generated config, and creates a separate configuration with only the information needed by
* this application. It will return this object to whoever calls it, and write a file with the same content
* Arguments:
*   @object CypressConfig - cypress generated config
* Notes:
*/
async function config(CypressConfig) {
  const {
    outputDirectory,
    testCaseOutputFileName,
    fileOutputFileName,
    balancedFilesOutputFileName,
    balancedTcOutputFileName,
    testRunnerCount,
    mochawesomeReport
  } = CypressConfig.config.load_balancer

  const projectRoot = CypressConfig.config.projectRoot
  const absOutputDir = `${projectRoot}/${outputDirectory}`

  return {
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
          "balancedFileOutputFile": `${absOutputDir}/${balancedFilesOutputFileName}.json`
        },
        "testCaseLevel": {
          "caseOutputFile": `${absOutputDir}/${testCaseOutputFileName}.json`,
          "balancedTcOutputFile": `${absOutputDir}/${balancedTcOutputFileName}.json`
        },
        "mochaReport": `${projectRoot}/${mochawesomeReport}`
      }
    }
  }
}

module.exports = {config}