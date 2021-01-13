/** defines an Author's model with First Name and Last Name. */
const mongoose = require("mongoose");

const Author = mongoose.model(
  "Author",
  new mongoose.Schema({
    firstName: {
        type: String, 
        required: true
    },
    lastName: {
        type: String, 
        required: true
    }
  })
);

module.exports = Author;