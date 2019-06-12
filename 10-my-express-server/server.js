// jshint esversion:6
const express = require("express");
const app = express();

// Waits for a HTTP request to the port 3000 and call the defined call back function
// when the request received
app.listen("3000", function() {
  console.log("Server started on port 3000");
});

// Get method for home page (route = "/") and the callback function with the response
app.get("/", function(request, response){
  response.send("<h1>Hello Warodo<h1/>");
});

app.get("/contact", function(req, res){
    res.send("Contact page");
});

app.get("/about", function(req, res){
  res.send("About page");
});

app.get("/hobbies", function(req, res){
  res.send("Hobbies page");
});
