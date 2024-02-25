const CsvToJson = require("../models/csvToJson");

const saveConvertedJson = async (json) => {
  try {
    const savedData = await CsvToJson.insertMany(json);
    return savedData;
  } catch (error) {
    console.log(error);
  }
};

module.exports = saveConvertedJson;
