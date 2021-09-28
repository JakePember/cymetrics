/*
* Purpose: Safely gets a property of an object doing a 'hasOwnProperty' check
* Arguments:
*   @object obj - Parent object that contains the property to get
*   @string property - the name of the property key to obtain
* Notes:
*/
function property(obj, property) {
  if(obj.hasOwnProperty(property)) {
    return obj[property]
  } else {
    throw new Error(`Could not find property, ${property}, from the object.`)
  }
}

module.exports = {property}