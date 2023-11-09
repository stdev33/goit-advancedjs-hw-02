import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const errorTitle = 'Error';
const errorMessage = 'Please choose a date in the future';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysLabel: document.querySelector('span[data-days]'),
  hoursLabel: document.querySelector('span[data-hours]'),
  minutesLabel: document.querySelector('span[data-minutes]'),
  secondsLabel: document.querySelector('span[data-seconds]'),
};

let targetTimestamp = 0;
let timeLeft = 0;
let timerId = -1;

refs.startBtn.disabled = true;

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onDateTimeSelected(selectedDates[0].getTime());
  },
};

const dateTimePicker = flatpickr(refs.input, flatpickrOptions);
refs.startBtn.addEventListener('click', onStartBtnClick);

function onDateTimeSelected(timestamp) {
  if (timestamp <= Date.now()) {
    refs.startBtn.disabled = true;
    displayError(errorTitle, errorMessage);
    return;
  }

  targetTimestamp = timestamp;
  refs.startBtn.disabled = false;
}

function onStartBtnClick() {
  refs.startBtn.disabled = true;

  if (targetTimestamp < Date.now()) {
    displayError(errorTitle, errorMessage);
    return;
  }

  refs.input.disabled = true;
  timerId = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeLeft = targetTimestamp - Date.now();

  if (timeLeft > 0) {
    displayTimer(timeLeft);
  } else {
    clearInterval(timerId);
    displayTimer(0);
    refs.input.disabled = false;
    timerId = -1;
    timeLeft = 0;
  }
}

function displayTimer(timeLeftMs) {
  const { days, hours, minutes, seconds } = convertMs(timeLeftMs);

  refs.daysLabel.textContent = addLeadingZero(days);
  refs.hoursLabel.textContent = addLeadingZero(hours);
  refs.minutesLabel.textContent = addLeadingZero(minutes);
  refs.secondsLabel.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function displayError(title, message) {
  iziToast.error({
    title,
    message,
  });
}
