import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('button[data-start]');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');
let timerInterval;
let userSelectedDate;

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
        title: 'Помилка',
        message: 'Будь ласка, оберіть дату в майбутньому.',
        position: 'topRight',
      });
    } else {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);

startButton.addEventListener('click', startTimer);

function startTimer() {
  startButton.disabled = true;
  datetimePicker.disabled = true;
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const now = new Date();
  const timeDifference = userSelectedDate - now;

  if (timeDifference <= 0) {
    clearInterval(timerInterval);
    resetTimerFields();
    iziToast.success({
      title: 'Таймер завершено',
      message: 'Час вийшов!',
      position: 'topRight',
    });
    datetimePicker.disabled = false;
    return;
  }

  const time = convertMs(timeDifference);
  updateTimerFields(time);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerFields(time) {
  daysField.textContent = addLeadingZero(time.days);
  hoursField.textContent = addLeadingZero(time.hours);
  minutesField.textContent = addLeadingZero(time.minutes);
  secondsField.textContent = addLeadingZero(time.seconds);
}

function resetTimerFields() {
  daysField.textContent = '00';
  hoursField.textContent = '00';
  minutesField.textContent = '00';
  secondsField.textContent = '00';
}
