
const SearchController = {

    FindByTitle: async (req, res) => {
        const title = req.params.title;
        const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${title}&api_key=d98fecd179f9c5fabd732500cb91f754`);
        const data = await response.json();

        if (!title) {
            return res.status(404).json({error: "Title not found"});
        }
        res.status(200).json(data.results);
    },
}



module.exports = SearchController;

