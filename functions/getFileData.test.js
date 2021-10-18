const {getFileData} = require('./getFileData')

describe('Tests Code within getFileData.js', () => {
  it('Should test getFileData(tcData, fileData)', () => {
    const tcData = [
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
    const fileData = []
    const expectedFirst = [
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
    const expectedSecond = [
      {
        "file": "cypress/integration/custom_examples/test_2.spec.js",
        "avg_duration": 3743,
        "success_rate": 1,
        "history": {
          "avg_duration": [
            3743,
            3743
          ],
          "successful_runs": 2,
          "failure_runs": 0
        }
      },
      {
        "file": "cypress/integration/custom_examples/test_3.spec.js",
        "avg_duration": 5266,
        "success_rate": 1,
        "history": {
          "avg_duration": [
            5266,
            5266
          ],
          "successful_runs": 2,
          "failure_runs": 0
        }
      },
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

    expect(getFileData(tcData, fileData)).toStrictEqual(expectedFirst)
    expect(getFileData(tcData, expectedFirst)).toStrictEqual(expectedSecond)
  })
})