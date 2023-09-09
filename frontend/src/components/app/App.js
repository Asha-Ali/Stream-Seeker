import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import Homepage from '../homepage/Homepage';
import MovieLinks from '../movielinks/MovieLinks';
import React, { useState } from 'react';
import UserProfile from '../user/UserProfile';
import WatchLater from '../watchLater/WatchLater';


import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";
import StreamingInfo from '../movielinks/StreamingInfo';

const App = () => {
    return (
        <Routes>
          <Route path='/streaming-info/:id/:title' element={<StreamingInfo/>} />
          <Route path='/watchLater/:id' element={<WatchLater />} />
          <Route path='/' element={<Homepage/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
          <Route path='/users/:userId' element={<UserProfile />}/>
          <Route path="/movie-links/:movieId/:movieTitle" element={<MovieLinks navigate={ useNavigate() }/>} />
        </Routes>
    );
}

export default App;
