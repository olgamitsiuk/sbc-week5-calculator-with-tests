// import the node file system module
const fs = require("fs");

// import the path module
const path = require("path");
const filePath = path.join(__dirname, "data.json");

  
// create a method to read the data from the data.json file
exports.getData = function (request, response) {
try {
  const data = JSON.parse(fs.readFileSync(filePath, "utf8")); // read the data from the database
  response.json(data); // send the data as a response
} catch (error) {
  response.json({
    status: "error",
    message: "error reading data file"
  })
}
};

// create a method to write the data to the data.json file
exports.postData = function (request, response) {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    data.push(request.body); // add the new data
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2)); // write the data to the database
    response.json({ 
      status: "succes",
      message: "data added" 
    }); // send a response
  } catch (error) {
    response.json({
      status: "error",
      message: "error processing data file"
    })
  }
}
