/** defines an Author's model with First Name and Last Name. */
const mongoose = require("mongoose");

const Author = mongoose.model(
  "Author",
  new mongoose.Schema({
    first_name: {
        type: String, 
        required: true
    },
    last_name: {
        type: String, 
        required: true
    }
  })
);

module.exports = Author;