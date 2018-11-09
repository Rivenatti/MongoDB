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

Person.findOneAndUpdate(
  { firstName: "Josh" },
  { firstName: "Joshy" },
  (err, person) => {
    if (err) throw err;
    else if (person) console.log("Person has been found and updated.");
    else console.log("Person has not been found.");
  }
);
