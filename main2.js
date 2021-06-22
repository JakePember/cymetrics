const fs = require('fs');
const _ = require('lodash');
const mochawesomeReport = require("./resources/report.json")
const historyReport = require("./resources/history.json")

function write_results_to_file(jsonName, data){
    fs.writeFileSync(`resources/${jsonName}.json`, JSON.stringify(data, null, 2), err => {
        if (err) throw err;

        console.log("Done writing"); // Success
    });
}
function firstTime(){
    const maReports = mochawesomeReport.results
    let data = []
    for(const report of maReports){
        for(const suite of report.suites){
            for(const test of suite.tests){
                const new_test_data = {
                    "title": test.title,
                    "avg_duration": test.duration,
                    "success_rate": test.pass ? 1.00 : 0.00,
                    "history": {
                        "duration": [test.duration],
                        "successful_runs": test.pass ? 1 : 0,
                        "failure_runs": test.pass ? 0 : 1
                    }
                }
                data.push(new_test_data)
            }
        }
        write_results_to_file('history', data)
    }
}
function findHistoryIndex(title){
    let mutHistoryReport = historyReport
    for(let x = 0; x < historyReport.length; x++){
        if(title === historyReport[x].title){
            return x
        }
    }
    return -1
}

function update() {
    const maReports = mochawesomeReport.results
    const mutHistoryReport = historyReport

    const average = (array) => array.reduce((a, b) => a + b) / array.length;


    for(const report of maReports){
        for(const suite of report.suites){
            for(const test of suite.tests){
                let titleMatchIndex = findHistoryIndex(test.title)

                //enter only if the test case exists
                if(titleMatchIndex !== -1){
                    //history.duration
                    let historyOfDuration = mutHistoryReport[titleMatchIndex].history.duration
                    historyOfDuration.push(test.duration)
                    mutHistoryReport[titleMatchIndex].history.duration = historyOfDuration

                    //history.successful_runs OR history.failure_runs
                    test.pass ? mutHistoryReport[titleMatchIndex].history.successful_runs += 1 : mutHistoryReport[titleMatchIndex].history.failure_runs += 1

                    //success_rate
                    mutHistoryReport[titleMatchIndex].success_rate = (mutHistoryReport[titleMatchIndex].history.successful_runs / (mutHistoryReport[titleMatchIndex].history.successful_runs + mutHistoryReport[titleMatchIndex].history.failure_runs)).toFixed(2)

                    //avg_duration
                    mutHistoryReport[titleMatchIndex].avg_duration = (average(mutHistoryReport[titleMatchIndex].history.duration)).toFixed(0)
                } else { //if its a new addition to the project
                    const new_test_data = {
                        "title": test.title,
                        "avg_duration": test.duration,
                        "success_rate": test.pass ? 1.00 : 0.00,
                        "history": {
                            "duration": [test.duration],
                            "successful_runs": test.pass ? 1 : 0,
                            "failure_runs": test.pass ? 0 : 1
                        }
                    }
                    mutHistoryReport.push(new_test_data)
                }
            }
        }
    }
    write_results_to_file('mutated', mutHistoryReport)
}

function main() {
    // Create history file if it doesnt exist
    if(fs.existsSync(`resources/history.json`) === false){
        firstTime()
    }else{
        update()
    }






    // for (let x = 0; x < 10; x++) {
    //     let TC_NUM = `TC${Math.floor(Math.random() * (3 - 1)) + 1}`
    //     const new_run_results = get_random_result(TC_NUM)
    //     console.log(new_run_results)
    //
    //     record_results(new_run_results)
    // }

    
}

if (require.main === module) {
    main();
}