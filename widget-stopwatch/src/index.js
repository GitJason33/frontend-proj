"use strict";
// setup initial values for stopwatch
let [millis, seconds, minutes, hours] = [0, 0, 0];

// time marche
let marching;
let isMarching = false;

function start() {
  if (!isMarching) {
    isMarching = true;

    marching = setInterval(() => {
      _incrementTime();

      updateTime();
    }, 50);
  }
}

function stop() {
  clearInterval(marching);
  isMarching = false;
}

function reset() {
  stop();
  [millis, seconds, minutes, hours] = [0, 0, 0, 0];
  updateTime(0, 0, 0, 0);
}

function updateTime() {
  $(".millis").html(_formatMillis(millis));

  let oldSec = parseInt($('.second').html());
  let oldMin = parseInt($('.minute').html());
  let oldHr = parseInt($('.hour').html());
  
  if(_hasChanged(oldSec, seconds))
    $(".second").html(_formatNumber(seconds));

  if(_hasChanged(oldMin, minutes))
    $(".minute").html(_formatNumber(minutes));
  
  if(_hasChanged(oldHr, hours))
    $(".hour").html(_formatNumber(hours));
}

function _incrementTime() {
  millis += 50;
  if (millis % 1000 === 0) {
    millis = 0;
    seconds++;
  }
  if (seconds % 60 === 0 && millis % 1000 === 0) {
    seconds = 0;
    minutes++;
  }
  if (minutes % 60 === 0 && seconds % 60 === 0 && millis % 1000 === 0) {
    minutes = 0;
    hours++;
  }
}

function _hasChanged(oldNum, newNum) {
  return oldNum !== newNum;
}

function _formatNumber(n) {
  return n < 10 ? `0${n}` : n;
}

function _formatMillis(n) {
  if (n < 10) return "00" + n;
  else if (n < 100) return "0" + n;
  else return n;
}
