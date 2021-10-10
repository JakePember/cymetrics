const add = require('./add')

describe('Tests Code within add.js', () => {
  it('Should test add.testData(file, test, report)', () => {
    const inputFile = "cypress/integration/custom_examples/test_2.spec.js"
    const inputTestExisted = {
      "title": "suite2 test1",
      "fullTitle": "suite number 2 suite2 test1",
      "timedOut": null,
      "duration": 1305,
      "state": "passed",
      "speed": "slow",
      "pass": true,
      "fail": false,
      "pending": false,
      "context": null,
      "code": "cy.wait(Math.floor(Math.random() * 2000) + 1000);",
      "err": {},
      "uuid": "6f60081a-dc2f-423e-a17a-e6cff5b27053",
      "parentUUID": "20a5b17f-b16b-4ebf-9a8f-15117338b62b",
      "isHook": false,
      "skipped": false
    }
    const inputTestNew = {
      "title": "suite2 test2",
      "fullTitle": "suite number 2 suite2 test2",
      "timedOut": null,
      "duration": 1305,
      "state": "passed",
      "speed": "slow",
      "pass": true,
      "fail": false,
      "pending": false,
      "context": null,
      "code": "cy.wait(Math.floor(Math.random() * 2000) + 1000);",
      "err": {},
      "uuid": "6f60081a-dc2f-423e-a17a-e6cff5b27053",
      "parentUUID": "20a5b17f-b16b-4ebf-9a8f-15117338b62b",
      "isHook": false,
      "skipped": false
    }
    const inputReport = [
      {
        "file": "cypress/integration/custom_examples/test_2.spec.js",
        "title": "suite2 test1",
        "avg_duration": 1076,
        "success_rate": 0.5,
        "lastRunState": "skipped",
        "history": {
          "duration": [
            592,
            1559
          ],
          "successful_runs": 1,
          "failure_runs": 1
        }
      }
    ]
    const expectedExisted = [
      {
        "file": "cypress/integration/custom_examples/test_2.spec.js",
        "title": "suite2 test1",
        "avg_duration": 1152,
        "success_rate": 0.67,
        "lastRunState": "passed",
        "history": {
          "duration": [
            592,
            1559,
            1305
          ],
          "successful_runs": 2,
          "failure_runs": 1
        }
      }
    ]
    const expectedNew = [
      {
        "file": "cypress/integration/custom_examples/test_2.spec.js",
        "title": "suite2 test1",
        "avg_duration": 1152,
        "success_rate": 0.67,
        "lastRunState": "passed",
        "history": {
          "duration": [
            592,
            1559,
            1305
          ],
          "successful_runs": 2,
          "failure_runs": 1
        }
      },
      {
        "file": "cypress/integration/custom_examples/test_2.spec.js",
        "title": "suite2 test2",
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
      }
    ]

    //Test data existed already
    expect(add.testData(inputFile, inputTestExisted, inputReport)).toStrictEqual(expectedExisted)
    expect(add.testData(inputFile, inputTestNew, inputReport)).toStrictEqual(expectedNew)
  })
  it('Should test get.fileData(tcGroupedByFileReport, fileGrouping, report)', () => {
    const inputTcGroupedByFileReportPassed = {
      "cypress/integration/custom_examples/test_1.spec.js": [
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
    }
    const inputTcGroupedByFileReportFailed = {
      "cypress/integration/custom_examples/test_1.spec.js": [
        {
          "file": "cypress/integration/custom_examples/test_1.spec.js",
          "title": "suite1 test1",
          "avg_duration": 455,
          "success_rate": 0,
          "lastRunState": "failed",
          "history": {
            "duration": [
              455
            ],
            "successful_runs": 0,
            "failure_runs": 1
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
    }
    const inputTcGroupedByFileReportSkipped = {
      "cypress/integration/custom_examples/test_1.spec.js": [
        {
          "file": "cypress/integration/custom_examples/test_1.spec.js",
          "title": "suite1 test1",
          "avg_duration": 455,
          "success_rate": 1,
          "lastRunState": "skipped",
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
    }
    const inputFileGrouping = 'cypress/integration/custom_examples/test_1.spec.js'

    const inputReportExisted = [
      {
        "file": "cypress/integration/custom_examples/test_1.spec.js",
        "avg_duration": 4037,
        "success_rate": 0.5,
        "history": {
          "avg_duration": [
            3720,
            4354
          ],
          "successful_runs": 1,
          "failure_runs": 1
        }
      }
    ]
    const inputReportNew = []
    const expectedExisted = [
      {
        "file": "cypress/integration/custom_examples/test_1.spec.js",
        "avg_duration": 3138,
        "success_rate": 0.67,
        "history": {
          "avg_duration": [
            3720,
            4354,
            1341
          ],
          "successful_runs": 2,
          "failure_runs": 1
        }
      }
    ]
    const expectedNew = [
      {
        "file": "cypress/integration/custom_examples/test_1.spec.js",
        "avg_duration": 1341,
        "success_rate": 0,
        "history": {
          "avg_duration": [
            1341
          ],
          "successful_runs": 0,
          "failure_runs": 1
        }
      }
    ]

    //existing file and all tests passed
    expect(add.fileData(inputTcGroupedByFileReportPassed, inputFileGrouping, inputReportExisted)).toStrictEqual(expectedExisted)
    //new file and all tests did not pass
    expect(add.fileData(inputTcGroupedByFileReportFailed, inputFileGrouping, inputReportNew)).toStrictEqual(expectedNew)
    // All tests did not run (at least one test was skipped)
    expect(add.fileData(inputTcGroupedByFileReportSkipped, inputFileGrouping, inputReportNew)).toStrictEqual([])
  })
})