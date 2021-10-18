/*
* Purpose: The main driver function to get the smallest total duration given the number of runners available to split the existing
* test cases between.
* Arguments:
*   @object amtOfRunners - an object that represents all test runner groupings.
*   @object data - an object containing test case level metadata
* Notes:
*/
const sort = require("../utils/sort");
const {initTcRunners} = require("./initFileRunners");
const {divvyTcData} = require("./divvyData");

function getBalancedTcData(data, amtOfRunners) {
    let _data = sort.byAvgDur(data) //Sort the data before anything else
    let runners = initTcRunners(_data, amtOfRunners) //add one data point to each runner

    //delete the data points used by the initFileRunners function, they are now used
    _data.splice(0, amtOfRunners)

    runners = divvyTcData(runners, _data) //distribute the rest of the data points to the test runners

    return runners
}
module.exports = {getBalancedTcData}