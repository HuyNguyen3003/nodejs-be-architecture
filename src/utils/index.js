const _ = require("lodash");

const getIntoData = ({ fields = [], object = {} }) => {
  return _.pick(object, fields);
};

const getSelectData = (select = []) => {
  return Object.fromEntries(select.map((field) => [field, 1]));
};

const unGetSelectData = (select = []) => {
  return Object.fromEntries(select.map((field) => [field, 0]));
};

const removeUndefined = (object = {}) => {
  Object.keys(object).forEach((acc) => {
    if (object[acc] == null || object[acc] == undefined) {
      delete object[acc];
    }
  });
  return object;
};

const updateNestedObjParser = (object = {}) => {
  const final = {};
  console.log("1", final);
  Object.keys(object).forEach((acc) => {
    if (typeof object[acc] === "object" && !Array.isArray(object[acc])) {
      const result = updateNestedObjParser(object[acc]);
      Object.keys(result).forEach((key) => {
        final[`${acc}.${key}`] = result[key];
      });
    } else {
      final[acc] = object[acc];
    }
  });
  console.log("2", final);

  return final;
};

module.exports = {
  getIntoData,
  getSelectData,
  unGetSelectData,
  removeUndefined,
  updateNestedObjParser,
};
