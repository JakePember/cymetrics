/*
* Purpose: takes test case metadata and groups them by their parent file
* Arguments:
*   @object testCases - Object containting testcase metadata
* Notes:
*/
function testCasesByFile(testCases){
  let tmp;
  tmp = testCases;
  return tmp.reduce((r, a) => {
      r[a.file] = r[a.file] || [];
      r[a.file].push(a);
      return r;
    }, Object.create(null))
}
module.exports = {testCasesByFile}