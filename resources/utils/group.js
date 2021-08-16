function testCasesByFile(testCases){
    let tmp = testCases,
        groupedByFileReport = tmp.reduce((r, a) => {
            r[a.file] = r[a.file] || [];
            r[a.file].push(a);
            return r;
        }, Object.create(null));
    return groupedByFileReport
}
module.exports = {testCasesByFile}