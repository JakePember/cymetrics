const fs = require('fs');
// const outDir = clone.safeClone('/cypress.json').load_balancer.outputDirectory

/*
* Purpose: Writes JSON data to a file
* Arguments:
*   @string file - file path. ie: "output/myFile.json"
*   @JsonObject data - some json object, example seen in notes section
* Notes:
* example object on what argument 'data' might look like
*  {
*    "title": test.title,
*    "avg_duration": 234
*    "success_rate": 1.0
*    "history": {
*      "duration": [234, 234],
*      "successful_runs": 2,
*      "failure_runs": 0
*    }
*  }
*/
function dataToFile(file, data) {
    try{
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
    }catch (e) {
        throw new Error(e)
    }
}
module.exports = {dataToFile}