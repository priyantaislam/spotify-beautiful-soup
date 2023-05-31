import React, { useState, useEffect, useReducer } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateForm.css'
import { useAuthContext } from '../Hooks/useAuthContext';

const DateForm = () => {
  const [date, setDate] = useState("0000-00-00");
  const [songs, setSongs] = useState([]);
  //the song title and artist name for a particular track
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  //Grabs the spotify auth token
  const { token } = useAuthContext();

  //changes the date on change
  const handleDateChange = (date) => {
    setDate(formatDate(date));
  };

  //formats the date in yyyy-mm-dd
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  };

  //Validates input date in range
  const validateDate = (date) => {
    const minDate = new Date(1960, 1, 1);
    const maxDate = new Date(2023, 11, 31);
    return date >= minDate && date <= maxDate;
  };

  //set spotify query and send api request for search
  const spotifySearch = (song, artist) => {
    // Format song and artist for query string
    const songStr = song.replace(/ /g, '%');
    const artistStr = artist.replace(/ /g, '%');
    //Constructing the query string
    const url = `https://api.spotify.com/v1/search?q=${songStr}%20artist:${artistStr}&type=track&limit=1&offset=0`;
  
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.json())
      .then((data) => {
        // Handle the response data here
        
      })
      .catch((error) => {
        // Handle any errors here
      });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    
    //Create the playlist
    // making the backend API call with selected date
    if (date) {
      console.log('Selected date:', date);
      // Replace the console.log with your desired function or action
      fetch(`/playlist/${date}`)
        .then((response) => response.json())
        .then((data) => {
          // Process the response data
          console.log(token);
          setSongs(data.songs);
          songs.forEach((song) => {
            // Perform any desired operations with each song
            setSongName(song[0]);
            setArtistName(song[1]);
            //Search for track and add them
          });
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
      //Display playlist in embedded window
      
    }
  };

  return (
    <div className='formContainer'>
      <form className="form" onSubmit={handleSubmit}>
        <div className='displayDiv'>
          <span className='displayDate'>{date}</span>
        </div>
        <div className='date'>
          <DatePicker
            //selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a date"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            minDate={new Date(1960, 1, 1)}
            maxDate={new Date(2023, 11, 31)}
            filterDate={validateDate}
          />
        </div>
        <button className='submit' type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DateForm;

