import React, { useState, useEffect } from 'react'

function App() {
  
  const [data,setData] = useState([{}])

  useEffect(() => {
    fetch("/playlist").then(
      res => res.json()
    ).then (
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div>
      {(typeof data.songs === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        data.songs.map((song, i) => (
          <p key={i}>{song}</p>
        ))
      )}
    </div>
  )
}

export default App