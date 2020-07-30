import moment from 'moment';

import AppColors from 'Common/AppColors';

// Takes user input and formats the input to a string with phone number
// format of (xxx)-xxx-xxxx.
const formatPhoneInput = (input) => {
  if (!input) return '';

  // Remove invalid characters.
  input = input.replace(/\D/g, '');
  input = input.substring(0, 10);

  // Format the remaining string.
  if (input.length > 6) {
    input = '(' + input.slice(0, 3) + ') ' + input.slice(3, 6) + '-' + input.slice(6);
  } else if (input.length > 3) {
    input = '(' + input.slice(0, 3) + ') ' + input.slice(3);
  } else {
    input = input;
  }

  return input;
}

// Takes user input and formats the input to a string with date format of
// MM/DD/YYYY. Dates before 01/01/1900 and after the current date will not be
// allowed.
const formatDateInput = (dateInput) => {
  if (!dateInput) return '';

  // Remove invalid characters and separate the date into components.
  let input = dateInput.replace(/\D/g, '');
  input = input.substring(0, 8);
  const monthInput = input.substring(0, 2);
  const dayInput = input.substring(2, 4);
  const yearInput = input.substring(4, 8);

  // Format the date components and add to the output.
  let output = '';
  if (monthInput) {
    output = output.concat(formatTwoDigitInput(monthInput, false, 12));
  }
  if (dayInput) {
    output = output.concat(`/${formatTwoDigitInput(dayInput, false, 31)}`);
  }
  if (yearInput) {
    output = output.concat(`/${formatYearInput(yearInput)}`);
  }

  return output;
}

// Takes user input and formats the input to a string with max two digits. The
// resulting string will be up to 'max' and will include '0' if zeroAllowed is
// included.
const formatTwoDigitInput = (input, zeroAllowed, max) => {
  if (!input) return '';

  input = input.substring(0,2);

  if (input.length == 1 && Number(input) > Math.floor( max / 10)) {
    input = '0'.concat(input);
  }

  if (!zeroAllowed && input === '00') {
    return '0';
  }

  if (Number(input) > max) {
    return input.substring(0,1);
  }

  return input;
}

// Takes user input and formats the input to a string with year format of
// YYYY. Years before 1900 and after the current year will not be
// allowed.
const formatYearInput = (yearInput) => {
  if (!yearInput) return '';

  yearInput = yearInput.substring(0,4);

  const mill = yearInput[0];
  const century = yearInput[1];
  const decade = yearInput[2];

  // Format the year using the millenium, century, and decade.
  if (mill) {
    if (!(mill === '1' || mill === '2')) {
      yearInput = '';
    }
  }
  if (century) {
    if (mill === '2' && century !== '0'){
      yearInput = yearInput[0];
    } else if (mill === '1' && century !== '9') {
      yearInput = yearInput[0];
    }
  }
  if (decade) {
    if (mill === '2' && Number(decade) > 2) {
      yearInput = yearInput.substring(0,2);
    }
  }

  // Verify the provided year is not after the current one.
  const currentYear = moment().year();
  if (Number(yearInput) > currentYear) {
    return yearInput.substring(0,3);
  }

  return yearInput;
}

// Takes user input and formats the input to a string with time format of
// xx:xx.
const formatTimeInput = (timeInput) => {
  if (!timeInput) return '';

  // Remove invalid characters and separate into components.
  let input = timeInput.replace(' ', '').replace(':','');
  const hourInput = input.substring(0, 2);
  const minuteInput = input.substring(2, 4);

  // Format the time components and add to the output.
  let output = '';
  if (hourInput) {
    output = output.concat(formatTwoDigitInput(hourInput, false, 12));
  }
  if (minuteInput) {
    output = output.concat(`:${formatTwoDigitInput(minuteInput, true, 59)}`);
  }

  return output;
}

// Converts date, time, and time period (either AM/PM) in string format to a
// moment.
const convertDateTimeToMoment = (date, time, timePeriod) => {

  // Confirm that date, time, and time period provided are all valid.
  if (!date || date.length != 10) return undefined;
  if (!time || time.length != 5) return undefined;
  if (!timePeriod || (timePeriod != 'AM' && timePeriod != 'PM')) {
    return undefined;
  }

  // Initialize the moment with the current time.
  let output = moment();
  time = time.replace(' ', '').replace(':','');
  const hour = (timePeriod == 'PM' ? 12 : 0) + Number(time.substring(0, 2));
  const minute = time.substring(2, 4);
  output.hour(hour);
  output.minute(minute);

  // Add the current date to the moment.
  date = date.replace(/\D/g, '');
  const month = date.substring(0, 2);
  const day = date.substring(2, 4);
  const year = date.substring(4, 8);
  output.date(day);
  output.month(month-1);
  output.year(year);

  return output;
}

// Converts pain levels (0- 10) to the corresponding color.
const convertPainLeveltoHexColor = (painLevel) => {
  switch (Math.floor(painLevel / 2) % 5) {
    case 4:
      return AppColors.painLevelColors.xHigh;
    case 3:
      return AppColors.painLevelColors.high;
    case 2:
      return AppColors.painLevelColors.medium;
    case 1:
      return AppColors.painLevelColors.low;
    case 0:
      return AppColors.painLevelColors.xLow;
    default:
      return AppColors.painLevelColors.none;
  }
}

export default {
  formatPhoneInput,
  formatDateInput,
  formatTimeInput,
  convertDateTimeToMoment,
  convertPainLeveltoHexColor
}