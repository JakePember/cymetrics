const find = require('./find')

describe('Tests Code within find.js', () => {
  it('Should test find.index(type, title, report)', async () => {
    const NOT_FOUND = -1
    const FOUND = 0
    const titleNotFound = "suite2 test2"
    const fileNotFound = "cypress/integration/custom_examples/test_1.spec.js"
    const titleFound = "suite2 test1"
    const fileFound = "cypress/integration/custom_examples/test_2.spec.js"
    const report = [
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
      }
    ]
    expect(find.index('title', titleNotFound, report)).toBe(NOT_FOUND)
    expect(find.index('title', titleFound, report)).toBeGreaterThanOrEqual(FOUND)

    expect(find.index('file', fileNotFound, report)).toBe(NOT_FOUND)
    expect(find.index('file', fileFound, report)).toBeGreaterThanOrEqual(FOUND)

  })
})