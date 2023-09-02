const express = require("express");
const router = express.Router();

const WatchLaterController = require("../controllers/watchLater");

// Add a movie to watch later
router.post("/:id", WatchLaterController.AddMovieToWatchLater);

// Remove a movie from watch later
router.delete("/:id/:movieId", WatchLaterController.RemoveMovieFromWatchLater);

// Get all watch later movies
router.get("/:id", WatchLaterController.GetWatchLaterMovies);

module.exports = router;