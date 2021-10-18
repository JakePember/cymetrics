const set = require('./set')

describe('Tests Code within set.js', () => {
  it('Should test set.config(CypressConfig)', async () => {
    const input = {
      "config": {
        "projectRoot": "/Users/jacobbles/IdeaProjects/load_balancer",
        "load_balancer": {
          "outputDirectory": "resources/testing/output",
          "testCaseOutputFileName": "tcDataOutput",
          "fileOutputFileName": "fileDataOutput",
          "balancedFilesOutputFileName": "balancedFiles",
          "balancedTcOutputFileName": "balancedTestCases",
          "testRunnerCount": "2",
          "mochawesomeReport": "resources/testing/mochawesomeMerged.json"
        }
      }
    }
    const expected  = {
      "projectRoot": "/Users/jacobbles/IdeaProjects/load_balancer",
      "absOutputDir": "/Users/jacobbles/IdeaProjects/load_balancer/resources/testing/output",
      "load_balancer": {
        "outputDirectory": "resources/testing/output",
        "testCaseOutputFileName": "tcDataOutput",
        "fileOutputFileName": "fileDataOutput",
        "balancedFilesOutputFileName": "balancedFiles",
        "testRunnerCount": "2",
        "mochawesomeReport": "resources/testing/mochawesomeMerged.json"
      },
      "paths": {
        "absolute": {
          "fileLevel": {
            "fileOutputFile": "/Users/jacobbles/IdeaProjects/load_balancer/resources/testing/output/fileDataOutput.json",
            "balancedFileOutputFile": "/Users/jacobbles/IdeaProjects/load_balancer/resources/testing/output/balancedFiles.json"
          },
          "testCaseLevel": {
            "caseOutputFile": "/Users/jacobbles/IdeaProjects/load_balancer/resources/testing/output/tcDataOutput.json",
            "balancedTcOutputFile": "/Users/jacobbles/IdeaProjects/load_balancer/resources/testing/output/balancedTestCases.json"
          },
          "mochaReport": "/Users/jacobbles/IdeaProjects/load_balancer/resources/testing/mochawesomeMerged.json"
        }
      }
    }
      expect(await set.config(input)).toStrictEqual(expected)
  })
})