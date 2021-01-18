var express = require("express");
var router = express.Router();
var controller = require("../controllers/book");
/* GET books listing. */
router.get("/", controller.getAllBooks);

module.exports = router;
