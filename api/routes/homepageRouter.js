const express = require("express");
const router = express.Router();

const SearchController = require("../controllers/searchController");

router.get("/bytitle/:title", SearchController.FindByTitle);


module.exports = router;