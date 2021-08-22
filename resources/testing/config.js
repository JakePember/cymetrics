const path = require("path");

module.exports = {
    "config": {
        "projectRoot": path.dirname(require.main.filename),
        "load_balancer": {
            "outputDirectory": "resources/testing/output",
            "testCaseOutputFileName": "tcDataOutput",
            "fileOutputFileName": "fileDataOutput",
            "testRunnerCount": "3",
            "mochawesomeReport": "resources/testing/mochawesomeMerged.json"
        }
    }
}