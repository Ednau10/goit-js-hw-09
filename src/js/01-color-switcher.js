function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  
  let intervalId;
  
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  //espera a que den click en el botón "Start"
  startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    intervalId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    console.log(document.body.style.backgroundColor.includes);
  });
  //espera a que den click en el botón "Stop", para detenerlo
  stopBtn.addEventListener('click', () => {
    startBtn.disabled = false;
    clearInterval(intervalId);
  });
