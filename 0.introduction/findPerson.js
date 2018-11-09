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

Person.find({ firstName: "John" }, (err, person) => {
  if (err) throw err;
  else if (person.length !== 0) console.log("John has been found.");
  else console.log("John has not been found.");
});

Person.find({ firstName: "Johny" }, (err, person) => {
  if (err) throw err;
  else if (person.length !== 0) console.log("John has been found.");
  else console.log("Johny has not been found.");
});
