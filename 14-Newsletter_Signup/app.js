//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

// Setting up body parser to access properties from HTML elements
app.use(bodyParser.urlencoded({extended:true}));
// Telling the server to use the content from this folder, so the CSS and any other content as images can be referenced in the html files
app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us19.api.mailchimp.com/3.0/lists/6e9b1855d1";
  const options = {
    method: "POST",
    auth: "andre:efb787bfd10b2838d0ef493d7ba49b70-us19"
  };

  // https.request returns a Request object to the request const. This obj will have the methods write, send, end, etc.
  // Besides returning the object, it also calls the callback function specificied in the parameters after it's executed
  // so the status code of the request can be retrieved there.
  const request = https.request(url, options, function(response){
    // Getting the response to the request
    response.on("data", function(data){

      // Checking HTTP status code to check response status, however not checking the API custom status message
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }

      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(3000, function(){
  console.log("-------------Server running on port 3000---------------");
});


// Mailchimp API Key
// efb787bfd10b2838d0ef493d7ba49b70-us19

// List ID
//6e9b1855d1
