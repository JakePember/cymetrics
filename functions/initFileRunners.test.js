const initFileRunners = require('./initFileRunners')

describe('Tests Code within initFileRunners.js', () => {
  it('Should test initFileRunners.initFileRunners(data, amtOfRunners)', () => {
    const dataHappyPath = [
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
    const dataException = [
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
    const amtOfRunners = 2
    const expected = {
      "g1": {
        "files": [
          "cypress/integration/custom_examples/test_3.spec.js"
        ],
        "estTotalDuration": 5266,
        "command": "npm run spec 'cypress/integration/custom_examples/test_3.spec.js',"
      },
      "g2": {
        "files": [
          "cypress/integration/custom_examples/test_2.spec.js"
        ],
        "estTotalDuration": 3743,
        "command": "npm run spec 'cypress/integration/custom_examples/test_2.spec.js',"
      }
    }

    expect(initFileRunners.initFileRunners(dataHappyPath, amtOfRunners)).toStrictEqual(expected)
    expect(() => initFileRunners.initFileRunners(dataException, amtOfRunners)).toThrow()
  })

  it('Should test initFileRunners.initTcRunners(data, amtOfRunners)', () => {
    const data = [
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
      }
    ]
    const amtOfRunners = 2
    const expected = {
      "g1": {
        "title": [
          "suite3 test1"
        ],
        "estTotalDuration": 2700
      },
      "g2": {
        "title": [
          "suite3 test2"
        ],
        "estTotalDuration": 2566
      }
    }

    expect(initFileRunners.initTcRunners(data, amtOfRunners)).toStrictEqual(expected)
  })
})