const {getTcData} = require('./getTcData')

describe('Tests Code within getTcData.js', () => {
  it('Should test getTcData(tcData, mochaData)', () => {
    const tcData = []
    const mochaData = {
      "stats": {
        "suites": 3,
        "tests": 6,
        "passes": 6,
        "pending": 0,
        "failures": 0,
        "start": "2021-09-20T01:38:34.436Z",
        "end": "2021-09-20T01:38:47.706Z",
        "duration": 10350,
        "testsRegistered": 6,
        "passPercent": 100,
        "pendingPercent": 0,
        "other": 0,
        "hasOther": false,
        "skipped": 0,
        "hasSkipped": false
      },
      "results": [
        {
          "uuid": "86bfa4f8-f8d3-43b6-a5f0-15be351695f7",
          "title": "",
          "fullFile": "cypress/integration/custom_examples/test_2.spec.js",
          "file": "cypress/integration/custom_examples/test_2.spec.js",
          "beforeHooks": [],
          "afterHooks": [],
          "tests": [],
          "suites": [
            {
              "uuid": "20a5b17f-b16b-4ebf-9a8f-15117338b62b",
              "title": "suite number 2",
              "fullFile": "",
              "file": "",
              "beforeHooks": [],
              "afterHooks": [],
              "tests": [
                {
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
                },
                {
                  "title": "suite2 test2",
                  "fullTitle": "suite number 2 suite2 test2",
                  "timedOut": null,
                  "duration": 2438,
                  "state": "passed",
                  "speed": "slow",
                  "pass": true,
                  "fail": false,
                  "pending": false,
                  "context": null,
                  "code": "cy.wait(Math.floor(Math.random() * 2000) + 1000);",
                  "err": {},
                  "uuid": "dd279514-6ffb-4958-91e5-493f30d7a0e3",
                  "parentUUID": "20a5b17f-b16b-4ebf-9a8f-15117338b62b",
                  "isHook": false,
                  "skipped": false
                }
              ],
              "suites": [],
              "passes": [
                "6f60081a-dc2f-423e-a17a-e6cff5b27053",
                "dd279514-6ffb-4958-91e5-493f30d7a0e3"
              ],
              "failures": [],
              "pending": [],
              "skipped": [],
              "duration": 3743,
              "root": false,
              "rootEmpty": false,
              "_timeout": 2000
            }
          ],
          "passes": [],
          "failures": [],
          "pending": [],
          "skipped": [],
          "duration": 0,
          "root": true,
          "rootEmpty": true,
          "_timeout": 2000
        },
        {
          "uuid": "d04b7a1d-3cc8-4f29-b5da-b57d8644b1fd",
          "title": "",
          "fullFile": "cypress/integration/custom_examples/test_3.spec.js",
          "file": "cypress/integration/custom_examples/test_3.spec.js",
          "beforeHooks": [],
          "afterHooks": [],
          "tests": [],
          "suites": [
            {
              "uuid": "9be1742c-3579-4129-bb58-a308cf2cfebc",
              "title": "suite number 3",
              "fullFile": "",
              "file": "",
              "beforeHooks": [],
              "afterHooks": [],
              "tests": [
                {
                  "title": "suite3 test1",
                  "fullTitle": "suite number 3 suite3 test1",
                  "timedOut": null,
                  "duration": 2700,
                  "state": "passed",
                  "speed": "slow",
                  "pass": true,
                  "fail": false,
                  "pending": false,
                  "context": null,
                  "code": "cy.wait(Math.floor(Math.random() * 3000) + 1000);",
                  "err": {},
                  "uuid": "4d95c008-8e15-4d03-bdbc-6561a6d64f7e",
                  "parentUUID": "9be1742c-3579-4129-bb58-a308cf2cfebc",
                  "isHook": false,
                  "skipped": false
                },
                {
                  "title": "suite3 test2",
                  "fullTitle": "suite number 3 suite3 test2",
                  "timedOut": null,
                  "duration": 2566,
                  "state": "passed",
                  "speed": "slow",
                  "pass": true,
                  "fail": false,
                  "pending": false,
                  "context": null,
                  "code": "cy.wait(Math.floor(Math.random() * 3000) + 1000);",
                  "err": {},
                  "uuid": "e47e5da8-13d8-4d31-9069-a59dfa96f5e4",
                  "parentUUID": "9be1742c-3579-4129-bb58-a308cf2cfebc",
                  "isHook": false,
                  "skipped": false
                }
              ],
              "suites": [],
              "passes": [
                "4d95c008-8e15-4d03-bdbc-6561a6d64f7e",
                "e47e5da8-13d8-4d31-9069-a59dfa96f5e4"
              ],
              "failures": [],
              "pending": [],
              "skipped": [],
              "duration": 5266,
              "root": false,
              "rootEmpty": false,
              "_timeout": 2000
            }
          ],
          "passes": [],
          "failures": [],
          "pending": [],
          "skipped": [],
          "duration": 0,
          "root": true,
          "rootEmpty": true,
          "_timeout": 2000
        },
        {
          "uuid": "dae3409c-647a-4533-bba3-fb486d53d993",
          "title": "",
          "fullFile": "cypress/integration/custom_examples/test_1.spec.js",
          "file": "cypress/integration/custom_examples/test_1.spec.js",
          "beforeHooks": [],
          "afterHooks": [],
          "tests": [],
          "suites": [
            {
              "uuid": "5ad3f73a-8386-4ccc-9233-f7f5905e762a",
              "title": "suite number 1",
              "fullFile": "",
              "file": "",
              "beforeHooks": [],
              "afterHooks": [],
              "tests": [
                {
                  "title": "suite1 test1",
                  "fullTitle": "suite number 1 suite1 test1",
                  "timedOut": null,
                  "duration": 455,
                  "state": "passed",
                  "speed": "slow",
                  "pass": true,
                  "fail": false,
                  "pending": false,
                  "context": null,
                  "code": "cy.wait(Math.floor(Math.random() * 1000) + 1);",
                  "err": {},
                  "uuid": "f5bc1d0f-6f4a-409c-9f24-308d0f172bcc",
                  "parentUUID": "5ad3f73a-8386-4ccc-9233-f7f5905e762a",
                  "isHook": false,
                  "skipped": false
                },
                {
                  "title": "suite1 test2",
                  "fullTitle": "suite number 1 suite1 test2",
                  "timedOut": null,
                  "duration": 886,
                  "state": "passed",
                  "speed": "slow",
                  "pass": true,
                  "fail": false,
                  "pending": false,
                  "context": null,
                  "code": "cy.wait(Math.floor(Math.random() * 1000) + 1);",
                  "err": {},
                  "uuid": "3b7c79be-3ebf-4d8d-b36a-c88583e8653a",
                  "parentUUID": "5ad3f73a-8386-4ccc-9233-f7f5905e762a",
                  "isHook": false,
                  "skipped": false
                }
              ],
              "suites": [],
              "passes": [
                "f5bc1d0f-6f4a-409c-9f24-308d0f172bcc",
                "3b7c79be-3ebf-4d8d-b36a-c88583e8653a"
              ],
              "failures": [],
              "pending": [],
              "skipped": [],
              "duration": 1341,
              "root": false,
              "rootEmpty": false,
              "_timeout": 2000
            }
          ],
          "passes": [],
          "failures": [],
          "pending": [],
          "skipped": [],
          "duration": 0,
          "root": true,
          "rootEmpty": true,
          "_timeout": 2000
        }
      ],
      "meta": {
        "mocha": {
          "version": "7.0.1"
        },
        "mochawesome": {
          "options": {
            "quiet": false,
            "reportFilename": "mochawesome",
            "saveHtml": false,
            "saveJson": true,
            "consoleReporter": "spec",
            "useInlineDiffs": false,
            "code": true
          },
          "version": "6.2.2"
        },
        "marge": {
          "options": {
            "reportDir": "cypress/reports/testCaseResults",
            "overwrite": false,
            "html": false,
            "json": true
          },
          "version": "5.2.0"
        }
      }
    }
    const expectedFirst = [
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
    const expectedSecond = [
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
        "lastRunState": "passed",
        "history": {
          "duration": [
            2438,
            2438
          ],
          "successful_runs": 2,
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
            2700,
            2700
          ],
          "successful_runs": 2,
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
            2566,
            2566
          ],
          "successful_runs": 2,
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
            455,
            455
          ],
          "successful_runs": 2,
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
            886,
            886
          ],
          "successful_runs": 2,
          "failure_runs": 0
        }
      }
    ]

    expect(getTcData(tcData, mochaData)).toStrictEqual(expectedFirst)
    expect(getTcData(tcData, mochaData)).toStrictEqual(expectedSecond)

  })
})