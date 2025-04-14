let timeLeft = 85;
  const timerElement = document.getElementById('timer');

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function updateTimer() {
    timerElement.textContent = formatTime(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
    } else {
      timeLeft--;
    }
  }

  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);