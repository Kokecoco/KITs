document.addEventListener('DOMContentLoaded', function() {
  const $ADD_BUTTON = document.getElementById('add-button');
  const $START_BUTTON = document.getElementById('start-button');
  const $STOP_BUTTON = document.getElementById('stop-button');
  const $TIMERS = document.getElementById('timers');
  
  $ADD_BUTTON.addEventListener('click', addTimer);
  $START_BUTTON.addEventListener('click', startAllTimer);
  $STOP_BUTTON.addEventListener('click', stopAllTimer);

  function addTimer() {
    const TIMER_ID = `timer${$TIMERS.children.length + 1}`;
    const $TIMER = document.createElement('div');
    $TIMER.className = 'timer border';
    $TIMER.id = TIMER_ID;
    $TIMER.innerHTML = `
      <div class="input-container">
        <input type="number" class="timer-input border" id="minutes-${TIMER_ID}" min="0" placeholder="分" value="0">
        <span>分</span>
        <input type="number" class="timer-input border" id="seconds-${TIMER_ID}" min="0" max="59" placeholder="秒" value="0">
        <span>秒</span>
      </div>
      <button class="button timer-button start-button border" onclick="startTimer('${TIMER_ID}')">Start</button>
      <button class="button timer-button stop-button border" onclick="stopTimer('${TIMER_ID}')">Stop</button>
      <div class="timer-display" id="timer-display-${TIMER_ID}"></div>
    `;
    $TIMERS.appendChild($TIMER);
  }

  function startAllTimer() { document.querySelectorAll('.timer').forEach(timer => { startTimer(timer.id) }); }
  function stopAllTimer() { document.querySelectorAll('.timer').forEach(timer => { stopTimer(timer.id) }); }
});

let timers = {};

function startTimer(timerId) {
  if (!timers[timerId]) {
    timers[timerId] = {
      timeLeft: 0,
      isRunning: 0,
      intervalId: 0
    };
  }

  const TIMER = timers[timerId];

  const $MINUTES_INPUT = document.getElementById(`minutes-${timerId}`);
  const $SECONDS_INPUT = document.getElementById(`seconds-${timerId}`);
  const $TIMER_DISPLAY = document.getElementById(`timer-display-${timerId}`);

  if (!TIMER.isRunning) {
    let minutes = parseInt($MINUTES_INPUT.value) || 0;
    let seconds = parseInt($SECONDS_INPUT.value) || 0;
    
    const TOTAL_SECONDS = minutes * 60 + seconds;
    if (TIMER.timeLeft === 0) TIMER.timeLeft = TOTAL_SECONDS;
    
    if (TOTAL_SECONDS > 0) {
      TIMER.isRunning = true;
      TIMER.intervalId = setInterval(() => updateTimer(timerId, $TIMER_DISPLAY), 1000);
      updateTimer(timerId, $TIMER_DISPLAY);
      $MINUTES_INPUT.disabled = true;
      $SECONDS_INPUT.disabled = true;
    } else {
      alert('時間を設定してください。');
    }
  }
}

function stopTimer(timerId) {
  clearInterval(timers[timerId].intervalId);
  timers[timerId].isRunning = false;
  document.getElementById(`minutes-${timerId}`).disabled = false;
  document.getElementById(`seconds-${timerId}`).disabled = false;
}

function updateTimer(timerId, $TIMER_DISPLAY) {
  const TIMER = timers[timerId];
  const MINUTES = Math.floor(TIMER.timeLeft / 60);
  const SECONDS = TIMER.timeLeft % 60;
  
  $TIMER_DISPLAY.textContent = `${MINUTES.toString().padStart(2, '0')}:${SECONDS.toString().padStart(2, '0')}`;
  
  if (TIMER.timeLeft === 0) {
    clearInterval(TIMER.intervalId);
    TIMER.isRunning = false;
    notifyUser(timerId);
  } else {
    TIMER.timeLeft--;
  }
}

function notifyUser(timerId) {
  const AUDIO = new Audio('assets/sounds/alerm.mp3');
  AUDIO.play();
  if (Notification.permission === 'granted') {
    new Notification('タイマー', { body: `${timerId}の時間が経過しました!` });
  } else {
    console.log(`${timerId}の時間が経過しました!`);
  }
}

if (Notification.permission !== 'granted' && Notification.permission !== 'denied') Notification.requestPermission();

