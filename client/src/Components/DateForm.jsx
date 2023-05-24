import React, { useState, useEffect, useReducer } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateForm.css'
import { useAuthContext } from '../Hooks/useAuthContext';

const DateForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [date, setDate] = useState("00-00-0000");
  //Grabs the spotify auth token
  const { token } = useAuthContext();

  //changes the date on change
  const handleDateChange = (date) => {
    setSelectedDate(date);
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
    
    // making the backend API call with selected date
    if (selectedDate) {
      console.log('Selected date:', formatDate(selectedDate));
      // Replace the console.log with your desired function or action
      fetch(`/playlist/${formatDate(selectedDate)}`)
        .then((response) => response.json())
        .then((data) => {
          // Process the response data
          console.log(token);
          console.log(data);
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
    }
  };

  return (
    <div className='formContainer'>
      <form className="form" onSubmit={handleSubmit}>
        <div className='date'>
          <DatePicker
            selected={selectedDate}
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
        <div className='displayDiv'>
          <span className='displayDate'>{date}</span>
        </div>
        <button className='submit' type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DateForm;

