import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import primeLogo from ".//logoPNGs/prime-logo.png"
import iplayerLogo from './/logoPNGs/iplayer-logo.png'
import nowLogo from './/logoPNGs/nowtv-logo.png'
import britboxLogo from './/logoPNGs/britbox-logo.png'
import disneyLogo from './/logoPNGs/disney-logo.png'
import itvxLogo from './/logoPNGs/itvx-logo.png'
import netflixLogo from './/logoPNGs/netflix-logo.png'
import paramountLogo from './/logoPNGs/paramount-logo.png'
import appleLogo from './/logoPNGs/apple-logo.png'
import all4Logo from './/logoPNGs/all4-logo.png'
import "..//streamingInfo/StreamingInfo.css"

const serviceLogoUrls = {
  prime: primeLogo, 
  iplayer: iplayerLogo,
  now: nowLogo,
  britbox: britboxLogo,
  disney: disneyLogo,
  itvx: itvxLogo,
  netflix: netflixLogo,
  paramount: paramountLogo,
  apple: appleLogo,
  all4: all4Logo
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
          <h1>Streaming Options</h1>
          {streamingInfo.map((serviceInfo, index) => (
            <div className="streaming-links" key={index}>
              {/* <h2>{serviceInfo.service}</h2> */}
              {serviceLogoUrls[serviceInfo.service] && (
                <a href={serviceInfo.link} target="_blank" rel="noopener noreferrer">
                  <img className="provider-logo" src={serviceLogoUrls[serviceInfo.service]} alt={serviceInfo.service} />
                </a>
              )}
            </div>
          ))}
          {streamingInfo.length === 0 && (
            <div>
              <p>Sorry this movie/show is not available in your region</p>
            </div>
          )}
          { streamingInfo.length > 0 && (
            <p>Click on your chosen streaming provider to start watching! Enjoy!</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default StreamingInfo;
