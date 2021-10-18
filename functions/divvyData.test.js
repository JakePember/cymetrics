const divvyData = require('./divvyData')

describe('Tests Code within getTcData.js', () => {
  it('Should test divvyData.divvyFileData(runners, data)', () => {
    const runners = {
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
    const data = [
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
          "cypress/integration/custom_examples/test_2.spec.js",
          "cypress/integration/custom_examples/test_1.spec.js"
        ],
        "estTotalDuration": 5084,
        "command": "npm run spec 'cypress/integration/custom_examples/test_2.spec.js','cypress/integration/custom_examples/test_1.spec.js',"
      }
    }

    expect(divvyData.divvyFileData(runners, data)).toStrictEqual(expected)
  })

  it('Should test divvyData.divvyTcData(runners, data)', () => {
    const runners = {
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
    const data = [
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
    const expected = {
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

    expect(divvyData.divvyTcData(runners, data)).toStrictEqual(expected)
  })
})