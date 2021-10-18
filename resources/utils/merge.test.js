const merge = require('./merge')

describe('Tests Code within merge.js', () => {
  it('Should test merge.getSuccessRate(report, index)', () => {
    // no inspection because false positive, __get__ is brought in by the babel-plugin-rewire plugin found in
    // babel.config.js. This is used in order to test a non-exported, or private function
    // noinspection JSUnresolvedFunction
    const getSuccessRate = merge.__get__('getSuccessRate')
    const report = [
      {
        "file": "cypress/integration/custom_examples/test_2.spec.js",
        "title": "suite2 test1",
        "avg_duration": 1305,
        "success_rate": 1,
        "lastRunState": "passed",
        "history": {
          "duration": [
            1305,
            1305
          ],
          "successful_runs": 2,
          "failure_runs": 7
        }
      }
    ]
    const index = 0

    expect(getSuccessRate(report, index)).toBe(0.22)
  })
  it('Should test merge.getAvgDurationTcLevel(report, index)', () => {
    // no inspection because false positive, __get__ is brought in by the babel-plugin-rewire plugin found in
    // babel.config.js. This is used in order to test a non-exported, or private function
    // noinspection JSUnresolvedFunction
    const getAvgDurationTcLevel = merge.__get__('getAvgDurationTcLevel')
    const report = [
      {
        "file": "cypress/integration/custom_examples/test_2.spec.js",
        "title": "suite2 test1",
        "avg_duration": 1500,
        "success_rate": 1,
        "lastRunState": "passed",
        "history": {
          "duration": [
            1000,
            2000
          ],
          "successful_runs": 2,
          "failure_runs": 7
        }
      }
    ]
    const index = 0

    expect(getAvgDurationTcLevel(report, index)).toBe(1500)
  })
  it('Should test merge.getAvgDurationFileLevel(report, index)', () => {
    // no inspection because false positive, __get__ is brought in by the babel-plugin-rewire plugin found in
    // babel.config.js. This is used in order to test a non-exported, or private function
    // noinspection JSUnresolvedFunction
    const getAvgDurationFileLevel = merge.__get__('getAvgDurationFileLevel')
    const report = [
      {
        "file": "cypress/integration/custom_examples/test_1.spec.js",
        "avg_duration": 1341,
        "success_rate": 1,
        "history": {
          "avg_duration": [
            1000,
            3000
          ],
          "successful_runs": 2,
          "failure_runs": 0
        }
      }
    ]
    const index = 0

    expect(getAvgDurationFileLevel(report, index)).toBe(2000)
  })
  it('Should test merge.testCases(historyReport, titleMatchIndex, test)', () => {
    const historyReport = [
      {
        "file": "cypress/integration/custom_examples/test_2.spec.js",
        "title": "suite2 test1",
        "avg_duration": 1305,
        "success_rate": 1,
        "lastRunState": "skipped",
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
        "lastRunState": "skipped",
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
        "lastRunState": "skipped",
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
        "lastRunState": "skipped",
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
        "lastRunState": "skipped",
        "history": {
          "duration": [
            886
          ],
          "successful_runs": 1,
          "failure_runs": 0
        }
      }
    ]
    const titleMatchIndex = 0
    const testPassed = {
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
    const testFailed = {
      "title": "suite2 test1",
      "fullTitle": "suite number 2 suite2 test1",
      "timedOut": null,
      "duration": 9000,
      "state": "failed",
      "speed": "slow",
      "pass": false,
      "fail": true,
      "pending": false,
      "context": null,
      "code": "cy.wait(Math.floor(Math.random() * 2000) + 1000);",
      "err": {},
      "uuid": "6f60081a-dc2f-423e-a17a-e6cff5b27053",
      "parentUUID": "20a5b17f-b16b-4ebf-9a8f-15117338b62b",
      "isHook": false,
      "skipped": false
    }
    const expectedPassed = [
      {
        "file": "cypress/integration/custom_examples/test_2.spec.js",
        "title": "suite2 test1",
        "avg_duration": 1305,
        "success_rate": 1,
        "lastRunState": "passed",
        "history": {
          "duration": [
            1305,
            1305
          ],
          "successful_runs": 2,
          "failure_runs": 0
        }
      },
      {
        "file": "cypress/integration/custom_examples/test_2.spec.js",
        "title": "suite2 test2",
        "avg_duration": 2438,
        "success_rate": 1,
        "lastRunState": "skipped",
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
        "lastRunState": "skipped",
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
        "lastRunState": "skipped",
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
        "lastRunState": "skipped",
        "history": {
          "duration": [
            886
          ],
          "successful_runs": 1,
          "failure_runs": 0
        }
      }
    ]
    const expectedFailed = [
      {
        "file": "cypress/integration/custom_examples/test_2.spec.js",
        "title": "suite2 test1",
        "avg_duration": 5153,
        "success_rate": 0.5,
        "lastRunState": "failed",
        "history": {
          "duration": [
            1305,
            9000
          ],
          "successful_runs": 1,
          "failure_runs": 1
        }
      },
      {
        "file": "cypress/integration/custom_examples/test_2.spec.js",
        "title": "suite2 test2",
        "avg_duration": 2438,
        "success_rate": 1,
        "lastRunState": "skipped",
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
        "lastRunState": "skipped",
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
        "lastRunState": "skipped",
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
        "lastRunState": "skipped",
        "history": {
          "duration": [
            886
          ],
          "successful_runs": 1,
          "failure_runs": 0
        }
      }
    ]

    expect(merge.testCases(historyReport, titleMatchIndex, testPassed)).toStrictEqual(expectedPassed)
    expect(merge.testCases(historyReport, titleMatchIndex, testFailed)).toStrictEqual(expectedFailed)
  })
  it('Should test merge.fileData(historyReport, fileMatchIndex, newDataPoint)', () => {
    const historyReport = [
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
    const titleMatchIndex = 0
    const newDataPointPassed = {
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
    const newDataPointFailed = {
      "file": "cypress/integration/custom_examples/test_1.spec.js",
      "avg_duration": 2374,
      "success_rate": 0,
      "history": {
        "avg_duration": [
          1341
        ],
        "successful_runs": 0,
        "failure_runs": 1
      }
    }
    const expectedPassed = [
      {
        "file": "cypress/integration/custom_examples/test_1.spec.js",
        "avg_duration": 1341,
        "success_rate": 1,
        "history": {
          "avg_duration": [
            1341,
            1341
          ],
          "successful_runs": 2,
          "failure_runs": 0
        }
      }
    ]
    const expectedFailed = [
      {
        "file": "cypress/integration/custom_examples/test_1.spec.js",
        "avg_duration": 1858,
        "success_rate": 0.5,
        "history": {
          "avg_duration": [
            1341,
            2374
          ],
          "successful_runs": 1,
          "failure_runs": 1
        }
      }
    ]
    expect(merge.fileData(historyReport, titleMatchIndex, newDataPointPassed)).toEqual(expectedPassed)
    expect(merge.fileData(historyReport, titleMatchIndex, newDataPointFailed)).toEqual(expectedFailed)
  })
})