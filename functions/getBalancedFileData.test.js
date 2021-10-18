const {getBalancedFileData} = require('./getBalancedFileData')

describe('Tests Code within getBalancedFileData.js', () => {
  it('Should test getBalancedFileData(data, amtOfRunners)', () => {
    const data = [
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
    const amtOfRunners = 2
    const expected = {
      "g1": {
        "files": [
          "cypress/integration/custom_examples/test_3.spec.js",
          "cypress/integration/custom_examples/test_2.spec.js",
          "cypress/integration/custom_examples/test_1.spec.js",
          "cypress/integration/custom_examples/test_1.spec.js"
        ],
        "estTotalDuration": 5346,
        "command": "npm run spec 'cypress/integration/custom_examples/test_3.spec.js','cypress/integration/custom_examples/test_2.spec.js','cypress/integration/custom_examples/test_1.spec.js','cypress/integration/custom_examples/test_1.spec.js',"
      },
      "g2": {
        "files": [
          "cypress/integration/custom_examples/test_3.spec.js",
          "cypress/integration/custom_examples/test_2.spec.js"
        ],
        "estTotalDuration": 5004,
        "command": "npm run spec 'cypress/integration/custom_examples/test_3.spec.js','cypress/integration/custom_examples/test_2.spec.js',"
      }
    }

    expect(getBalancedFileData(data, amtOfRunners)).toStrictEqual(expected)
  })
})