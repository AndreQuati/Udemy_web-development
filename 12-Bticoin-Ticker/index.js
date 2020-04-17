//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request"); // Module to do API calls

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

  var crypto = req.body.crypto;
  var fiat = req.body.fiat;

  console.log(crypto + " / " + fiat);

  request("https://apiv2.bitcoinaverage.com/indices/global/ticker/" + crypto + fiat, function(error, response, body) {
    var data = JSON.parse(body);
    var price = data.last;

    console.log(price);

    // Send is the last response to the client, code after here logic be executed. Use 'wirte' determine what will be sent
    // and 'send' to send the data.
    // res.send("<h1>The current price of " + crypto + " is " + price + " " + fiat + "</h1>");

    var currentDate = data.display_timestamp;
    
    res.write("<p>The current date is " + currentDate + "</p>");
    res.write("<h1>The current price of " + crypto + " is " + price + " " + fiat + "</h1>");

    res.send();
  });
});

app.listen(3000, function() {
  console.log("Server is listening on the port 3000");
});
