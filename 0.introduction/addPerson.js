const mongoose = require("mongoose");
const Person = require("./models/Person");

mongoose.connect("mongodb://localhost/people");

mongoose.connection
  .once("open", () => {
    console.log("connection has been made");
  })
  .on("error", error => {
    console.log("connection error", error);
  });

const person1 = new Person({
  firstName: "John",
  lastName: "Doe",
  age: "32",
  address: [
    {
      street: "Hawkins 13",
      city: "London",
      postCode: "55-555"
    }
  ]
});

const person2 = new Person({
  firstName: "Josh",
  lastName: "Moe",
  age: "29",
  address: [
    {
      street: "Hopkins 13",
      city: "Exter",
      postCode: "33-333"
    }
  ]
});

person1.save().then(() => console.log("Person has been added."));
person2.save().then(() => console.log("Person has been added."));
