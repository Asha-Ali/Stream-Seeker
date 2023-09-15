require("dotenv").config();

const SearchController = {
    FindByTitle: async (req, res) => {
        const apiKey = process.env.REACT_APP_API_KEY;
        const title = req.params.title;

        if (!title) {
        return res.status(404).json({ error: "Title not found" });
        }

        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/multi?query=${title}&api_key=${apiKey}`
            );

            if (!response.ok) {
                return res
                .status(response.status)
                .json({ error: "API request failed" });
            }

            const data = await response.json();
            res.status(200).json(data.results);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
};

module.exports = SearchController;
