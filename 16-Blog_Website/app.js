//jshint esversion:6

// Requiring express, body parser and ejs
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

// Requiring lodash - library for multiple kind of operations, in this case for working with 
// strings from client requests.
const _ = require("lodash"); //lodash full build (other custom builds are available)


// Initial content of home / about / contact screens
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


const blogPosts = [];

// Initiatlizing express in 'app'
const app = express();

// Initializing EJS and Body Parser
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
// Setting folder 'public' as static to be accessible by the client (browser)
app.use(express.static("public"));

app.get("/", function(req, res){
  res.render("home", {pHomeStartingContent: homeStartingContent, blogPosts: blogPosts});
});

app.get("/about", function(req, res){
  res.render("about", {pAboutContent : aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {pContactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    body: req.body.postBody
  };

  blogPosts.push(post);

  res.redirect("/");
});

// The name of the parameter I put after ":" is the attribute to which the value will be set. E.g.: If the routing + parameter
// is "user/:userid", req.params will return {userid: "2090"}
app.get("/posts/:postName", function(req, res){
  //Regardless of the name of the parameter or how many there are, they are accessed by this "req.params"
  const requestedTitle = _.lowerCase(req.params.postName);

  blogPosts.forEach(function(post){

    const postTitle = _.lowerCase(post.title);

    if(postTitle === requestedTitle){
      res.render("post", {postTitle: post.title, postBody: post.body});
    } 
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
