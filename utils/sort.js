const _ = require("lodash");

/*
* Purpose: Takes a object of objects and sorts it by the avg_duration parameter
* Arguments:
*   @object data - object of objects that each contain a parameter called avg_duration
*/
function byAvgDur(data){
    return Object.values(_.cloneDeep(data)).sort((a, b) => {
        return a.avg_duration > b.avg_duration ? -1 : a.name > b.name ? 1 : 0
    })
}
module.exports = {byAvgDur}