var mongoose = require("mongoose"); 
var Book = mongoose.model("Book");   

module.exports = {
    createBook : (req, res) => {      
        const {isbn, name, author} = req.body; 
    
        //save a new book into the database
        var book = new Book({
            isbn, 
            name, 
            author
        });
        book.save();
    
        //return OK with the new book's details.
        res.status(200).json(book);
    },
    getBookByID : async (req, res) => { 
        const {id} = req.query;
        if (id ) { 
        //find the book
        const book =  await Book.findById(id) 
        //nest author details
        const bookAuthor = await book.populate('author').execPopulate() 
        //return book + author details
        Promise.all([ bookAuthor])
        .then(doc => {
            return   res.status(200).json(doc[0]);
        })
        .catch(e => {
            res.status(500).json(err);

        }) 
        }
        
    },
    getAllBooks : (req, res) => {  
        Book.find({})
           .then(doc => {
               res.json(doc);
           })
           .catch(err => {
               res.status(500).json(err);
           });
   }
    
    
    
     
    
}

