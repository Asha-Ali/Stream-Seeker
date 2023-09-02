import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

function StreamingInfo() {
    const [streamingInfo, setStreamingInfo] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'eccbddc25dmsh68d0b312c157661p115c55jsn982b6a55478b',
                    'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
                }
            };

            const url = new URL('https://streaming-availability.p.rapidapi.com/get');
            url.searchParams.append('output_language', 'en');
            url.searchParams.append('tmdb_id', `movie/${id}`);

            try {
                const response = await fetch(url, options);
                if (response.ok) {
                    const data = await response.json();
                    const gbStreamingInfo = data.result.streamingInfo.gb

                    const uniqueServiceNames = Array.from(
                        new Set(gbStreamingInfo.map((info) => info.service))
                    );

                    const filteredInfo = uniqueServiceNames.map((serviceName) =>
                        gbStreamingInfo.find((info) => info.service === serviceName)
                    );
                    setStreamingInfo(filteredInfo);

                } else {
                    throw new Error(`Fetch request failed with status: ${response.status}`);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

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
