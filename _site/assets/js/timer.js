document.addEventListener('DOMContentLoaded', function() {
  const $START_BUTTON = document.getElementById('start-button');
  const $STOP_BUTTON = document.getElementById('stop-button');
  const $MINUTES_INPUT = document.getElementById('minutes');
  const $SECONDS_INPUT = document.getElementById('seconds');
  const $TIMER_DISPLAY = document.getElementById('timer-display');
  const AUDIO = new Audio('assets/sounds/alerm.mp3');
  
  let timer;
  let timeLeft;
  let isRunning = false;
  
  $START_BUTTON.addEventListener('click', startTimer);
  $STOP_BUTTON.addEventListener('click', stopTimer);
  
  function startTimer() {
    if (!isRunning) {
      let minutes = parseInt($MINUTES_INPUT.value) || 0;
      let seconds = parseInt($SECONDS_INPUT.value) || 0;
      
      const totalSeconds = minutes * 60 + seconds;
      
      if (totalSeconds > 0) {
        timeLeft = totalSeconds;
        isRunning = true;
        timer = setInterval(updateTimer, 1000);
        updateTimer();
        $START_BUTTON.disabled = true;
      } else {
        alert('時間を設定してください。');
      }
    }
  }
  
  function stopTimer() {
    clearInterval(timer);
    isRunning = false;
    $START_BUTTON.disabled = false;
  }
  
  function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    $TIMER_DISPLAY.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if (timeLeft === 0) {
      clearInterval(timer);
      isRunning = false;
      notifyUser();
      $START_BUTTON.disabled = false;
    } else {
      timeLeft--;
    }
  }
  
  function notifyUser() {
    if (Notification.permission === 'granted') {
      new Notification('タイマー', { body: '時間が経過しました' });
    } else {
      AUDIO.play();
      alert('時間が経過しました');
    }
  }
});

