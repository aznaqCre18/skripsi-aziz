import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './style.scss';
import moment from 'moment';

import { CalendarIcon, DropdownIcon } from '../../configs/icons';

const SelectDateRangePicker = ({ onChange, title }) => {
  const [startDate, setStartDate] = useState("");

  const handleChangeDate = update => {
    console.log(update);
    setStartDate(update);
    onChange(update);
  };

  return (
    <div className='date-wrapper'>
      <img className='ic-calendar' src={CalendarIcon} alt='icon-calendar' />
      <DatePicker
        selected={startDate}
        onChange={update => handleChangeDate(update)}
        className='date-picker-component'
        placeholderText={title}
        dateFormat="dd MMM yyyy"
      />
      <img src={DropdownIcon} alt='icon-arrow-down' />
    </div>
  );
};

export default SelectDateRangePicker;
