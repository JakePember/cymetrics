const fs = require('fs');
/*
* Purpose: Takes the large test objects and makes a new object with only the properties that are needed
* Arguments:
*   @JSONobject test- mocahawesome test case output. Raw test case input can be seen in the notes section
* Notes:
*  {
*    "title": ".as() - alias a DOM element for later use",
*    "fullTitle": "Aliasing .as() - alias a DOM element for later use",
*    "timedOut": null,
*    "duration": 462,
*    "state": "passed",
*    "speed": "slow",
*    "pass": true,
*    "fail": false,
*    "pending": false,
*    "context": null,
*    "code": "// https://on.cypress.io/as\n// Alias a DOM element for use later\n// We don't have to traverse to the element\n// later in our code, we reference it with @\ncy.get('.as-table').find('tbody>tr').first().find('td').first().find('button').as('firstBtn'); // when we reference the alias, we place an\n// @ in front of its name\ncy.get('@firstBtn').click();\ncy.get('@firstBtn').should('have.class', 'btn-success').and('contain', 'Changed');",
*    "err": {},
*    "uuid": "2454021b-4b44-47b0-bcd4-07291eee0418",
*    "parentUUID": "2ccd440a-1113-4aed-a616-592a2a5c47ae",
*    "isHook": false,
*    "skipped": false
*  }
*/
function testCaseObj(file, test) {
    return {
        "file": file,
        "title": test.title,
        "avg_duration": test.duration,
        "success_rate": test.pass ? 1.00 : 0.00,
        "lastRunState": test.state,
        "history": {
            "duration": [test.duration],
            "successful_runs": test.pass ? 1 : 0,
            "failure_runs": test.pass ? 0 : 1
        }
    }
}

/*
* Purpose: Takes a test case object that has been groupped by its parent file and creates the file level object
* Arguments:
*   @object data - test case object that has been grouped by its parent
* Notes:
*/
function fileObj(data) {
    return {
        "file": data.file,
        "avg_duration": data.avg_duration,
        "success_rate": data.allTestsPassed ? 1.00 : 0.00,
        "history": {
            "avg_duration": [data.avg_duration],
            "successful_runs": data.allTestsPassed ? 1 : 0,
            "failure_runs": data.allTestsPassed ? 0 : 1
        }
    }
}

/*
* Purpose: Creates a any directory in the directory variable that doesn't exist
* Arguments:
*   @object data - the path of the directory
* Notes:
*/
function directory(directory) {
    if (!fs.existsSync(directory)){
        fs.mkdirSync(directory, { recursive: true });
    }
}
module.exports = {testCaseObj, fileObj, directory}