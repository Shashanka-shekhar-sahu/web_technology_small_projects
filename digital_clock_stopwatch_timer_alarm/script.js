// Function to show/hide sections
function showClock() {
  $(".clock").show();
  $(".stopwatch, .timer").hide();
}

function showStopwatch() {
  $(".stopwatch").show();
  $(".clock, .timer").hide();
}

function showTimer() {
  $(".timer").show();
  $(".clock, .stopwatch").hide();
}

// Event Listeners
$("#stopwatch-btn").click(showStopwatch);
$("#timer-btn").click(showTimer);
$(".back-btn").click(showClock);

// Digital Clock
function updateTime() {
  const time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; 

  $("#hour").text(hours.toString().padStart(2, '0'));
  $("#min").text(minutes.toString().padStart(2, '0'));
  $("#sec").text(seconds.toString().padStart(2, '0'));
  $("#ampm").text(ampm);
}
setInterval(updateTime, 1000);
updateTime();

// Stopwatch
let stopwatchRunning = false, stopwatchInterval;
let stopwatchMs = 0, stopwatchSec = 0, stopwatchMin = 0, stopwatchHr = 0;

function updateStopwatch() {
  stopwatchMs++;
  if (stopwatchMs === 100) { stopwatchMs = 0; stopwatchSec++; }
  if (stopwatchSec === 60) { stopwatchSec = 0; stopwatchMin++; }
  if (stopwatchMin === 60) { stopwatchMin = 0; stopwatchHr++; }

  $("#stopwatch-hour").text(stopwatchHr.toString().padStart(2, '0'));
  $("#stopwatch-min").text(stopwatchMin.toString().padStart(2, '0'));
  $("#stopwatch-sec").text(stopwatchSec.toString().padStart(2, '0'));
  $("#stopwatch-ms").text(stopwatchMs.toString().padStart(2, '0'));
}

$(".start-stopwatch").click(function () {
  if (!stopwatchRunning) {
      stopwatchInterval = setInterval(updateStopwatch, 10);
      stopwatchRunning = true;
      $(this).hide();
      $(".lap-stopwatch").show();
  }
});

$(".reset-stopwatch").click(function () {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
  stopwatchMs = stopwatchSec = stopwatchMin = stopwatchHr = 0;
  lapCount = 0;
  updateStopwatch();
  $(".start-stopwatch").show();
  $(".lap-stopwatch").hide();
  $(".stopwatch .laps").html(""); // 🚀 Clear all lap records
});

// 🚀 LAP RECORDING LOGIC
let lapCount = 0;

$(".lap-stopwatch").click(function () {
    if (stopwatchRunning) {
        lapCount++;
        let lapTime = `${stopwatchHr.toString().padStart(2, '0')}:
                       ${stopwatchMin.toString().padStart(2, '0')}:
                       ${stopwatchSec.toString().padStart(2, '0')}:
                       ${stopwatchMs.toString().padStart(2, '0')}`;

        $(".stopwatch .laps").append(`<div class="lap"><p>Lap ${lapCount}</p><p>${lapTime}</p></div>`);
    }
});


// Timer
let timerRunning = false, timerInterval, timerTime = 0;

$(".start-timer").click(function () {
  if (!timerRunning) {
      let minutes = prompt("Enter minutes:");
      if (!isNaN(minutes) && minutes > 0) {
          timerTime = minutes * 60;
          timerRunning = true;
          $(".stop-timer").show();
          $(".start-timer").hide();
          
          timerInterval = setInterval(() => {
              if (timerTime > 0) {
                  timerTime--;
                  $("#timer-min").text(Math.floor(timerTime / 60).toString().padStart(2, '0'));
                  $("#timer-sec").text((timerTime % 60).toString().padStart(2, '0'));
              } else {
                  alert("Time's up!");
                  clearInterval(timerInterval);
                  timerRunning = false;
                  $(".start-timer").show();
                  $(".stop-timer").hide();
              }
          }, 1000);
      }
  }
});

$(".stop-timer").click(function () {
  clearInterval(timerInterval);
  timerRunning = false;
  $(".start-timer").show();
  $(".stop-timer").hide();
});

$(".reset-timer").click(function () {
  clearInterval(timerInterval);
  timerRunning = false;
  timerTime = 0;
  $("#timer-min").text("00");
  $("#timer-sec").text("00");
  $(".start-timer").show();
  $(".stop-timer").hide();
}); 

