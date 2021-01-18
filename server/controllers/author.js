var mongoose = require("mongoose"); 
var Author = mongoose.model("Author");   

module.exports = {
    createAuthor : (req, res) => {      
        const {firstName, lastName} = req.body; 
    
        //save a new author into the database
        var author = new Author({
            firstName, lastName
        });
        author.save().then((response) => {
            //return OK with the new author's details.
            res.status(200).json(response);
        }).catch(e => {
            res.status(500).json(e);

        });
    },
    getAuthorByID : (req, res) => { 
        const {id} = req.query;
        if (id ) { 
            Author
            .findById(id)
            .then(doc => {
                //found the author and return.
                res.json(doc); 
            })
            .catch(err => {
                res.status(500).json(err);
            });
            return;
        }
        
    },
    
    
    getAllAuthors : (req, res) => { 
        
         Author.find({})
            .then(doc => {
                res.json(doc);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }
    
}

