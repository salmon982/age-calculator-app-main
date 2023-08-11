const form = document.querySelector('form');
const arrowButton = document.querySelector('.arrow-button');
const errorTexts = document.querySelectorAll('.error');
const allInputs = document.querySelectorAll('input');
const allLabels = document.querySelectorAll('label');
let dateValid = true;
const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const results = document.querySelectorAll('span');

arrowButton.addEventListener('click', (e) => {
  e.preventDefault();

  let day = document.querySelector('#day');
  let month = document.querySelector('#month');
  let year = document.querySelector('#year');

  errorTexts.forEach(error => {
    error.style.opacity = '0';
  });

  allInputs.forEach(input => {
    input.classList.remove('error-input')
  });

  allLabels.forEach(label => {
    label.classList.remove('red');
  });

  results.forEach(result => {
    result.textContent = '--';
  })

  dateValid = true;

  let isValid = validateForm(day, month, year);

  if (isValid) {
    calculateAge(day, month, year);
  };
});

function validateForm(day, month, year) {
  if (day.value < 1 || day.value > 31) {
    displayError(day, 'Must be a valid day');
    dateValid = false;
  };

  if (month.value < 1 || month.value > 12) {
    displayError(month, 'Must be a valid month');
    dateValid = false;
  };

  if (year.value < 1) {
    displayError(year, 'Must be a valid year');
    dateValid = false;
  };

  if (year.value > currentYear) {
    displayError(year, 'Must be in the past');
    dateValid = false;
  }

  if (isLeapYear(year.value)) {
    daysInMonth[2] = 29;
  };

  if (day.value > daysInMonth[month.value]) {
    displayError(day, 'Must be a valid date');
    dateValid = false;
  };

  if (day.value === '') {
    displayError(day, 'This field is required');
    dateValid = false;
  };

  if (month.value === '') {
    displayError(month, 'This field is required');
    dateValid = false;
  };

  if (year.value === '') {
    displayError(year, 'This field is required');
    dateValid = false;
  };

  if (!dateValid) {
    dateValid = false;
  } else {
    dateValid = true;
  }

  console.log(dateValid)
  return dateValid;
};

function calculateAge(day, month, year) {
  let birthDate = new Date(year.value, month.value - 1, day.value);

  let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
  let ageMonths = currentDate.getMonth() - birthDate.getMonth();
  let ageDays = currentDate.getDate() - birthDate.getDate();

  if (ageDays < 0) {
    ageMonths--;
    const daysInLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    ageDays += daysInLastMonth;
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  let dayResult = document.querySelector('.days');
  let monthResult = document.querySelector('.months');
  let yearResult = document.querySelector('.years');

  dayResult.textContent = ageDays.toString();
  monthResult.textContent = ageMonths.toString();
  yearResult.textContent = ageYears.toString();
};

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

function displayError(element, msg) {
  let errorParagraph = element.nextElementSibling;
  let errorLabel = element.previousElementSibling;
  errorParagraph.textContent = msg;
  errorParagraph.style.opacity = '1';
  errorLabel.classList.add('red');
  element.classList.add('error-input');
};