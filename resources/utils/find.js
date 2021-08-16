/*
* Purpose: Returns the index of the test object location that matches the passed in title. Returns -1 if the title is
* not found.
* Arguments:
*   @string title - The name of the test case to look for
*   @string relativeHistoryPath- relative path to past test case data
* Notes:
*/
function index(type, title, report) {
    for (let index = 0; index < report.length; index++) {
        if (type.toUpperCase() === 'TITLE' && title === report[index].title) {
            return index
        } else if(type.toUpperCase() === 'FILE' && title === report[index].file){
            return index
        }
    }
    return -1
}

module.exports = {index}