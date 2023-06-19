import React, { useState, useEffect, useReducer } from 'react';
import { useAuthContext } from '../Hooks/useAuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateForm.css'

const DateForm = () => {
  const [date, setDate] = useState("1985-01-01");
  const { token, dispatch } = useAuthContext();
  const [playlistID, setPlaylistID] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

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

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    setLoading(true); // Start loading
    console.log(token);
  
    // Create the playlist
    // Making the backend API call with selected date
    if (date) {
      console.log('Selected date:', date);
      fetch(`/playlist/${date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Process the response data
          setPlaylistID(data.playlist_id)
          setLoading(false); // Stop loading
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
  
      // Display playlist in embedded window
    }
  };

  const handleLogout = () => {
    dispatch({type: 'TOKEN', payload: null});
    window.localStorage.removeItem("token");
    setPlaylistID("");
    window.location.reload();
  };

  return (
    <div>
      <div className='formContainer'>
        <form className="form" onSubmit={handleSubmit}>
          <div className='displayDiv'>
            <span className='displayDate'>{date}</span>
          </div>
          <div className='dateContainer'>
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
                maxDate={new Date(2022, 11, 31)}
                filterDate={validateDate}
              />
            </div>
            <button className='submit' type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </div>
          <button className='logout' type="button" onClick={handleLogout}>
            Logout
          </button>
        </form>
      </div>
      {playlistID === "" 
        ?
        <div style={{ background: 'black', width: '100%', height: '100%', minHeight: '360px' }}>
          <h2 style={{ color: 'white', textAlign: 'center' }}>Test Component</h2>
        </div>
        :
        <iframe
          title="Spotify Embed: Recommendation Playlist "
          src={`https://open.spotify.com/embed/playlist/${playlistID}?utm_source=generator&theme=0`}
          width="100%"
          height="100%"
          style={{ minHeight: '430px' }}
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      }
    </div>
  );
};

export default DateForm;

