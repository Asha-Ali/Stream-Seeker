const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");
const jwt = require('jsonwebtoken');

const WatchLaterController = {

    AddMovieToWatchLater: async (req, res) => {
        const userId = req.params.id;
        const movieToAdd = req.body.movie;

        try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.watchLater.push(movieToAdd);

        user.save((err) => {
            if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
            }
            res.status(200).json({ message: "Movie added to watch later", user: user });
        });
        } catch (error) {
        return res.status(400).json({ error: "Bad request" });
        }
    },

    RemoveMovieFromWatchLater: async (req, res) => {
        const userId = req.params.id;
        const movieToRemoveId = req.params.movieId;

        try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const updatedWatchLater = user.watchLater.filter(movie => String(movie.id) !== movieToRemoveId);
        user.watchLater = updatedWatchLater;

        user.save((err) => {
            if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
            }
            res.status(200).json({ message: "Movie removed from watch later", user: user });
        });
        } catch (error) {
        return res.status(400).json({ error: "Bad request" });
        }
    },

    GetWatchLaterMovies: async (req, res) => {
        const userId = req.params.id;
    
        try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
    
        res.status(200).json({ watchLater: user.watchLater });
        } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
        }
    }
    
};

module.exports = WatchLaterController;
