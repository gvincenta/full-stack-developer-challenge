var express = require("express");
var router = express.Router();
var controller = require("../controllers/author");
/* GET an author's detail. */
router.get("/", controller.getAuthorByID);
/* POST new author. */
router.post("/", controller.createAuthor);

module.exports = router;
