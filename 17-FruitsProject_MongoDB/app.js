const mongoose = require("mongoose");

// Opening a connection to the "fruitsDB" database using mongoose. If this DB doesn't exist, it will be 
// automatically created. 
// "useNewUlrParser" set as true since defatul parser is deprecated
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser : true,  useUnifiedTopology: true });

// Defining a schema for documents of the new 'fruits' collection
const fruitSchema = new mongoose.Schema({
   // Adding validations to the fileds
   // To add validations, instead of just passing the data type, must define a javascript object with the validation parameters
    name: {
        type: String,
        required: [true, "Name is required."]
    },
    rating: {
        type: Number,
        min: 1, // Min and max values accepted for this field. Anything out of that range won't be stored.
        max: 10 
    },
    review: String // If only specifying the the data type, mongoose doesn't do any validation.
});

// Creating an object for Fruit based on the fruitSchema. A collection will be automatically created for this
// documents. Notes:
// 1 - Collections in MongoDB are simliar to tables in SQL;
// 2 - Documents are similar to row, but they can actually be stored in separated documents;
// 3 - Mongoose will take the name set for this schema object, in this case 'Fruit' and automatically create
// a collection named as the plural of this object, in lower case. E.g: Object 'Fruit' -> Collection 'fruits' 
const Fruit = mongoose.model("Fruit", fruitSchema);


// Creating a new instance of this object schema to attribute values
const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Pretty solid as a fruit"
});

// Creating a new entry in the fruits collection with the data in this fruit object
//fruit.save();

// --- Example of inputting many entries at once

const kiwi = new Fruit({
    name: "Kiwi",
    rating: 4,
    review: "Something's not quite right about it"
});

const orange = new Fruit({
    name: "Orange",
    rating: 7,
    review: "It's nice"
});

const banana = new Fruit({
    name: "Banana",
    rating: 10,
    review: "Good stuff"
});

// Parameters: 
//  - Data entries 
//  - Callback function to catch any errors
/* 
Fruit.insertMany([kiwi, orange, banana], function(err){
    if(err){
        console.log(err);
    } else {
        console.log("Successfully save entries to fruitsDB");
    }
}); 
 */

//--- Setting up new schema 'person' from which MongoDB will automatically create the collection "People"

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema // Creating a relationship from person with fruits. Declaring that there is a fruit object inside person 
});

const Person = mongoose.model("Person", personSchema);

const pineaple = new Fruit({
    name: "Pineaple",
    rating: 9,
    review: "Cool"
});

// pineaple.save();

const amy = new Person({
    name: "Amy",
    age: 12,
    favoriteFruit: pineaple
});

// amy.save(); 

const person = new Person({
    name: "John",
    age: 37
});

// person.save();

// --- Reading data from DB

// Getting all data from fruitsDB/fruits collections
Fruit.find(function(err, fruits){
    if (err) {
        console.log(err);
    } else {
        // Closing connection after data is retrieved. Good practice, should always do this.
        mongoose.connection.close();

        fruits.forEach(function(obj){
            console.log(obj.name);
        })
    }
});


// -- Updating a value

// Parameters: 
//  - Which attribute is used to find what will be updated - in this case the _id
//  - Attribute to be updated and value - Updating name from 'Banana' to 'Bananorange'
//  - Callback function for error handling   
/* Fruit.updateOne({_id: "5eaf9e09a24045773d5b38dc"}, {name: "Bananorange"}, function(err){
    if (err) {
        console.log(err);
    } else {
        console.log("Updated successful");
    }
}); */

/* Person.updateOne({name: "John"}, {favoriteFruit: banana}, function(err){
    if (err) {
        console.log(err);
    } else {
        console.log("Update successful");
    }
}) */


// -- Deleting a value

/* Fruit.deleteOne({name: "Bananorange"}, function(err){
    if (err) {
        console.log(err);
    } else {
        console.log("Deleted successfully");
    }
}); */

// -- Deleting many

/* Fruit.deleteMany({name: "Bananorange"}, function(err){
    if (err) {
        console.log(err);
    } else {
        console.log("Deleted successfully");
    }
}); */