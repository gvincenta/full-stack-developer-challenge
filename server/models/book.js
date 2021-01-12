/** defines a Book's model with Name, ISBN, and an Author. */
const mongoose = require("mongoose");

const Book = mongoose.model(
  "Book",
  new mongoose.Schema({
    name:  {
        type: String, 
        required: true
    },
    isbn:  {
        type: String, 
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, //reference to an author
        ref: "Author",
        required: true
    }
  })
);

module.exports = Book;