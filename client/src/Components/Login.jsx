import React, { useState, useEffect, useReducer } from 'react';
import './DateForm.css'

const Login = () => {

  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
  const REDIRECT_URI = "http://localhost:3000/"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  return (
    <div className='formContainer'>
        <h1 className='titleCard'>Spotify Billboard Hot 100</h1>
        <a className='submit' href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&scope=playlist-modify-private&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
    </div>
  );
};

export default Login;