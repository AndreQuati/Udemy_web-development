//jshint esverion:6
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

// let are similar to 'var' but more secure to use, since let created inside loops/condition statements are treated as local
// variables, while 'var' are treated as global
const items = ["Task 1", "Task 2", "Task 3"];
const workItems = [];

// Setting up EJS
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
// Telling express to make this folder and everything inside it to be available to be accessed by the client (browser)
app.use(express.static("public"));

app.get("/", function(req, res) {

  const day = date.getDay();
  
  // EJS asks that the .ejs files are inside a folder called 'views'. It will look for the files inside it,
  // so it's not necesary to give the path of the file as "views/file.ejs", just the name of the file will do it if it's
  // inside the views folder.
  res.render("list", {
    listTitle: day,
    newItems: items
  });

  /*
  if(date === 6 || date === 0){
    day = "weekend";
  } else {
    day = "weekday";
  }
  */

  /*
  switch (today) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
    default:
      console.log("Error: Var 'day' = " + day);
  }
  */
});

app.post("/", function(req, res){

  const item = req.body.inpNewItem;

  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    // Cannot render here because when the browser try to render the list.ejs for the first time, when going through the
    // get method, it will say that the "newListItem" was not declared. To avoid this, we declare "newListItem" by passing
    // it as a parameter to the res.render(list) on get method and conclude this post by redirecting to that get method.
    res.redirect("/");
  }
});

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work", newItems: workItems});
});

app.post("/work", function(req, res){
  workItems.push(req.body.inpNewItem);
  res.redirect("/work");
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen("3000", function() {
  console.log("Listening on port 3000");
});
