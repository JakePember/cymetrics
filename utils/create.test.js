const create = require('./create')
const fs = require("fs");

describe('Tests Code within create.js', () => {
  it('Should test create.testCaseObj(file, test)', () => {
    const file = "cypress/integration/custom_examples/test_2.spec.js"
    const testPass = {
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
    const testFail = {
      "title": "suite2 test1",
      "fullTitle": "suite number 2 suite2 test1",
      "timedOut": null,
      "duration": 1305,
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
    const resultPass = {
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
    }
    const resultFail = {
      "file": "cypress/integration/custom_examples/test_2.spec.js",
      "title": "suite2 test1",
      "avg_duration": 1305,
      "success_rate": 0,
      "lastRunState": "failed",
      "history": {
        "duration": [
          1305
        ],
        "successful_runs": 0,
        "failure_runs": 1
      }
    }

    expect(create.testCaseObj(file, testPass)).toStrictEqual(resultPass)
    expect(create.testCaseObj(file, testFail)).toStrictEqual(resultFail)
    expect(() => create.testCaseObj(file, {})).toThrow()
  })
  it('Should test create.fileObj(data)', () => {
    const dataPass = {
      "file": "cypress/integration/custom_examples/test_2.spec.js",
      "avg_duration": 3743,
      "allTestsPassed": true
    }
    const dataFail = {
      "file": "cypress/integration/custom_examples/test_2.spec.js",
      "avg_duration": 3743,
      "allTestsPassed": false
    }
    const resultsPass = {
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
    }
    const resultsFail = {
      "file": "cypress/integration/custom_examples/test_2.spec.js",
      "avg_duration": 3743,
      "success_rate": 0,
      "history": {
        "avg_duration": [
          3743
        ],
        "successful_runs": 0,
        "failure_runs": 1
      }
    }
    expect(create.fileObj(dataPass)).toStrictEqual(resultsPass)
    expect(create.fileObj(dataFail)).toStrictEqual(resultsFail)
  })
  it('Should test create.directory(directory)', () => {
    // noinspection JSCheckFunctionSignatures <reason: 3rd arg is optional for jest.spyOn. We do not need it, false postitve>
    jest.spyOn(fs, "mkdirSync").mockImplementation(() => jest.fn())

    //mock fs.existsSync() 1 time so it will not through an error
    // noinspection JSCheckFunctionSignatures <reason: 3rd arg is optional for jest.spyOn. We do not need it, false postitve>
    jest.spyOn(fs, "existsSync").mockImplementationOnce(() => jest.fn())
    create.directory("/some/dir")

    //this time existsSync will not be mocked
    create.directory("/some/dir")
  })
})