const express = require("express");
const router = express.Router();

const StreamingInfoController = require("../controllers/streamingInfoController");

router.get("/:id/:title", StreamingInfoController.GetByTitle);


module.exports = router;