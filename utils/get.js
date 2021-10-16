/*
* Purpose: Safely gets a property of an object doing a 'hasOwnProperty' check
* Arguments:
*   @object obj - Parent object that contains the property to get
*   @string property - the name of the property key to obtain
* Notes:
*/
const _ = require("lodash");

function property(obj, property) {
  if(obj.hasOwnProperty(property)) {
    return _.cloneDeep(obj[property])
  } else {
    throw new Error(`Could not find property, ${property}, from the following object: ${obj}`)
  }
}

module.exports = {property}