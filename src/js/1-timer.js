import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  datetimePickerEl: document.querySelector('#datetime-picker'),
  startBtnEl: document.querySelector('[data-start]'),
  stopBtnEl: document.querySelector('[data-stop]'),
  dayEl: document.querySelector('[data-days]'),
  hourEl: document.querySelector('[data-hours]'),
  minEl: document.querySelector('[data-minutes]'),
  secEl: document.querySelector('[data-seconds]'),
};

let userSelectedDate = null;
let intervalId = null;

const updateElementStatus = isTimerActive => {
  refs.datetimePickerEl.disabled = isTimerActive;
  refs.startBtnEl.disabled = isTimerActive;
  refs.stopBtnEl.disabled = !isTimerActive;
};

const onStartClick = () => {
  if (userSelectedDate === null) return;

  const targetDate = userSelectedDate.getTime();
  intervalId = setInterval(() => updateTimer(targetDate), 1000);

  updateElementStatus(true);
};

const onStopClick = () => {
  clearInterval(intervalId);
  resetTimerFields();
  updateElementStatus(false);
};

const updateTimer = EndDate => {
  const timeLeft = EndDate - Date.now();

  if (timeLeft <= 0) {
    clearInterval(intervalId);
    resetTimerFields();
    updateElementStatus(false);
    iziToast.info({
      title: 'The timer has ended!',
      message: 'The selected date has arrived',
      position: 'topRight',
    });
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeLeft);

  refs.dayEl.textContent = formatTimeValue(days);
  refs.hourEl.textContent = formatTimeValue(hours);
  refs.minEl.textContent = formatTimeValue(minutes);
  refs.secEl.textContent = formatTimeValue(seconds);
};

const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const formatTimeValue = value => {
  return value < 10 ? '0' + value : value;
};

const resetTimerFields = () => {
  [refs.dayEl, refs.hourEl, refs.minEl, refs.secEl].forEach(
    field => (field.textContent = '00')
  );
};

refs.startBtnEl.disabled = true;

flatpickr(refs.datetimePickerEl, {
  enableTime: true,
  time_24hr: true,
  minDate: 'today',
  defaultDate: Date.now(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < Date.now()) {
      iziToast.error({
        title: 'Error!',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      refs.startBtnEl.disabled = true;
      return;
    }

    refs.startBtnEl.disabled = false;
  },
});

refs.startBtnEl.addEventListener('click', onStartClick);

refs.stopBtnEl.addEventListener('click', onStopClick);
