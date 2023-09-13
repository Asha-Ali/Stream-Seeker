require("dotenv").config();

const SearchController = {

    FindByTitle: async (req, res) => {
        const apiKey = process.env.REACT_APP_API_KEY

        const title = req.params.title;
        const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${title}&api_key=${apiKey}`);
        const data = await response.json();

        if (!title) {
            return res.status(404).json({error: "Title not found"});
        }
        res.status(200).json(data.results);
    },
}

module.exports = SearchController;

// {
//     id: 11970,
//     original_title: "Hercules",
//     overview: "Bestowed with superhuman strength, a young mortal named Hercules sets out to prove himself a hero in the eyes of his father, the great god Zeus. Along with his friends Pegasus, a flying horse, and Phil, a personal trainer, Hercules is tricked by the hilarious, hotheaded villain Hades, who's plotting to take over Mount Olympus!",
//     poster_path: "/qQsspacWlYn5GZxz15ZhvGqkxgh.jpg",
//     release_date: "1997-06-20",
//     title: "Hercules",
//     vote_average: 7.5,
//   }