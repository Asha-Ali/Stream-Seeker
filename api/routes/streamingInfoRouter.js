const express = require("express");
const router = express.Router();

const StreamingInfoController = require("../controllers/streamingInfoController");

router.get("/:id/:title", StreamingInfoController.GetStreamingInfo);


module.exports = router;