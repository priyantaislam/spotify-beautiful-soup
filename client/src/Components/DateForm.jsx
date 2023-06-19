import React, { useState, useEffect, useReducer } from 'react';
import { useAuthContext } from '../Hooks/useAuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateForm.css'
import gifImage from '../Assets/cassette2.gif';
import gifImage2 from '../Assets/cassette3.gif';

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

  //formats date in dd-mm-yyyy
  const displayFormat = (date) => {
    var parts = date.split("-");
    var year = parts[0];
    var month = parts[1];
    var day = parts[2];

    return day + "-" + month + "-" + year;
  }

  //Validates input date in range
  const validateDate = (date) => {
    const minDate = new Date(1960, 1, 1);
    const maxDate = new Date(2023, 11, 31);
    return date >= minDate && date <= maxDate;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    setLoading(true); // Start loading
    setPlaylistID("");
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
            <span className='displayDate'>{displayFormat(date)}</span>
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
                disabled={loading}
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
      {playlistID === "" ? (
        <div className='defaultScreen' style={{ background: 'black', width: '100%', height: '100%', minHeight: '360px' }}>
        {loading ? (
          <div className='gifContainer'>
            <p className='loadingText'>Please wait while we create the playlist...</p>
            <img  className="gif" src={gifImage} alt="Animated GIF" style={{ width: '20%', height: '20%' }} />
          </div>
        ) : (
          <div className='gifContainer'>
            <p className='loadingText'>Select a date and listen to the Billboard Hot 100 of that day. Let the sounds of the past roll back the years!</p>
            <img  className="gif" src={gifImage2} alt="Animated GIF" style={{ width: '20%', height: '20%' }} />
          </div>
        )}
        </div>
        ) :
        <iframe
          title="Spotify Embed: Recommendation Playlist "
          src={`https://open.spotify.com/embed/playlist/${playlistID}?utm_source=generator&theme=0`}
          width="100%"
          height="100%"
          style={{ minHeight: '430px' }}
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className='spotifyFrame'
        />
      }
    </div>
  );
};

export default DateForm;

