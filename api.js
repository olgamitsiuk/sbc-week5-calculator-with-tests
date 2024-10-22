let express = require('express');
let api = express.Router();

const database = require("./database");

// set up a default route to server the index page
api.get("/", function (req, res) {
    res.json({
      status: "API is working",
      message: "Welcome to the API",
    });
  });
  
  // create a route to get all the data
  api.get("/data", database.getData);
  
  // create a route to add data
  api.post("/data", database.postData);
  
  // export the router
  module.exports = api;