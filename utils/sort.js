const _ = require("lodash");

/*
* Purpose: Takes a object of objects and sorts it by the avg_duration parameter
* Arguments:
*   @object data - object of objects that each contain a parameter called avg_duration
*/
function byAvgDur(data){
    return Object.values(_.cloneDeep(data)).sort((a, b) => {
        if(a.avg_duration > b.avg_duration) {
            return -1
        } else if(a.avg_duration < b.avg_duration) {
            return 1
        } else {
            return 0
        }
    })
}
module.exports = {byAvgDur}