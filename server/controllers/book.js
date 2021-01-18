var mongoose = require("mongoose");
var Book = mongoose.model("Book");

module.exports = {
    createBook: (req, res) => {
        const { isbn, name, author } = req.body;

        //save a new book into the database
        var book = new Book({
            isbn,
            name,
            author,
        });
        book.save()
            .then((response) => {
                //return OK with the new book's details.
                res.status(200).json(response);
            })
            .catch((e) => {
                res.status(500).json(e);
            });
    },
    getBookByID: async (req, res) => {
        const { id } = req.query;
        if (id) {
            //find the book
            Book.findById(id)
                .then((response) =>
                    //nest author details
                    response
                        .populate("author")
                        .execPopulate()
                        .then((response2) =>
                            //return book + author details
                            res.status(200).json(response2)
                        )

                        .catch((error2) => res.status(500).json(error2))
                )
                .catch((e) => res.status(500).json(e));
        }
    },
    getAllBooks: (req, res) => {
        Book.find({})
            .then((doc) => {
                res.json(doc);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
};
