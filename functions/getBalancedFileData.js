const {initFileRunners} = require("./initFileRunners")
const {divvyFileData} = require("./divvyData");
const sort = require("../utils/sort");


/*
* Purpose: The main driver function to get the smallest total duration given the number of runners available to split the existing
* test cases between.
* Arguments:
*   @object runners - an object that represents all test runner groupings.
*   @object data - an object containing file level metadata
* Notes:
*/
function getBalancedFileData(data, amtOfRunners) {
    let _data = sort.byAvgDur(data) //Sort the data before anything else

    let runners = initFileRunners(_data, amtOfRunners) //add one data point to each runner

    //delete the data points used by the initFileRunners function, they are now used
    _data.splice(0, amtOfRunners)

    runners = divvyFileData(runners, _data) //distribute the rest of the data points to the test runners

    return runners
}
module.exports = {getBalancedFileData}