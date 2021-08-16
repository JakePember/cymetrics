const fs = require('fs');
const create = require('./create')
const s = require("../settings.json");
/*
* Purpose: Writes JSON data to a file
* Arguments:
*   @string file - file path. ie: "output/myFile.json"
*   @JSONobject data - some json object, example seen in notes section
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
    fs.writeFileSync(file, JSON.stringify(data, null, 2), { recursive: true }, err => {
        if (err) throw err;
    });
}
module.exports = {dataToFile}