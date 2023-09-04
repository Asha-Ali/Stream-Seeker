import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import primeLogo from ".//logoPNGs/prime-logo.jpeg"
import iplayerLogo from './/logoPNGs/iplayer-logo.png'
import nowLogo from './/logoPNGs/now-logo.jpeg'

const serviceLogoUrls = {
  prime: primeLogo, 
  iplayer: iplayerLogo,
  now: nowLogo
  // Add more services 
};

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
              {serviceLogoUrls[serviceInfo.service] && (
                <a href={serviceInfo.link} target="_blank" rel="noopener noreferrer">
                  <img src={serviceLogoUrls[serviceInfo.service]} alt={serviceInfo.service} />
                </a>
              )}
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
