import React, { useState, useEffect } from 'react';
import DateForm from './Components/DateForm';
import Login from './Components/Login';
import { useAuthContext } from "./Hooks/useAuthContext"

function App() {

  const authContext = useAuthContext();
  const { token } = authContext;

  return (
    <div>
      {token ? <DateForm /> : <Login />}
    </div>
  );
}

export default App;
