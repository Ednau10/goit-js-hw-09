// Descrito en la documentación
// import flatpickr from "flatpickr";
// Importación adicional de estilos
// import "../../node_modules/flatpickr/dist/flatpickr.min.css";


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

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();
    if (selectedDate < now) {
      window.alert("Please choose a date in the future");
      document.querySelector('[data-start]').disabled = true;
    } else {
      document.querySelector('[data-start]').disabled = false;
      let countdownInterval;
      countdownInterval = setInterval(() => {
        let timeLeft = selectedDate.getTime() - new Date().getTime();
        if (timeLeft <= 0) {
          clearInterval(countdownInterval);
          document.querySelectorAll('[data-days], [data-hours], [data-minutes], [data-seconds]').forEach((el) => el.innerHTML = '00');
          document.querySelector('[data-start]').disabled = true;
        } else {
          const { days, hours, minutes, seconds } = convertMs(timeLeft);

          document.querySelector('[data-days]').innerHTML = padNumber(days);
          document.querySelector('[data-hours]').innerHTML = padNumber(hours);
          document.querySelector('[data-minutes]').innerHTML = padNumber(minutes);
          document.querySelector('[data-seconds]').innerHTML = padNumber(seconds);

          timeLeft -= 1000;

          if (timeLeft < 0) {
            clearInterval(countdownInterval);
            document.querySelectorAll('[data-days], [data-hours], [data-minutes], [data-seconds]').forEach((el) => el.innerHTML = '00');
            document.querySelector('[data-start]').disabled = true;
          }
        }
      }, 1000);
    }
  },
};

const datetime = document.querySelector("#datetime-picker");

function padNumber(num) {
  return num.toString().padStart(2, '0');
}

flatpickr(datetime, options);