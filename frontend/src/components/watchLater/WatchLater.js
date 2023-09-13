import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
import "../watchLater/WatchLater.css"

const WatchLater = () => {
    const id = window.localStorage.getItem('userId')
    const [watchLaterMovies, setWatchLaterMovies] = useState([]); 
    

    useEffect(() => {
        fetchWatchLaterMovies();
    }, []);

    const fetchWatchLaterMovies = async () => {
        try {
        const response = await fetch(`/watchLater/${id}`);
        if (response.ok) {
            const data = await response.json();
            setWatchLaterMovies(data.watchLater);
        } else {
            console.error("Failed to fetch watch later movies");
        }
        } catch (error) {
        console.error("Error fetching watch later movies:", error);
        }
    };
    
    const removeFromWatchLater = async (movieId) => {
        const id = window.localStorage.getItem('userId');
        try {
            const response = await fetch(`/watchLater/${id}/${movieId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },   
            });
    
            if (response.ok) {
                const response = await fetch(`/watchLater/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setWatchLaterMovies(data.watchLater);
                    
                } else {
                    console.error("Error getting watch-later movies:", response.statusText);
                }
            } else {
                console.error("Error removing movie from watch later:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    
    return (
        <div>
        <Navbar />
        <div className='main-div'>
            <h1 className='heading'>Your Watch Later List</h1>
            {watchLaterMovies.length > 0 ? (
            <div className='search-results'>
            {watchLaterMovies.map((movie) => (
                <div className="watch-later-card" key={movie.id}>
                    <div className="poster-container content-left">
                            <img
                            className="poster-image"
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} // poster_path is null in some movies
                            alt={movie.title}
                            />
                    </div>
                    <div className='content-right'>
                        <h2 className='title'>{movie.title ? movie.title : movie.name}</h2>
                        <p>Synopsis: {movie.overview}</p>
                        <p>Rating: {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</p>
                        <Link to={`/streaming-info/${movie.id}/${movie.title ? movie.title : movie.name}`} 
                            style={{ textDecoration: 'none' }}
                            className='streaming-link'>
                            <p><strong>Click here for Streaming Links</strong></p>
                        </Link>
                        <button 
                            className='remove'
                            onClick={() => removeFromWatchLater(movie.id)}>
                            Remove from Watch Later
                        </button>
                    </div>
                </div>
            ))}
            </div>
                ) : (
            <p>Nothing in watch later list. Search and add something</p>
            )}
        </div>
        </div>
    );
}

export default WatchLater;

