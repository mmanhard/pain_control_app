import AppColors from 'Common/AppColors';

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

  let output;
  if (monthInput) {
    output = formatMonthInput(monthInput);
  }
  if (dayInput) {
    output = output.concat(`/${formatDayInput(dayInput)}`);
  }
  if (yearInput) {
    output = output.concat(`/${formatYearInput(yearInput)}`);
  }

  return output;
}

const formatMonthInput = (monthInput) => {
  monthInput = monthInput.substring(0,2);

  if (monthInput.length == 1 && Number(monthInput) > 1) {
    monthInput = '0'.concat(monthInput);
  }

  if (monthInput === '00') {
    return '0';
  }

  if (Number(monthInput) > 12) {
    return monthInput.substring(0,1);
  }

  return monthInput;
}

const formatDayInput = (dayInput) => {
  dayInput = dayInput.substring(0,2);

  if (dayInput.length == 1 && Number(dayInput) > 3) {
    dayInput = '0'.concat(dayInput);
  }

  if (dayInput === '00') {
    return '0';
  }

  if (Number(dayInput) > 31) {
    return dayInput.substring(0,1);
  }

  return dayInput;
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
  convertPainLeveltoHexColor
}