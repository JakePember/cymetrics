/*
* Purpose: Creates the initial runners object and assigns 1 file level set of data
* Arguments:
*   @object data - an object containing file level metadata
*   @int amtOfRunners - total number of runners to distribute divvy data amongst
* Notes:
*/
function initFileRunners (data, amtOfRunners){
    let results = {}
    if(data.length < amtOfRunners){
        throw new Error(`There are ${amtOfRunners} runners and only ${data.length} file level data points. Exiting, not enough data points for the amount of runners.`)
    }
    //Initialize runners with 1 data unit each
    for(let x = 0; x < amtOfRunners; x++){
        results[`g${x + 1}`] = {
            "files": [data[x].file],
            "estTotalDuration": data[x].avg_duration,
            "command": `npm run spec '${data[x].file}',`
        }
    }
    return results
}

/*
* Purpose: Creates the initial runners object and assigns 1 test case level set of data
* Arguments:
*   @object data - an object containing file level metadata
*   @int amtOfRunners - total number of runners to distribute, 'divvy', data amongst
* Notes:
*/
function initTcRunners (data, amtOfRunners){
    let results = {}
    //Initialize runners with 1 data unit each
    for(let x = 0; x < amtOfRunners; x++){
        results[`g${x + 1}`] = {
            "title": [data[x].title],
            "estTotalDuration": data[x].avg_duration
        }
    }
    return results
}

module.exports = {initFileRunners, initTcRunners}