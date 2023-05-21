import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [data, setData] = useState([{}]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  };

  const validateDate = (date) => {
    const minDate = new Date(1980, 0, 1);
    const maxDate = new Date(2023, 11, 31);
    return date >= minDate && date <= maxDate;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    // Call your function or perform any desired actions with the selected date
    if (selectedDate) {
      console.log('Selected date:', formatDate(selectedDate));
      // Replace the console.log with your desired function or action
      fetch(`/playlist/${formatDate(selectedDate)}`)
        .then((response) => response.json())
        .then((data) => {
          // Process the response data
          console.log(data);
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select a date"
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={100}
          minDate={new Date(1980, 0, 1)}
          maxDate={new Date(2023, 11, 31)}
          filterDate={validateDate}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DateForm;

