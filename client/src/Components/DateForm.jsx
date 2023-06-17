import React, { useState, useEffect, useReducer } from 'react';
import { useAuthContext } from '../Hooks/useAuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateForm.css'

const DateForm = () => {
  const [date, setDate] = useState("0000-00-00");
  const [songs, setSongs] = useState([]);
  const { token, dispatch } = useAuthContext();

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
          // console.log(data);
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
    window.location.reload();
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
        <button className='logout' type="button" onClick={handleLogout}>
          Logout
        </button>
      </form>
    </div>
  );
};

export default DateForm;

