//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true, useUnifiedTopology: true });

// Item schema
const itemsSchema = {
  name: String
};

// Item data model
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Item 1"
});

const item2 = new Item({
  name: "Item 2"
});

const item3 = new Item({
  name: "Item 3"
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);


app.get("/", function(req, res) {

  const day = date.getDate();
  
  Item.find({}, function(err, foundItems){
    if (err) {
      console.log(err);
    } else {

      if (foundItems.length === 0) {
        // Inserting default todo items into DB
        Item.insertMany(defaultItems, function(err){
          if (err) {
            console.log(err);
          } else {
            console.log("Successfully saved default to into DB.");
            res.redirect("/");
          }
        });
      } else {
        res.render("list", {listTitle: day, newListItems: foundItems});
      }
    }
  })
});

app.get("/:customListName", function(req, res){
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName}, function(err, result){
    if (!err) {
      // Same as (result === null)
      if (!result){ 
        const list = new List({
          name: customListName,
          items: defaultItems
        });
  
        list.save();
        res.redirect("/" + customListName);
      } else {
        res.render("list", {listTitle: result.name, newListItems: result.items });
      }
    } 
    else { 
      console.log(err);
    }
  });
});

app.post("/", function(req, res){

  const listName = _.capitalize(req.body.list);
  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName
  });

  // Searching which document to save the new item to
  List.findOne({name: listName}, function(err, result){
    if (!err) {
      if (result != null) {
        result.items.push(item);
        // mongoose's method 'save' is async. Using '.then(callbcak function) ensures to execute the code
        // only after the "promise's been resolved", or the save's been executed 
        result.save().then( () => {
          res.redirect("/" + listName);
        });
      } else {
        item.save().then( () => {
          res.redirect("/");
        });
      }
    } else {
      console.log(err);
    }
  });
});

app.post("/delete", function(req, res){
  
  const selectedItem = JSON.parse(req.body.itemToDelete);
  const listName = selectedItem.listName;
  const itemId = selectedItem.itemId;

    if (listName === date.getDate()) {
      Item.findByIdAndDelete(itemId, function(err){
        if (!err) {
          res.redirect("/");
        } else {
          console.log(err);
        }
      });
    } else {
      List.findOneAndUpdate({name: listName}, {$pull: {items : {_id: itemId}}}, function(err){
        if (!err) {
          res.redirect("/" + listName);
        } else {
          console.log(err);
        }
      });
    }
  });

  /* List.findOne({name: listName}, function(err, result){
    if (!err) {
      if(result != null){

        for(let i=0; i<result.items.length; i++){
          if(result.items[i].id === itemId){
            result.items.splice(i, 1);
          }
        }
        result.save();
        res.redirect("/" + listName);
       
      } else {
        Item.findByIdAndDelete(itemId, function(err){
          if (err) {
            console.log(err);
          } else {
            res.redirect("/");
          }
        });
      }
    } else {
      console.log(err);
    } 
  });
});
*/

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
