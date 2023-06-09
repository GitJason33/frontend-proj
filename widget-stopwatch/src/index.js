"use strict";
// setup initial values for stopwatch
let [seconds, minutes, hours] = [0, 0, 0];

// time marche
let marching;
let isMarching = false;

function start() {
  if (!isMarching) {
    isMarching = true;
    
    marching = setInterval(() => {
      seconds++;
      if (seconds % 60 === 0) {
        seconds = 0;
        minutes++;
      }
      if (minutes % 60 === 0 && seconds % 60 === 0) {
        minutes = 0;
        hours++;
      }

      updateTime(seconds, minutes, hours);
    }, 1000);
  }
}

function stop() {
  clearInterval(marching);
  isMarching = false;
}

function reset() {
  stop();
  [seconds, minutes, hours] = [0, 0, 0];
  updateTime(0, 0, 0);
}

function updateTime(seconds, minutes, hours) {
  $(".second").html(formatNumber(seconds));
  $(".minute").html(formatNumber(minutes));
  $(".hour").html(formatNumber(hours));
}

function formatNumber(n) {
  return n < 10 ? `0${n}` : n;
}