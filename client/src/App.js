import React, { useState, useEffect } from 'react'
import DateForm from './Components/DateForm'
function App() {
  
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET
  
  useEffect(() => {
    //API Access Token
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    
    //making a POST request to get the spotify api token
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => console.log(data))
  }, [])
  
  return (
    <div>
      <DateForm/>
    </div>
  )
}

export default App