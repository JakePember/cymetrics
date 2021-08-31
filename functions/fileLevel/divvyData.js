const {getSmallestRunner} = require("../getSmallestRunner");


/*
* Purpose: Distributes or 'divvies' up file level durations amongst initialized groupings representing total number of
* test runners. The goal being to get the smallest total duration given the number of groups available to split the existing
* test cases between.
* Arguments:
*   @object runners - an object that represents all test runner groupings.
*   @object data - an object containing file level metadata
* Notes:
*/
function divvyData (runners, data){
    for(let x = 0; x < data.length; x++){
        let smallestRunner =  getSmallestRunner(runners)
        runners[smallestRunner].estTotalDuration += data[x].avg_duration
        runners[smallestRunner].files.push(data[x].file)
    }
    return runners
}

module.exports = {divvyData}