// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");

// Initializing the express function in a constant
const app = express();
// Initializing the body parser module for requests intercepted here.
// The body parser helps to get only the content from the request body, instead of a
// huge HTTP object
// urlencoded = Used for requests coming through url
// extended true = accepts nested objects, needs to be defined
app.use(bodyParser.urlencoded({etended:true}));


// Get method get's the request sent by the browser from the "/" location. In this case,
// the access to the website homepage
app.get("/", function(req, res){
  // Send file works as allows sending a file in the response, in this case an HTML page
  // __dirname returns the location of the folder where this file is, so there's no impact
  // if it's changed when deployed to the server
  res.sendFile(__dirname + "/index.html");
});

// Similar to get, but all data is transfered in the HTTP Request body, while in the
// Get, it's transfered on the URL and visible to the user. The first parameter specifies
// the page from which the request will be made. On that page, it must be specified that the method
// is "Post"
app.post("/", function(req, res){

  // Converting the number parsed from the body from txt to number
  var n1 = Number(req.body.num1);
  var n2 = Number(req.body.num2);

  res.send("Calculation result is: " + (n1 + n2));
});

app.get("/bmiCalculator", function(req, res){
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmiCalculator", function(req, res){
  var height = parseFloat(req.body.height);
  var weight = parseFloat(req.body.weight);

  var bmi =  weight / (height * height);

  res.send("BMI = " + bmi);
});

app.listen("3000", function(){
  console.log("Server running on port 3000");
});
