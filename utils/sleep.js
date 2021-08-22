/*
* Purpose: sleeps for a user specified amount of time
* Arguments:
*   @int ms - desired amount of time to sleep in milliseconds
*/
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
module.exports = {sleep}