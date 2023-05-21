import React, { useState, useEffect } from 'react'
import DateForm from './Components/DateForm'
function App() {
  
  

  /*useEffect(() => {
    fetch("/playlist").then(
      res => res.json()
    ).then (
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])*/

  return (
    <div>
      <DateForm/>
    </div>
  )
}

export default App