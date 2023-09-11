import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom"; 
import '../homepage/Homepage.css'
import Navbar from "../Navbar/Navbar";

const Homepage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [title, setTitle] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [watchLaterMovies, setWatchLaterMovies] = useState([]);
    const [notLoggedInError, setNotLoggedInError] = useState("");
    const [noResultsError, setNoResultsError] = useState(false)

    useEffect(() => {
        const savedSearchResults = sessionStorage.getItem("searchResults");

        if (savedSearchResults) {
          setSearchResults(JSON.parse(savedSearchResults));
          setShowResults(true);
        }
      
        const handleBeforeUnload = () => {
            sessionStorage.removeItem("searchResults");
        };
        
        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
      }, []);

    const handleSearch = async () => {
        try {
            const response = await fetch(`/bytitle/${title}`);
            const data = await response.json();
            setSearchResults(data);
            setShowResults(true)
            sessionStorage.setItem("searchResults", JSON.stringify(data));

            if (data.length === 0) {
              setNoResultsError(true)
            }

        } catch (error) {
            console.error("Error fetching search results: ", error);
        }
    };

    const addToWatchLater = async (movie) => {
        const id = window.localStorage.getItem('userId')

        if (!id) {
          setNotLoggedInError("Please log in or sign up to add movies to your watch later list.");
          return;
        }

        try {
            const response = await fetch(`/watchLater/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    movie: movie,
                }),
            });

            if (response.ok) {
              const response = await fetch(`/watchLater/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setWatchLaterMovies(data.watchLater);
                } else {
                    console.error("Error getting watch-later movies:", response.statusText);
                }
              }
        } catch (error) {
            console.error("Error adding movie to watch later:", error);
        }
    };

    const isAddedToWatchLater = (movie) => {
        return watchLaterMovies.some((watchLaterMovie) => watchLaterMovie.id === movie.id);
    };

    const closeErrorPopup = () => {
      setNotLoggedInError("");
    };

    return (   
        <div className="main-homepage-div">
            <Navbar />
          <div className="homepage-content">
          <h1 id="heading">Search for a Movie or TV show</h1>
          <input
            className="search-button"
            type="text"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <button className='submit-search' onClick={handleSearch}>Search</button>
          {showResults && (
            <div>
              <h2>Search Results</h2>
              <div>
                {searchResults.map((result, index) => (
                  <div key={index}>
                    <h2>{result.title ? result.title : result.name}</h2>
                    <p>Synopsis: {result.overview}</p>
                    <div className="poster-container">
                      <img
                        className="poster-image"
                        src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`} // poster_path is null in some movies
                        alt={result.title}
                      />
                    </div>
                    <p>Rating: {result.vote_average ? result.vote_average.toFixed(1) : 'N/A'}</p>
                    <Link to={`/streaming-info/${result.id}/${result.title ? result.title : result.name}`} 
                          style={{ textDecoration: 'none' }}>
                          <p className="streaming-link"><strong>Click here for Streaming Links</strong></p>
                    </Link>
                    <button
                            onClick={() => addToWatchLater(result)}
                            disabled={isAddedToWatchLater(result)}
                        >
                            {isAddedToWatchLater(result) ? "Added" : "Add to Watch Later"}
                    </button>
                    {notLoggedInError && (
                      <div className="error-popup">
                          <div className="error-content">
                              <p>{notLoggedInError}</p>
                              <span className="close-button">
                                  <button onClick={closeErrorPopup}>
                                      &times;
                                      Close
                                  </button>
                              </span>
                          </div>     
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          { noResultsError && (
            <div>
              <p>Sorry, we didn't find anything matching that</p>
            </div>
          )}
          </div>
        </div>
    );
}

export default Homepage;
