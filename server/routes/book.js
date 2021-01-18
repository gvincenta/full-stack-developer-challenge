var express = require("express");
var router = express.Router();
var controller = require("../controllers/book");
/* GET a book's details with its author's details. */
router.get("/", controller.getBookByID);
/* POST new book. */
router.post("/", controller.createBook);

module.exports = router;