// Alarm
document.addEventListener("DOMContentLoaded", () => {
  const alarmHour = document.getElementById("alarm-hour");
  const alarmMin = document.getElementById("alarm-min");
  const alarmAmPm = document.getElementById("alarm-ampm");
  const setAlarmBtn = document.querySelector(".set-alarm");
  const stopAlarmBtn = document.querySelector(".stop-alarm");
  const backBtn = document.querySelector(".alarm .back-btn");
  const alarmSound = document.getElementById("alarm-sound");
  const alarmSection = document.querySelector(".alarm");
  const alarmList = document.createElement("ul");
  alarmList.classList.add("alarm-list");
  document.querySelector(".alarm").appendChild(alarmList);
  let alarms = [];

  function checkAlarm() {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let ampm = hours >= 12 ? "PM" : "AM";
      
      hours = hours % 12 || 12;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      
      const currentTime = `${hours}:${minutes} ${ampm}`;
      alarms.forEach((alarm, index) => {
          if (alarm.time === currentTime && !alarm.ringing) {
              alarmSound.play();
              alarm.ringing = true;
              stopAlarmBtn.classList.remove("hidden");
              stopAlarmBtn.setAttribute("data-index", index);
          }
      });
  }

  function setAlarm(hour = null, minute = null, ampm = null) {
      if (!hour || !minute || !ampm) {
          hour = alarmHour.textContent;
          minute = alarmMin.textContent.padStart(2, '0');
          ampm = alarmAmPm.textContent;
      }
      const alarmTime = `${hour}:${minute} ${ampm}`;
      
      const alarmObj = { time: alarmTime, ringing: false };
      alarms.push(alarmObj);
      
      let alarmItem = document.createElement("li");
      alarmItem.textContent = `Alarm Set: ${alarmTime}`;
      
      let deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete-alarm", "btn");
      deleteBtn.addEventListener("click", () => {
          alarms = alarms.filter(a => a !== alarmObj);
          alarmItem.remove();
      });
      
      let setBtn = document.createElement("button");
      setBtn.textContent = "Set";
      setBtn.classList.add("set-alarm-again", "btn");
      setBtn.addEventListener("click", () => {
          setAlarm(hour, minute, ampm);
      });
      
      alarmItem.appendChild(deleteBtn);
      alarmItem.appendChild(setBtn);
      alarmList.appendChild(alarmItem);
  }

  function stopAlarm() {
      alarmSound.pause();
      alarmSound.currentTime = 0;
      stopAlarmBtn.classList.add("hidden");
      alarms = alarms.filter(a => !a.ringing);
  }

  function showAlarm() {
      $(".alarm").show();
      $(".clock, .stopwatch, .timer").hide();
  }

  function enableScrollSelection(target, values) {
      let currentIndex = values.indexOf(target.textContent);
      target.addEventListener("wheel", (event) => {
          event.preventDefault();
          currentIndex = event.deltaY < 0 ? (currentIndex + 1) % values.length : (currentIndex - 1 + values.length) % values.length;
          target.textContent = values[currentIndex];
      });
      target.addEventListener("click", () => {
          currentIndex = (currentIndex + 1) % values.length;
          target.textContent = values[currentIndex];
      });
  }

  function createIncrementDecrementButtons(target, values) {
      const container = document.createElement("div");
      container.classList.add("inc-dec-container");
      
      const plusBtn = document.createElement("button");
      plusBtn.textContent = "+";
      plusBtn.classList.add("inc-btn", "btn");
      plusBtn.addEventListener("click", () => {
          let currentIndex = values.indexOf(target.textContent);
          currentIndex = (currentIndex + 1) % values.length;
          target.textContent = values[currentIndex];
      });
      
      const minusBtn = document.createElement("button");
      minusBtn.textContent = "-";
      minusBtn.classList.add("dec-btn", "btn");
      minusBtn.addEventListener("click", () => {
          let currentIndex = values.indexOf(target.textContent);
          currentIndex = (currentIndex - 1 + values.length) % values.length;
          target.textContent = values[currentIndex];
      });
      
      container.appendChild(plusBtn);
      container.appendChild(minusBtn);
      target.parentElement.appendChild(container);
  }

  enableScrollSelection(alarmHour, Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')));
  enableScrollSelection(alarmMin, Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')));
  enableScrollSelection(alarmAmPm, ["AM", "PM"]);

  createIncrementDecrementButtons(alarmHour, Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')));
  createIncrementDecrementButtons(alarmMin, Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')));
  createIncrementDecrementButtons(alarmAmPm, ["AM", "PM"]);

  setAlarmBtn.addEventListener("click", () => setAlarm());
  stopAlarmBtn.addEventListener("click", stopAlarm);
  backBtn.addEventListener("click", () => {
      $(".clock").show();
      $(".alarm").hide();
  });

  $("#alarm-btn").click(showAlarm);
  setInterval(checkAlarm, 1000);
});
