//jshint esversion:6
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true});

const fruitsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Check data entry, no name is specified!"]
    },
    //data validation
    rating: {
        type:Number,
        min: 1,
        max: 10
    },
    review: String,
    stock:String
});
const personSchema = new mongoose.Schema({
    id:Number,
    name:String,
    jobTitle:String,
    //relationship
    favfruit: fruitsSchema
});
const Fruit = mongoose.model("Fruit", fruitsSchema);
const pineapple = new Fruit({
    name: "Pineapple",
    rate: 9,
    review:"Great fruit"
});
pineapple.save()




const fruit = new Fruit({
    rating:10,
    review:"#########"
});
// If we use save and twicely run code then it will save twicely.
// So dont use it.
// fruit.save();
const Person = mongoose.model("Person", personSchema);

const person = new Person({
    id:1,
    name:"Shashwat Pandey",
    jobTitle:"SDE-1"

});
const person1 = new Person({
    id:2,
    name:"Rishabh",
    jobTitle:"SDE-1",
    //relation with fruit :- check schema
    favfruit: pineapple
});
person1.save();
// use it only once

// if we add new one in fruits
const mango = new Fruit({
    name:"mango",
    rating:8,
    review:"Very Tasty"
});

const banana = new Fruit({
    name:"Banana",
    rating:6,
    review:"Too Healthy"
})
// It is comment out because it is saved once
// Fruit.insertMany([mango,banana]);







// To Read :- use async-await in modern version of mongoose ,err and items.

async function fetchfruit() {
try {
    const results = await Fruit.find();
    console.log(results);
    
    // to close the connection of mongoose after the following commands.
    // It's important to note that Mongoose automatically keeps track of open connections, so you don't need to keep track of them manually. When you call mongoose.disconnect(), it will close all active connections.
    mongoose.connection.close();
     //loop throgh fruits array and print the names of fruits
    results.forEach(function(sha){
        console.log(sha.name);
    })
    
  } 
  
  catch (err) {
    console.log(err);
  }
}

fetchfruit();

//Update
async function update() {
    try{
    const res = await Fruit.updateOne({name:"Banana"}, {$set: {stock:"10k"}})
    } catch(err){
        console.log(err);
    }
    }
    update();

//delete
// similar to update








//Example to understand.

// const mongoose = require('mongoose');

// // Connect to the MongoDB server
// mongoose.connect('mongodb://localhost:27017/myDatabase', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('Connected to MongoDB');

//   // ... Perform database operations here ...

//   // Closing the connection after performing the operations
//   mongoose.disconnect()
//     .then(() => {
//       console.log('Disconnected from MongoDB');
//     })
//     .catch((err) => {
//       console.error('Error while disconnecting:', err.message);
//     });
// })
// .catch((err) => {
//   console.error('Error connecting to MongoDB:', err.message);
// });



