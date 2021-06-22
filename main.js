// const fs = require('fs');
// const _ = require('lodash');
//
// function record_results(new_results) {
//
//     function write_results_to_file(data){
//         fs.writeFileSync(`resources/${data.tc}.json`, JSON.stringify(data, null, 2), err => {
//             if (err) throw err;
//
//             console.log("Done writing"); // Success
//         });
//     }
//
//     //test case has a history
//     if(fs.existsSync(`resources/${new_results.tc}.json`)){
//         const file_buffer_data = fs.readFileSync(`resources/${new_results.tc}.json`);
//
//         const average = (array) => array.reduce((a, b) => a + b) / array.length;
//
//         const in_file_content = JSON.parse(file_buffer_data);
//         let mutated_content = _.cloneDeep(in_file_content)
//
//         let history_of_duration = in_file_content.history.duration
//         history_of_duration.push(new_results.duration)
//
//
//         mutated_content.history.duration = history_of_duration
//         new_results.successful ? mutated_content.history.successful_runs += 1 : mutated_content.history.failure_runs += 1
//
//         mutated_content.success_rate = (mutated_content.history.successful_runs / (mutated_content.history.successful_runs + mutated_content.history.failure_runs)).toFixed(2)
//         mutated_content.avg_duration = (average(mutated_content.history.duration)).toFixed(0)
//
//         write_results_to_file(mutated_content)
//     }
//
//     //First test case run
//     if(fs.existsSync(`resources/${new_results.tc}.json`) === false){
//         const new_test_data = {
//             "tc": new_results.tc,
//             "avg_duration": new_results.duration,
//             "success_rate": new_results.successful ? 1.00 : 0.00,
//             "history": {
//                 "duration": [new_results.duration],
//                 "successful_runs": new_results.successful ? 1 : 0,
//                 "failure_runs": new_results.successful ? 0 : 1
//             }
//         }
//         write_results_to_file(new_test_data)
//     }
// }
//
// function get_random_result(tc) {
//     return {
//         tc: tc.toUpperCase(),
//         duration: Math.floor(Math.random() * (600000 - 300000) ) + 300000,
//         successful: Math.random() >= 0.1
//     }
//
// }
//
// function main() {
//     // for (let x = 0; x < 10; x++) {
//     //     let TC_NUM = `TC${Math.floor(Math.random() * (3 - 1)) + 1}`
//     //     const new_run_results = get_random_result(TC_NUM)
//     //     console.log(new_run_results)
//     //
//     //     record_results(new_run_results)
//     // }
//
//
// }
//
// if (require.main === module) {
//     main();
// }