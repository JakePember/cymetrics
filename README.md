Table of Contents
---------------------

* [Introduction](#introduction)
* [Example](#example)
* [Requirements](#requirements)
* [Installation](#installation)
* [Options](#Options)
* [Maintainers](#maintainers)

INTRODUCTION
------------
Cy-Metrics is a Cypress post process that looks at durations on an individual test case
level and at a file level, to determine the fastest completion time for the amount of test
runners available. The average duration of multiple runs will be used, so the more Cy-Metrics
is used, the more accurate it becomes. Check out the [scenario section](#requirements) for
a better understanding of Cy-Metrics.

Example
-------
###Scenario
The Cypress test suite contains 4 files and each file contains 2 test cases. We normally run this suite
nightly on a single Jenkins runner. We recently got a second Jenkins test runner and would like to as evenly
as possible distribute the tests between our 2 test runners in order to get the shortest overall test duration.

After one run of the entire test suite we get the following information:
- file_1.js: 10 minutes
  - tc_1.1:......2 minutes
  - tc_1.2:......8 minutes
- file_2.js: 2 minutes
  - tc_2.1.......1 minute
  - tc_2.2.......1 minute
- file_3.js: 15 minutes
  - tc_3.1:......3 minutes
  - tc_3.2:......12 minutes
- file_4.js: 9 minutes
  - tc_4.1:......4 minutes
  - tc_4.2:......5 minutes

Total Runtime WITHOUT Cy-Metrics: 36 minutes

Cy-Metrics will now take this information and find the shortest overall duration possible given 2 test runners.

###Cy-Metric Test Case Level Output
Scenario output at the test case level: (Total Runtime WITH Cy-Metrics: 18 minutes)
- Test Runner 1
  - tc_3.2.......12 minutes 
  - tc_4.1.......4 minutes
  - tc_1.1.......2 minutes
- Test Runner 2
  - tc_1.2.......8 minutes
  - tc_4.2.......5 minutes
  - tc_3.1.......3 minutes
  - tc_2.1.......1 minute
  - tc_2.2.......1 minute

Real output would look something like this:
```json
{
  "g1": {
    "files": [
      "tc_3.2",
      "tc_4.1",
      "tc_1.1"
    ],
    "estTotalDuration": 1080000
  },
  "g2": {
    "files": [
      "tc_1.2",
      "tc_4.2",
      "tc_3.1",
      "tc_2.1",
      "tc_2.2"
    ],
    "estTotalDuration": 1080000
  }
}
```

###Cy-Metric File Level Output
Scenario output at the file level: (Total Runtime WITH Cy-Metrics: 19 minutes)
- Test Runner 1
  - file_3.js...... 15 minutes
  - file_2.js.... 2 minutes
- Test Runner 2
  - file_1.js.....10 minutes
  - file_4.js.......9 minutes

Real output would look something like this:
```json
{
  "g1": {
    "title": [
      "cypress/integration/file_3.js",
      "cypress/integration/file_2.js"
    ],
    "estTotalDuration": 1080000
  },
  "g2": {
    "title": [
      "cypress/integration/file_1.js",
      "cypress/integration/file_4.js"
    ],
    "estTotalDuration": 1080000
  }
}
```

REQUIREMENTS
------------
Cy-Metrics requires [Mochawesome](https://www.npmjs.com/package/mochawesome) reporting as input to produce the final metrics.

INSTALLATION
------------
The following installations assumes you have met the requirements within
the [requirements section](#requirements).

### Mochawesome
* `npm install mocha --save-dev`
* `npm install cypress-multi-reporters --save-dev`
* `npm install mochawesome --save-dev`
* `npm install mochawesome-merge --save-dev`
* `npm install mochawesome-report-generator --save-dev`

Set the mochawesome reporter settings within the `cypress.json` file
```json
{
  "reporter": "mochawesome",
  "reporterOptions": {
    "reportDir": "cypress/reports/testCaseResults",
    "overwrite": false,
    "html": false,
    "json": true
  }
}
```

Add these lines to the `package.json` in the script section.
```json
{
  "scripts": {
    "clean-reports": "npx rimraf cypress/reports/\"**\"",
    "posttest": "npm run mocha-merge && npm run mocha-marge",
    "mocha-merge": "npx mochawesome-merge 'cypress/reports/testCaseResults/*json' > cypress/reports/mochawesomeMerged.json",
    "mocha-marge": "npx marge cypress/reports/mochawesomeMerged.json -f report -o cypress/reports/html"
  }
}
```
### Cy-Metrics
`npm install cy-metrics`

Set the mochawesome reporter settings within the `cypress.json` file
```json
{
  "load_balancer": {
    "outputDirectory": "output",
    "testCaseOutputFileName": "tcDataOutput",
    "fileOutputFileName": "fileDataOutput",
    "balancedFilesOutputFileName": "balancedFiles",
    "balancedTcOutputFileName": "balancedTestCases",
    "testRunnerCount": "2",
    "mochawesomeReport": "cypress/reports/mochawesomeMerged.json"
  }
}
```

Options
-------
```text
outputDirectory - Folder location where Cy-Metrics output will placed
testCaseOutputFileName - File name for unbalanced data on all the test cases 
fileOutputFileName - File name for unbalanced data on all files with test cases
balancedFilesOutputFileName - File name for balanced data for all files with test cases
balancedTcOutputFileName - File name for balanced data on all the test cases
testRunnerCount - The amount of 'baskets' to split up test cases and test files
mochawesomeReport - Location of mochawesome file with combined results
```

MAINTAINERS
-----------
[Jacob Bles](https://github.com/JakePember)