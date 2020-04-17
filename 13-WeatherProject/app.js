//jshint esversion: 6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

  const apiKey = "86a72df739202a7c681ec44a72179f57";
  const city = req.body.cityName;
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey + "&units=" + unit;

  // method to call API and get response
  https.get(url, function(response){
    console.log(response.statusCode);

    // Getting the data from the response
    response.on("data", function(data){
      // Parsing the JSON into an object
      const weatherData = JSON.parse(data);
      //console.log(weatherData);
      const city = weatherData.name;
      const temperature = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
      console.log(weatherDescription);

      // Example of conversion of obj to string with JSON.Stringfy method
      /* const object = {
        name : "Andre",
        Age: "29"
      };
      console.log(JSON.stringify(object)); */


      res.write("<h1>The temperature in " + city + " is " + temperature + " degress</h1>");
      res.write("<img src=" + icon + ">");
      res.write("<p>Description: " + weatherDescription + "</p>");
      res.send();

    });
  });

  // Cannot invoke send more than on time. Throws error
  // res.send("Server up and running");

});

app.listen(3000, function(req, res){
  console.log("listening on port 3000");
});
