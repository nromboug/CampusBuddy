const {ObjectId} = require('mongodb');

module.exports = {
  checkId(id) {
    if (!id) throw 'Error: You must provide an id to search for';
    if (typeof id !== 'string') throw 'Error: id must be a string';
    id = id.trim();
    if (id.length === 0)
      throw 'Error: id cannot be an empty string or just spaces';
    if (!ObjectId.isValid(id)) throw 'Error: invalid object ID';
    return id;
  },

  checkString(strVal, varName) {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    if (!isNaN(strVal))
      throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    return strVal;
  },

  checkStringArray(arr, varName) {
    let invalid = false;
    if (!arr || !Array.isArray(arr))
      throw `You must provide an array of ${varName}`;
    for (i in arr) {
      if (typeof arr[i] !== 'string' || arr[i].trim().length === 0) {
        invalid = true;
        break;
      }
      arr[i] = arr[i].trim();
    }
    if (invalid)
      throw `One or more elements in ${varName} array is not a string or is an empty string`;
    return arr;
  }, 

  checkDate(date, varName) {
    if (!date) {
      throw `You must provide a date for ${varName}`;
    }
    if (isNaN(Date.parse(date))) {
      throw `Error: ${date} is not a valid date for ${varName}`;
    }
    return date;
  }, 

  checkBoolean(bool) {
    if (typeof bool !== 'boolean') {
      throw 'Error: Expecting a boolean value';
    }
    return bool;
  }
};
