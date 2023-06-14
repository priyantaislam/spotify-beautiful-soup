import React, { useState, useEffect } from 'react';
import DateForm from './Components/DateForm';
import Login from './Components/Login';
import { useAuthContext } from "./Hooks/useAuthContext"

function App() {
  const { token, dispatch } = useAuthContext();

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    // getToken()
    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];

        window.location.hash = "";
        window.localStorage.setItem("token", token);
    }

    //Set token in our Auth Context
    dispatch({type: 'TOKEN', payload: token});
  }, [])

  return (
    <div>
      {token ? <DateForm /> : <Login />}
    </div>
  );
}

export default App;
