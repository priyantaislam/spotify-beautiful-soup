import React, { useState, useEffect } from 'react';
import DateForm from './Components/DateForm';
import { useAuthContext } from './Hooks/useAuthContext';

function App() {

  //AUTHENTICATION DETAILS FOR SPOTIFY API
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
  const { dispatch } = useAuthContext();

  useEffect(() => {
    //API Access Token Parameters in request body
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    };

    //making a POST request to get the spotify api token
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      //log the token for testing
      .then(data => dispatch({type: 'TOKEN', payload: data.access_token}));
  }, []);

  return (
    <div>
      <DateForm/>
    </div>
  );
}

export default App;
