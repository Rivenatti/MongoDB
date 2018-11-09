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

Person.findOneAndRemove({ firstName: "John" }, (err, person) => {
  if (err) throw err;
  else if (person) console.log("John has been found and removed.");
  else console.log("John has not been found.");
});
