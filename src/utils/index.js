import AppColors from 'Common/AppColors';
import moment from 'moment';

const formatPhoneInput = (input) => {
  input = input.replace(/\D/g, '');
  input = input.substring(0, 10);
  if (input.length > 6) {
    input = '(' + input.slice(0, 3) + ') ' + input.slice(3, 6) + '-' + input.slice(6);
  } else if (input.length > 3) {
    input = '(' + input.slice(0, 3) + ') ' + input.slice(3);
  } else {
    input = input;
  }

  return input;
}

const formatDateInput = (dateInput) => {
  let input = dateInput.replace(/\D/g, '');
  input = input.substring(0, 8);
  const monthInput = input.substring(0, 2);
  const dayInput = input.substring(2, 4);
  const yearInput = input.substring(4, 8);

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

const formatTwoDigitInput = (input, zeroAllowed, max) => {
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

const formatYearInput = (yearInput) => {
  yearInput = yearInput.substring(0,4);

  const mill = yearInput[0];
  const century = yearInput[1];
  const decade = yearInput[2];

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

  if (Number(yearInput) > 2020) {
    return yearInput.substring(0,3);
  }

  return yearInput;
}

const formatTimeInput = (timeInput) => {
  let input = timeInput.replace(' ', '').replace(':','');
  const hourInput = input.substring(0, 2);
  const minuteInput = input.substring(2, 4);

  let output = '';
  if (hourInput) {
    output = output.concat(formatTwoDigitInput(hourInput, false, 12));
  }
  if (minuteInput) {
    output = output.concat(`:${formatTwoDigitInput(minuteInput, true, 59)}`);
  }

  return output;
}

const convertDateTimeToMoment = (date, time, timePeriod) => {
  if (!date || date.length < 10) return undefined;
  if (!time || time.length < 5) return undefined;
  if (!timePeriod || (timePeriod != 'AM' && timePeriod != 'PM')) {
    return undefined;
  }

  let output = moment();
  time = time.replace(' ', '').replace(':','');
  const hour = (timePeriod == 'PM' ? 12 : 0) + Number(time.substring(0, 2));
  const minute = time.substring(2, 4);
  output.hour(hour);
  output.minute(minute);

  date = date.replace(/\D/g, '');
  const month = date.substring(0, 2);
  const day = date.substring(2, 4);
  const year = date.substring(4, 8);
  output.date(day);
  output.month(month-1);
  output.year(year);

  return output;
}

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