import React, { useState, useEffect, useReducer } from 'react';
import './DateForm.css'
import gifImage from '../Assets/cassette.gif';

const Login = () => {

  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
  const REDIRECT_URI = "http://localhost:3000/"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  return (
    <div className='formContainer'>
        <h1 className='titleCard'>Spotify Billboard Hot 100</h1>
        <a className='login' href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&scope=playlist-modify-private&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&show_dialog=true`}>Login
                        to Spotify</a>
      <div className='gifContainer' style={{ background: 'black', width: '100%', height: '100%', minHeight: '360px' }}>
        <p className='loadingText'>Create a Spotify playlist for Billboard Hot 100 of any date!</p>
        <img  className="gif" src={gifImage} alt="Animated GIF" style={{ width: '20%', height: '20%' }} />
      </div>
    </div>
    
  );
};

export default Login;