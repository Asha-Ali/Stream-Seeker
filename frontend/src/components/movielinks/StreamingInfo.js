import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

function StreamingInfo() {
    const [streamingInfo, setStreamingInfo] = useState(null);
    const { id, title } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'eccbddc25dmsh68d0b312c157661p115c55jsn982b6a55478b',
                    'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
                }
            };

            const movieUrl = new URL('https://streaming-availability.p.rapidapi.com/get');
            movieUrl.searchParams.append('output_language', 'en');
            movieUrl.searchParams.append('tmdb_id', `movie/${id}`);

            const tvUrl = new URL('https://streaming-availability.p.rapidapi.com/get');
            tvUrl.searchParams.append('output_language', 'en');
            tvUrl.searchParams.append('tmdb_id', `tv/${id}`);

            try {
                const [movieResponse, tvResponse] = await Promise.all([
                    fetch(movieUrl, options),
                    fetch(tvUrl, options)
                ]);

                const movieData = await movieResponse.json();
                const tvData = await tvResponse.json();

                console.log("Movie Data", movieData)
                console.log("TV Data", tvData)

                const movieStreamingInfo = movieData.result.streamingInfo.gb || [];
                const tvStreamingInfo = tvData.result.streamingInfo.gb || [];

                const allStreamingInfo = [...movieStreamingInfo, ...tvStreamingInfo];

                const uniqueServiceNames = Array.from(
                    new Set(allStreamingInfo.map((info) => info.service))
                );

                const filteredInfo = uniqueServiceNames.map((serviceName) =>
                    allStreamingInfo.find((info) => info.service === serviceName)
                );

                setStreamingInfo(filteredInfo);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

     // Filter the streamingInfo array based on matching id and title
    //  const filteredStreamingInfo = streamingInfo?.filter(info => info.id === id && info.title === title);
    // setStreamingInfo(filteredStreamingInfo)

    return (
        <div>
            {streamingInfo ? (
                <div>
                    <h1>Streaming Info</h1>
                    {streamingInfo.map((serviceInfo, index) => (
                        <div key={index}>
                            <h2>{serviceInfo.service}</h2>
                            <a href={serviceInfo.link} target="_blank" rel="noopener noreferrer">
                                {serviceInfo.link}
                            </a>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default StreamingInfo;
