const group = require('./group')

describe('Tests Code within group.js', () => {
  it('Should test group.testCasesByFile(testCases)', () => {
    const testCases = [
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
    const expected = {
      "cypress/integration/custom_examples/test_2.spec.js": [
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
        }
      ],
      "cypress/integration/custom_examples/test_3.spec.js": [
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
        }
      ],
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
    expect(group.testCasesByFile(testCases)).toEqual(expected)
  })
})