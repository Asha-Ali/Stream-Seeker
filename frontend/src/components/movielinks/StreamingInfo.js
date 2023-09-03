import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

function StreamingInfo() {
  const [streamingInfo, setStreamingInfo] = useState(null);
  const { id, title } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/streaming-info/${id}/${title}`);
        if (response.ok) {
          const data = await response.json();
          setStreamingInfo(data);
        } else {
          console.error('Error fetching data');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id, title]);

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
