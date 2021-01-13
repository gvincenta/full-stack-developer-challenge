var express = require('express');
var router = express.Router();
var controller = require("../controllers/author");
/* GET books listing. */
router.get('/', controller.getAuthorByID );
router.post('/', controller.createAuthor );

module.exports = router;
