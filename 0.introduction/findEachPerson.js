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

Person.find({}, "firstName", function(err, person) {
  if (err) throw err;
  else if (person)
    console.log("People found during the search: " + JSON.stringify(person));
  else console.log("Person has not been found");
});
