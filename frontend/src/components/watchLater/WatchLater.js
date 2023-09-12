import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import Navbar from '../Navbar/Navbar';

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
        <h2 className='heading'>Your Watch Later List</h2>
        {watchLaterMovies.length > 0 ? (
        <ul>
        {watchLaterMovies.map((movie) => (
            <div key={movie.id}>
                <h2 className='title'>{movie.title ? movie.title : movie.name}</h2>
                <p>Synopsis: {movie.overview}</p>
                <div className="poster-container">
                        <img
                        className="poster-image"
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} // poster_path is null in some movies
                        alt={movie.title}
                        />
                </div>
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
        ))}
        </ul>
            ) : (
        <p>Nothing in watch later list. Search and add something</p>
        )}
        </div>
    );
}

export default WatchLater;

