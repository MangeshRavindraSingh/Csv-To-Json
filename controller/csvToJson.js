const converter = require("../service/converter");
const saveConvertedJson = require("../service/saveConvertedJson");
const fs = require("fs");

const percentage = (partialValue, totalValue) => {
    return (100 * partialValue) / totalValue;
  };

const handleCsvToJson = async (req, res) => {

  const data = fs.readFileSync(process.env.CSV_URL, {
    encoding: "utf8",
    flag: "r",
  });

  const convertedjson = converter(data);
  const savedData = await saveConvertedJson(convertedjson);

  const distribution = {
    "> 20": 0,
    "20 to 40": 0,
    "40 to 60": 0,
    "> 60": 0,
  };
  
  for (let i = 0; i < savedData.length; i++) {
    const age = savedData[i].age;
    if (age < 20) {
      distribution["> 20"] += 1;
    } else if (age >= 20 && age < 40) {
      distribution["20 to 40"] += 1;
    } else if (age >= 40 && age < 60) {
      distribution["40 to 60"] += 1;
    } else {
      distribution["> 60"] += 1;
    }
  }
  
  for (let i = 0; i < Object.keys(distribution).length; i++) {
    const key = Object.keys(distribution)[i];
    const value = distribution[key];
    distribution[key] = `${percentage(value, savedData.length)}%`;
  }

  res.json(distribution);
};

module.exports = handleCsvToJson;
