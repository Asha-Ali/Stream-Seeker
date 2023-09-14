require("dotenv").config();

const StreamingInfoController = {

    GetStreamingInfo: async (req, res) => {
        const { id } = req.params;
        const rapidApiKey = process.env.REACT_APP_RAPID_API_KEY

        try {
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': `${rapidApiKey}`,
                    'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
                },
            };

            const movieUrl = new URL('https://streaming-availability.p.rapidapi.com/get');
            movieUrl.searchParams.append('output_language', 'en');
            movieUrl.searchParams.append('tmdb_id', `movie/${id}`);

            const tvUrl = new URL('https://streaming-availability.p.rapidapi.com/get');
            tvUrl.searchParams.append('output_language', 'en');
            tvUrl.searchParams.append('tmdb_id', `tv/${id}`);

            const [movieResponse, tvResponse] = await Promise.all([
                fetch(movieUrl.toString(), options),
                fetch(tvUrl.toString(), options),
            ]);

            const movieData = await movieResponse.json();
            const tvData = await tvResponse.json();

            const movieStreamingInfo = (movieData.result?.streamingInfo?.gb || []);
            const tvStreamingInfo = (tvData.result?.streamingInfo?.gb || []);

            const allStreamingInfo = [...movieStreamingInfo, ...tvStreamingInfo];
            
            const uniqueServiceNames = Array.from(
                new Set(allStreamingInfo.map((info) => info.service))
            );

            const cleanedInfo = uniqueServiceNames.map((serviceName) =>
                allStreamingInfo.find((info) => info.service === serviceName)
            );
            
            res.status(200).json(cleanedInfo);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = StreamingInfoController;
