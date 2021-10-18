const main = require('./main')
const write = require('./utils/write')
const create = require('./utils/create')

describe('Tests Code within main.js', () => {
  beforeEach(() => {
    // will make fs.existsSync(filePath) return true 1 time regardless of the filepath exists or not
    // noinspection JSCheckFunctionSignatures <reason: 3rd arg is optional for jest.spyOn. We do not need it, false postitve>
    jest.spyOn(create, "directory").mockImplementation(() => jest.fn())


    // will make fs.existsSync(filePath) return true 1 time regardless of the filepath exists or not
    // noinspection JSCheckFunctionSignatures <reason: 3rd arg is optional for jest.spyOn. We do not need it, false postitve>
    jest.spyOn(write, "dataToFile").mockImplementation(() => jest.fn())
  })
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Should test main.balance() With 3 test files, 6 test cases, all passing', async () => {
    const allConfig = {
      "config": {
        "projectRoot": "/Users/jacobbles/IdeaProjects/load_balancer",
        "load_balancer": {
          "outputDirectory": "resources/testing/output",
          "testCaseOutputFileName": "tcDataOutput",
          "fileOutputFileName": "fileDataOutput",
          "balancedFilesOutputFileName": "balancedFiles",
          "balancedTcOutputFileName": "balancedTestCases",
          "testRunnerCount": "2",
          "mochawesomeReport": "resources/testing/ALLmochawesomeMerged.json"
        }
      }
    }

    const caseOutputFile = "/Users/jacobbles/IdeaProjects/load_balancer/resources/testing/output/tcDataOutput.json"
    const updatedTcData = [
      {
        "file": "cypress/integration/custom_examples/test_2.spec.js",
        "title": "suite2 test1",
        "avg_duration": 1305,
        "success_rate": 1,
        "lastRunState": "passed",
        "history": {
          "duration": [
            1305
          ],
          "successful_runs": 1,
          "failure_runs": 0
        }
      },
      {
        "file": "cypress/integration/custom_examples/test_2.spec.js",
        "title": "suite2 test2",
        "avg_duration": 2438,
        "success_rate": 1,
        "lastRunState": "passed",
        "history": {
          "duration": [
            2438
          ],
          "successful_runs": 1,
          "failure_runs": 0
        }
      },
      {
        "file": "cypress/integration/custom_examples/test_3.spec.js",
        "title": "suite3 test1",
        "avg_duration": 2700,
        "success_rate": 1,
        "lastRunState": "passed",
        "history": {
          "duration": [
            2700
          ],
          "successful_runs": 1,
          "failure_runs": 0
        }
      },
      {
        "file": "cypress/integration/custom_examples/test_3.spec.js",
        "title": "suite3 test2",
        "avg_duration": 2566,
        "success_rate": 1,
        "lastRunState": "passed",
        "history": {
          "duration": [
            2566
          ],
          "successful_runs": 1,
          "failure_runs": 0
        }
      },
      {
        "file": "cypress/integration/custom_examples/test_1.spec.js",
        "title": "suite1 test1",
        "avg_duration": 455,
        "success_rate": 1,
        "lastRunState": "passed",
        "history": {
          "duration": [
            455
          ],
          "successful_runs": 1,
          "failure_runs": 0
        }
      },
      {
        "file": "cypress/integration/custom_examples/test_1.spec.js",
        "title": "suite1 test2",
        "avg_duration": 886,
        "success_rate": 1,
        "lastRunState": "passed",
        "history": {
          "duration": [
            886
          ],
          "successful_runs": 1,
          "failure_runs": 0
        }
      }
    ]
    const fileOutputFile = "/Users/jacobbles/IdeaProjects/load_balancer/resources/testing/output/fileDataOutput.json"
    const updatedFileData = [
      {
        "file": "cypress/integration/custom_examples/test_2.spec.js",
        "avg_duration": 3743,
        "success_rate": 1,
        "history": {
          "avg_duration": [
            3743
          ],
          "successful_runs": 1,
          "failure_runs": 0
        }
      },
      {
        "file": "cypress/integration/custom_examples/test_3.spec.js",
        "avg_duration": 5266,
        "success_rate": 1,
        "history": {
          "avg_duration": [
            5266
          ],
          "successful_runs": 1,
          "failure_runs": 0
        }
      },
      {
        "file": "cypress/integration/custom_examples/test_1.spec.js",
        "avg_duration": 1341,
        "success_rate": 1,
        "history": {
          "avg_duration": [
            1341
          ],
          "successful_runs": 1,
          "failure_runs": 0
        }
      }
    ]
    const balancedTcOutputFile = "/Users/jacobbles/IdeaProjects/load_balancer/resources/testing/output/balancedTestCases.json"
    const balancedTcData = {
      "g1": {
        "title": [
          "suite3 test1",
          "suite2 test1",
          "suite1 test2",
          "suite1 test1"
        ],
        "estTotalDuration": 5346
      },
      "g2": {
        "title": [
          "suite3 test2",
          "suite2 test2"
        ],
        "estTotalDuration": 5004
      }
    }
    const balancedFileOutputFile = "/Users/jacobbles/IdeaProjects/load_balancer/resources/testing/output/balancedFiles.json"
    const balancedFileData = {
      "g1": {
        "files": [
          "cypress/integration/custom_examples/test_3.spec.js"
        ],
        "estTotalDuration": 5266,
        "command": "npm run spec 'cypress/integration/custom_examples/test_3.spec.js',"
      },
      "g2": {
        "files": [
          "cypress/integration/custom_examples/test_2.spec.js",
          "cypress/integration/custom_examples/test_1.spec.js"
        ],
        "estTotalDuration": 5084,
        "command": "npm run spec 'cypress/integration/custom_examples/test_2.spec.js','cypress/integration/custom_examples/test_1.spec.js',"
      }
    }

    await main.balance(allConfig)

    expect(write.dataToFile).toHaveBeenNthCalledWith(1, caseOutputFile, updatedTcData)
    expect(write.dataToFile).toHaveBeenNthCalledWith(2, fileOutputFile, updatedFileData)
    expect(write.dataToFile).toHaveBeenNthCalledWith(3, balancedTcOutputFile, balancedTcData)
    expect(write.dataToFile).toHaveBeenNthCalledWith(4, balancedFileOutputFile, balancedFileData)
  })
  it('Should test main.balance() With 1 test file, 2 test cases, all passing', async () => {
    const allConfig = {
      "config": {
        "projectRoot": "/Users/jacobbles/IdeaProjects/load_balancer",
        "load_balancer": {
          "outputDirectory": "resources/testing/output",
          "testCaseOutputFileName": "tcDataOutput",
          "fileOutputFileName": "fileDataOutput",
          "balancedFilesOutputFileName": "balancedFiles",
          "balancedTcOutputFileName": "balancedTestCases",
          "testRunnerCount": "2",
          "mochawesomeReport": "resources/testing/3passedmochawesomeMerged.json"
        }
      }
    }

    const caseOutputFile = "/Users/jacobbles/IdeaProjects/load_balancer/resources/testing/output/tcDataOutput.json"
    const updatedTcData = [
      {
        "file": "cypress/integration/custom_examples/test_3.spec.js",
        "title": "suite3 test1",
        "avg_duration": 1559,
        "success_rate": 1,
        "lastRunState": "passed",
        "history": {
          "duration": [
            1559
          ],
          "successful_runs": 1,
          "failure_runs": 0
        }
      },
      {
        "file": "cypress/integration/custom_examples/test_3.spec.js",
        "title": "suite3 test2",
        "avg_duration": 3427,
        "success_rate": 1,
        "lastRunState": "passed",
        "history": {
          "duration": [
            3427
          ],
          "successful_runs": 1,
          "failure_runs": 0
        }
      }
    ]
    const fileOutputFile = "/Users/jacobbles/IdeaProjects/load_balancer/resources/testing/output/fileDataOutput.json"
    const updatedFileData = [
      {
        "file": "cypress/integration/custom_examples/test_3.spec.js",
        "avg_duration": 4986,
        "success_rate": 1,
        "history": {
          "avg_duration": [
            4986
          ],
          "successful_runs": 1,
          "failure_runs": 0
        }
      }
    ]
    const balancedTcOutputFile = "/Users/jacobbles/IdeaProjects/load_balancer/resources/testing/output/balancedTestCases.json"
    const balancedTcData = {
      "g1": {
        "title": [
          "suite3 test2"
        ],
        "estTotalDuration": 3427
      },
      "g2": {
        "title": [
          "suite3 test1"
        ],
        "estTotalDuration": 1559
      }
    }
    const balancedFileOutputFile = "/Users/jacobbles/IdeaProjects/load_balancer/resources/testing/output/balancedFiles.json"
    const balancedFileData = {}

    await main.balance(allConfig)

    expect(write.dataToFile).toHaveBeenNthCalledWith(1, caseOutputFile, updatedTcData)
    expect(write.dataToFile).toHaveBeenNthCalledWith(2, fileOutputFile, updatedFileData)
    expect(write.dataToFile).toHaveBeenNthCalledWith(3, balancedTcOutputFile, balancedTcData)
    expect(write.dataToFile).toHaveBeenNthCalledWith(4, balancedFileOutputFile, balancedFileData)
  })
  it('Should test main.balance() With 1 test file, 2 test cases, 1 test case failed', async () => {
    const allConfig = {
      "config": {
        "projectRoot": "/Users/jacobbles/IdeaProjects/load_balancer",
        "load_balancer": {
          "outputDirectory": "resources/testing/output",
          "testCaseOutputFileName": "tcDataOutput",
          "fileOutputFileName": "fileDataOutput",
          "balancedFilesOutputFileName": "balancedFiles",
          "balancedTcOutputFileName": "balancedTestCases",
          "testRunnerCount": "2",
          "mochawesomeReport": "resources/testing/3failedmochawesomeMerged.json"
        }
      }
    }

    const caseOutputFile = "/Users/jacobbles/IdeaProjects/load_balancer/resources/testing/output/tcDataOutput.json"
    const updatedTcData = [
      {
        "file": "cypress/integration/custom_examples/test_3.spec.js",
        "title": "suite3 test1",
        "avg_duration": 592,
        "success_rate": 0,
        "lastRunState": "failed",
        "history": {
          "duration": [
            592
          ],
          "successful_runs": 0,
          "failure_runs": 1
        }
      },
      {
        "file": "cypress/integration/custom_examples/test_3.spec.js",
        "title": "suite3 test2",
        "avg_duration": 3128,
        "success_rate": 1,
        "lastRunState": "passed",
        "history": {
          "duration": [
            3128
          ],
          "successful_runs": 1,
          "failure_runs": 0
        }
      }
    ]
    const fileOutputFile = "/Users/jacobbles/IdeaProjects/load_balancer/resources/testing/output/fileDataOutput.json"
    const updatedFileData = [
      {
        "file": "cypress/integration/custom_examples/test_3.spec.js",
        "avg_duration": 3720,
        "success_rate": 0,
        "history": {
          "avg_duration": [
            3720
          ],
          "successful_runs": 0,
          "failure_runs": 1
        }
      }
    ]
    const balancedTcOutputFile = "/Users/jacobbles/IdeaProjects/load_balancer/resources/testing/output/balancedTestCases.json"
    const balancedTcData = {
      "g1": {
        "title": [
          "suite3 test2"
        ],
        "estTotalDuration": 3128
      },
      "g2": {
        "title": [
          "suite3 test1"
        ],
        "estTotalDuration": 592
      }
    }
    const balancedFileOutputFile = "/Users/jacobbles/IdeaProjects/load_balancer/resources/testing/output/balancedFiles.json"
    const balancedFileData = {}

    await main.balance(allConfig)

    expect(write.dataToFile).toHaveBeenNthCalledWith(1, caseOutputFile, updatedTcData)
    expect(write.dataToFile).toHaveBeenNthCalledWith(2, fileOutputFile, updatedFileData)
    expect(write.dataToFile).toHaveBeenNthCalledWith(3, balancedTcOutputFile, balancedTcData)
    expect(write.dataToFile).toHaveBeenNthCalledWith(4, balancedFileOutputFile, balancedFileData)
  })
})