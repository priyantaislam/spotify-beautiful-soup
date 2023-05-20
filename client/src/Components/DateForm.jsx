import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
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
      console.log('Selected date:', selectedDate);
      // Replace the console.log with your desired function or action
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MM/dd/yyyy"
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
