let startTime, updatedTime, difference, timerInterval;
let isRunning = false;
let laps = [];

const display = document.getElementById('display');
const lapsList = document.getElementById('laps');

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
}

function start() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - (difference || 0);
    timerInterval = setInterval(() => {
      updatedTime = Date.now();
      difference = updatedTime - startTime;
      display.textContent = formatTime(difference);
    }, 10);
  }
}

function pause() {
  if (isRunning) {
    isRunning = false;
    clearInterval(timerInterval);
  }
}

function reset() {
  isRunning = false;
  clearInterval(timerInterval);
  difference = 0;
  display.textContent = '00:00:00';
  laps = [];
  lapsList.innerHTML = '';
}

function lap() {
  if (isRunning && difference > 0) {
    const lapTime = formatTime(difference);
    laps.push(lapTime);
    const li = document.createElement('li');
    li.textContent = `Lap ${laps.length}: ${lapTime}`;
    lapsList.appendChild(li);
  }
}

