const createNestedObject = (keys, value, result) => {
  let currentObj = result;

  keys.forEach((key, index) => {
    key = key.trim();
    currentObj[key] = index === keys.length - 1 ? value : currentObj[key] ?? {};
    currentObj = currentObj[key];
  });

  return result;
};

const csvToJson = (csv) => {
  const convertedjson = [];
  let schema = {};
  const lines = csv.split("\n");
  const keys = lines[0].split(",");

  // Creating schema
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const levels = key.split(".");
    schema = createNestedObject(levels, `<${keys[i].trim()}>`, schema);
  }

  // Mapping values
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    let str = JSON.stringify({ ...schema });

    values.forEach((ele, i) => {
      str = str.replace(`<${keys[i].trim()}>`, ele).replace("\r", "");
    });
    const parsedJson = JSON.parse(str);
    parsedJson.age = parseInt(parsedJson.age);
    convertedjson.push(parsedJson);
  }

  return convertedjson;
};

// console.log(csvToJson(csv));
module.exports = csvToJson;
