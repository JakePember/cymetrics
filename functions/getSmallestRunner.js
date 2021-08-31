/*
* Purpose: Finds the smallest estimated total duration amongst all existing runners
* Arguments:
*   @object runners - an object that represents all test runner groupings.
* Notes:
*/
function getSmallestRunner (runners){
    let smallest = '';
    for (let key in runners) {
        if (smallest !== '' && runners[key].estTotalDuration < runners[smallest].estTotalDuration) {
            smallest = key;
        } else if (smallest === '') {
            smallest = key;
        }
    }
    return smallest
}

module.exports = {getSmallestRunner}